import React from 'react'

function Header() {
  return (
    <header className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12 text-center text-slate-900 max-w-5xl mx-auto px-6">
      {/* Visual background glows */}
      <div className="absolute top-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute top-10 left-1/3 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl"></div>

      <div className="flex flex-col items-center gap-6">
        {/* Top Mini Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-650 animate-ping animate-duration-1000"></span>
          Now Live: 10 New Tech Jobs Added Today
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
          Your Ideal Tech Job Awaits, <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-650 to-slate-800 bg-clip-text text-transparent">
            Start the Search
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-500 font-light">
          Connect with top-tier technology giants and innovative startups. Browse verified open roles with transparent salary details.
        </p>

        {/* Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition duration-300">
            <span className="text-2xl md:text-3xl font-bold text-slate-900">12,450+</span>
            <span className="text-xs text-slate-450 mt-1 uppercase tracking-wider font-semibold">Active Listings</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition duration-300">
            <span className="text-2xl md:text-3xl font-bold text-slate-900">380+</span>
            <span className="text-xs text-slate-450 mt-1 uppercase tracking-wider font-semibold">Top Tech Brands</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 col-span-2 md:col-span-1 transition duration-300">
            <span className="text-2xl md:text-3xl font-bold text-slate-900">$145k</span>
            <span className="text-xs text-slate-450 mt-1 uppercase tracking-wider font-semibold">Average Salary</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header