import React, { useState } from 'react';
import { LayoutDashboard, Search, Bookmark, ArrowLeftRight, Code2, Info, Star, GitFork, Users, AlertCircle, Moon, Sun } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Update this to your server's public IP address or Domain later on AWS EC2
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/analyze?repoUrl=${encodeURIComponent(url)}`);
      const result = await res.json();
      if (res.ok) setData(result);
      else setError(result.error || 'Something went wrong');
    } catch (err) {
      setError('Cannot connect to backend service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080B1A] text-white font-sans antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0B0F26] border-r border-[#1B2240] p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-indigo-500" />
            <span className="text-lg font-bold tracking-tight">GitHub Repo Analyzer</span>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/20 text-indigo-400 rounded-xl text-sm font-medium"><LayoutDashboard size={18}/> Dashboard</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-[#131936] rounded-xl text-sm font-medium transition"><Search size={18}/> Analyze Repo</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-[#131936] rounded-xl text-sm font-medium transition"><Bookmark size={18}/> Saved Repos</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-[#131936] rounded-xl text-sm font-medium transition"><ArrowLeftRight size={18}/> Compare Repos</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-[#131936] rounded-xl text-sm font-medium transition"><Info size={18}/> About</button>
          </nav>
        </div>
        <div className="bg-gradient-to-br from-[#131836] to-[#1A1F4D] p-4 rounded-2xl border border-indigo-500/20 text-center">
          <Code2 className="w-10 h-10 mx-auto text-indigo-400 mb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
          <p className="text-xs text-slate-300">Analyze any public GitHub repository in seconds! 🚀</p>
        </div>
      </aside>

      {/* Main Container Dashboard */}
      <main className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto">
        {/* Header Bar */}
        <header className="flex justify-between items-center bg-[#0B0F26] p-4 rounded-2xl border border-[#1B2240]">
          <h2 className="text-xl font-semibold hidden sm:block">Dashboard Workspace</h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-slate-400 hover:text-white"><Moon size={20}/></button>
            <button className="p-2 text-slate-400 hover:text-white"><Sun size={20}/></button>
            <div className="w-8 h-8 rounded-full bg-indigo-500 overflow-hidden border border-indigo-400">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Hero Top Analysis Dynamic Form Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#0D1540] via-[#120F3D] to-[#250D47] rounded-3xl p-8 border border-indigo-500/20 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-extrabold mb-2">Analyze any GitHub Repository</h1>
            <p className="text-slate-400 mb-6 text-sm">Get insights about code, languages, contributors, commits and more.</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#070A1E]/80 border border-[#222954] p-2 rounded-2xl">
              <div className="flex items-center gap-2 w-full px-3">
                <Search className="text-indigo-400 shrink-0" size={20}/>
                <input 
                  type="text" 
                  placeholder="e.g. https://github.com/facebook/react" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
                />
              </div>
              <button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 active:scale-95 transition disabled:opacity-50 shrink-0"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent pointer-events-none hidden lg:block"></div>
        </section>

        {data && (
          <>
            {/* Top Stat Metrics Cards Row */}
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Stars', val: data.stars.toLocaleString(), change: '+12 today', icon: <Star className="text-amber-400" /> },
                { label: 'Forks', val: data.forks.toLocaleString(), change: '+6 today', icon: <GitFork className="text-blue-400" /> },
                { label: 'Language', val: data.mainLanguage || 'N/A', change: 'Primary', icon: <Code2 className="text-purple-400" /> },
                { label: 'Contributors', val: '1.1k', change: '+20 this month', icon: <Users className="text-emerald-400" /> },
                { label: 'Open Issues', val: data.openIssues.toLocaleString(), change: '18 new', icon: <AlertCircle className="text-rose-400" /> },
              ].map((card, i) => (
                <div key={i} className="bg-[#0B0F26] border border-[#1B2240] p-4 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-[#131836] rounded-xl">{card.icon}</div>
                  <div>
                    <p className="text-xs text-slate-400">{card.label}</p>
                    <h3 className="text-xl font-bold">{card.val}</h3>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">{card.change}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Visual Analytics Graphs Breakdown Row Grid */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column Language Distribution */}
              <div className="bg-[#0B0F26] border border-[#1B2240] p-6 rounded-2xl xl:col-span-1">
                <h3 className="text-md font-semibold mb-4">Language Distribution</h3>
                <div className="space-y-3">
                  {data.languagesDistribution.slice(0, 5).map((lang, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{lang.name}</span>
                        <span>{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-[#161B3D] h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                          style={{ width: `${lang.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Metadata Information */}
              <div className="bg-[#0B0F26] border border-[#1B2240] p-6 rounded-2xl xl:col-span-1 space-y-4">
                <h3 className="text-md font-semibold">Repository Information</h3>
                <div>
                  <h4 className="text-lg font-bold text-indigo-400">{data.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3">{data.description || 'No description available for this project repository.'}</p>
                </div>
                <div className="border-t border-[#1B2240] pt-4 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-400">Created At:</span><span>{new Date(data.createdAt).toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Default Branch:</span><span className="px-2 py-0.5 bg-[#1B2240] text-indigo-300 rounded font-mono text-[10px]">{data.defaultBranch}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">License:</span><span className="text-slate-300 max-w-[150px] truncate">{data.license}</span></div>
                </div>
              </div>

              {/* Right Commit Area Analytics Line Graph Chart */}
              <div className="bg-[#0B0F26] border border-[#1B2240] p-6 rounded-2xl xl:col-span-1 flex flex-col">
                <h3 className="text-md font-semibold mb-4">Commit Activity (Last 30 Days)</h3>
                <div className="flex-1 min-h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.commitActivity}>
                      <defs>
                        <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B0F26', borderColor: '#1B2240', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="commits" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCommits)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
