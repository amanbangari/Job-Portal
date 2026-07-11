import React from 'react'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20">
            <span className="text-xl font-black text-white">GJ</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            GoJob<span className="text-blue-600">.</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        {/* <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="text-blue-600 transition-colors">Find Jobs</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Browse Companies</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Salaries</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Resources</a>
        </div> */}

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Post a Job
          </button>
          <button className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow-lg shadow-blue-500/10 hover:bg-blue-500 hover:shadow-blue-500/25 transition duration-200">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
