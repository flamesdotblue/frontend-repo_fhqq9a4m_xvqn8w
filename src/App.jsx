import React from 'react';
import HeroCover from './components/HeroCover';
import Timetable from './components/Timetable';
import Legend from './components/Legend';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10">
        <HeroCover />

        <div className="mt-8 md:mt-10">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Weekly Timetables (Sections A–D)</h2>
              <p className="text-slate-300 text-sm mt-1">
                Fully filled schedules for Monday to Friday, 7 periods per day with a common lunch break.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              Total teaching blocks per section: 35 (5 days × 7 periods)
            </div>
          </div>

          <Timetable />
          <Legend />
        </div>

        <footer className="mt-10 text-center text-xs text-slate-400/90">
          Balanced subject rotation • No consecutive duplicates • Unique per section
        </footer>
      </div>
    </div>
  );
}
