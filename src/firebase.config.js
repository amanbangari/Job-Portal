import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection as firestoreCollection, 
  query as firestoreQuery, 
  orderBy as firestoreOrderBy, 
  where as firestoreWhere, 
  getDocs as firestoreGetDocs 
} from "firebase/firestore";
import jobDummyData from "./JobDummyData";

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Determine if Firebase environment variables are provided
const isFirebaseConfigured = !!(firebaseConfig.projectId && firebaseConfig.apiKey);

let db = null;
let useMock = !isFirebaseConfigured;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (error) {
    console.warn("Failed to initialize Firebase. Falling back to local mock data.", error);
    useMock = true;
  }
} else {
  console.log("Firebase credentials not detected. Falling back to local mock data (src/JobDummyData.js).");
}

// Mock document class that behaves like a Firestore DocumentSnapshot
class MockDocumentSnapshot {
  constructor(data, id) {
    this._data = data;
    this.id = id;
  }

  data() {
    return {
      ...this._data,
      // Ensure postedOn is format-compatible with toDate()
      postedOn: {
        toDate: () => new Date(this._data.postedDate || this._data.postedOn)
      }
    };
  }
}

// Mock query snapshot class that behaves like a Firestore QuerySnapshot
class MockQuerySnapshot {
  constructor(docs) {
    this.docs = docs;
  }

  forEach(callback) {
    this.docs.forEach(callback);
  }
}

// Intercept Firestore queries and route them to local fallback if useMock is true
export function collection(database, path) {
  if (useMock) {
    return { type: "collection", path };
  }
  return firestoreCollection(database, path);
}

export function query(ref, ...constraints) {
  if (useMock) {
    return { type: "query", ref, constraints };
  }
  return firestoreQuery(ref, ...constraints);
}

export function where(field, op, value) {
  if (useMock) {
    return { type: "where", field, op, value };
  }
  return firestoreWhere(field, op, value);
}

export function orderBy(field, direction = "asc") {
  if (useMock) {
    return { type: "orderBy", field, direction };
  }
  return firestoreOrderBy(field, direction);
}

export async function getDocs(q) {
  if (useMock) {
    // If mocking, simulate database querying and filtering
    let filteredJobs = [...jobDummyData];
    let constraints = [];

    if (q && q.type === "query") {
      constraints = q.constraints || [];
    }

    // Process all query filters (where clauses)
    for (const constraint of constraints) {
      if (constraint && constraint.type === "where") {
        const { field, op, value } = constraint;
        if (value !== undefined && value !== null && value !== "") {
          filteredJobs = filteredJobs.filter(job => {
            const dbField = field === "type" ? "jobType" : field;
            const fieldValue = job[dbField];
            if (op === "==") {
              if (typeof fieldValue === "string" && typeof value === "string") {
                return fieldValue.toLowerCase() === value.toLowerCase();
              }
              return fieldValue === value;
            }
            return true;
          });
        }
      }
    }

    // Process sorting (orderBy clauses)
    const orderByConstraint = constraints.find(c => c && c.type === "orderBy");
    if (orderByConstraint) {
      const { field, direction } = orderByConstraint;
      const dbField = field === "postedOn" ? "postedDate" : field;
      filteredJobs.sort((a, b) => {
        const valA = new Date(a[dbField] || a[field]);
        const valB = new Date(b[dbField] || b[field]);
        if (direction === "desc") {
          return valB - valA;
        }
        return valA - valB;
      });
    }

    const mockDocs = filteredJobs.map((job, idx) => new MockDocumentSnapshot(job, job.id || `mock-${idx}`));
    return new MockQuerySnapshot(mockDocs);
  }

  return firestoreGetDocs(q);
}

export { db };
