import React, { useState } from 'react'

function SearchBar(props) {
    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        location: "",
        experience: "",
        type:""
    })

    const handleChange = (e) => {
        setJobCriteria((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const search = async() => {
        await props.fetchJobsCustom(jobCriteria);
    }

    return (
        <div className="mx-auto max-w-5xl px-6 my-8">
            <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-lg items-stretch lg:items-center">
                
                {/* Job Role select */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">Job Role</label>
                    <select 
                        onChange={handleChange} 
                        name="title" 
                        value={jobCriteria.title} 
                        className="w-full py-3 px-4 bg-slate-50 text-slate-800 border border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-blue-500/10 rounded-xl font-medium outline-none transition cursor-pointer"
                    >
                        <option value="">All Roles</option>
                        <option value="iOS Developer">iOS Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Android Developer">Android Developer</option>
                        <option value="Developer Advocate">Developer Advocate</option>
                        <option value="DevOps & Cloud Specialist">DevOps & Cloud Specialist</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Lead AI Research Scientist">Lead AI Research Scientist</option>
                        <option value="Lead Product Designer">Lead Product Designer</option>
                    </select>
                </div>

                {/* Job Type select */}
                <div className="w-full lg:w-48">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">Job Type</label>
                    <select 
                        onChange={handleChange} 
                        name="type" 
                        value={jobCriteria.type} 
                        className="w-full py-3 px-4 bg-slate-50 text-slate-800 border border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-blue-500/10 rounded-xl font-medium outline-none transition cursor-pointer"
                    >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                {/* Location select */}
                <div className="w-full lg:w-48">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">Location</label>
                    <select 
                        onChange={handleChange} 
                        name="location" 
                        value={jobCriteria.location} 
                        className="w-full py-3 px-4 bg-slate-50 text-slate-800 border border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-blue-500/10 rounded-xl font-medium outline-none transition cursor-pointer"
                    >
                        <option value="">All Locations</option>
                        <option value="Remote">Remote</option>
                        <option value="In-Office">In-Office</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Experience select */}
                <div className="w-full lg:w-48">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">Experience</label>
                    <select 
                        onChange={handleChange} 
                        name="experience" 
                        value={jobCriteria.experience} 
                        className="w-full py-3 px-4 bg-slate-50 text-slate-800 border border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-blue-500/10 rounded-xl font-medium outline-none transition cursor-pointer"
                    >
                        <option value="">All Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Junior Level">Junior Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                    </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end pt-5 lg:pt-0 lg:w-44">
                    <button 
                        onClick={search} 
                        className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 cursor-pointer"
                    >
                        Search Jobs
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SearchBar