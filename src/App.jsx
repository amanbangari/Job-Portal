import Navbar from "./components/Navbar"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import JobCard from "./components/JobCard"
// import jobData from "./JobDummyData"
import { useEffect, useState } from "react"
import { db, collection, query, orderBy, where, getDocs } from "./firebase.config"

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = async() => {
    setCustomSearch(false);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));
    const q = query(jobsRef, orderBy("postedOn", "desc"));
    const req = await getDocs(q);

    req.forEach((job) => {
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
    });
    setJobs(tempJobs);
  }

  const fetchJobsCustom = async(jobCriteria) => {
    setCustomSearch(true);
    const tempJobs = []
    const jobsRef = query(collection(db, "jobs"));

    // Build the query dynamically based on which search criteria are selected
    const constraints = [];
    if (jobCriteria.type) constraints.push(where("type", "==", jobCriteria.type));
    if (jobCriteria.title) constraints.push(where("title", "==", jobCriteria.title));
    if (jobCriteria.experience) constraints.push(where("experience", "==", jobCriteria.experience));
    if (jobCriteria.location) constraints.push(where("location", "==", jobCriteria.location));

    // Order by posting date descending
    constraints.push(orderBy("postedOn", "desc"));

    const q = query(jobsRef, ...constraints);
    const req = await getDocs(q);

    req.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      })
    });
    setJobs(tempJobs);
  }


  useEffect(() => {
    fetchJobs()
  },[])


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom}/>
      
      {customSearch && 
        <div className="w-full max-w-5xl mx-auto px-6 flex justify-end mb-6">
          <button 
            onClick={fetchJobs} 
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 px-5 py-2.5 rounded-xl text-sm font-semibold transition duration-200 shadow-md cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        </div>
      }

      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job}/>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto px-6 py-16 text-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-bounce">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <h3 className="text-lg font-bold text-white mb-1">No Jobs Found</h3>
          <p className="text-slate-500 text-sm font-light">Try broadening your search criteria or clearing your filters.</p>
        </div>
      )}
    </div>
  )
}

export default App