import React, { useState } from 'react'
import dayjs from 'dayjs'

function JobCard(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const date1 = dayjs(Date.now());
    const diffInDays = date1.diff(props.postedOn,'day');
    
    // Dynamic initials-based brand badge background
    const getBrandColor = (companyName) => {
        const colors = [
            "from-blue-600 to-cyan-500 shadow-blue-500/20",
            "from-purple-600 to-pink-500 shadow-purple-500/20",
            "from-emerald-600 to-teal-500 shadow-emerald-500/20",
            "from-rose-600 to-orange-500 shadow-rose-500/20",
            "from-amber-500 to-yellow-400 shadow-amber-500/20",
            "from-violet-600 to-indigo-500 shadow-violet-500/20",
        ];
        let hash = 0;
        for (let i = 0; i < companyName.length; i++) {
            hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const getJobTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'remote': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'hybrid': return 'bg-amber-50 text-amber-600 border-amber-250';
            case 'full-time': return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'part-time': return 'bg-purple-50 text-purple-600 border-purple-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-6 mb-4">
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`group border bg-white rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                    isExpanded 
                    ? 'border-blue-500/60 shadow-lg bg-white' 
                    : 'border-slate-200/80 hover:border-slate-300/80 hover:shadow-md'
                }`}
            >
                {/* Main Card Content */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left: Brand & Job Title */}
                    <div className="flex items-center gap-4">
                        {/* Company Logo Badge */}
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr text-xl font-bold text-white shadow-lg ${getBrandColor(props.company || "C")}`}>
                            {(props.company || "C").charAt(0)}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex flex-col items-start gap-1">
                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-left">
                                {props.title}
                            </h2>
                            <p className="text-sm font-medium text-slate-500">
                                {props.company}
                            </p>
                            
                            {/* Badges row */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getJobTypeColor(props.jobType)}`}>
                                    {props.jobType}
                                </span>
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-650 border border-slate-200/80">
                                    {props.location}
                                </span>
                                {props.experience && (
                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-650 border border-slate-200/80">
                                        {props.experience}
                                    </span>
                                )}
                                {props.salary && (
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50/60 text-blue-600 border border-blue-100">
                                        {props.salary}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Date Posted & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                        <span className="text-sm text-slate-450 font-medium">
                            {diffInDays === 0 ? "Posted today" : diffInDays === 1 ? "Posted 1 day ago" : `Posted ${diffInDays} days ago`}
                        </span>
                        
                        <div className="flex items-center gap-3">
                            {/* Expand arrow */}
                            <div className={`hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-450 transition-transform duration-300 ${isExpanded ? 'rotate-180 border-blue-500/30 text-blue-600 bg-blue-50/50' : 'group-hover:text-slate-800'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            
                            <a 
                                href={props.job_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} // Prevent card expand toggle
                            >
                                <button className="h-10 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white px-6 shadow-md shadow-blue-600/10 hover:shadow-blue-500/25 transition duration-200 cursor-pointer">
                                    Apply
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Expanded Details section */}
                <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                    }`}
                >
                    <div className="overflow-hidden flex flex-col gap-6 text-left">
                        {/* Description */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Job Description</h4>
                            <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-light font-sans">
                                {props.description}
                            </p>
                        </div>

                        {/* Requirements */}
                        {props.requirements && props.requirements.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Requirements</h4>
                                <ul className="list-disc pl-5 space-y-1.5">
                                    {props.requirements.map((req, index) => (
                                        <li key={index} className="text-slate-600 text-sm sm:text-base font-light font-sans">
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tags / Skills */}
                        {props.tags && props.tags.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {props.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-650 border border-slate-200">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default JobCard