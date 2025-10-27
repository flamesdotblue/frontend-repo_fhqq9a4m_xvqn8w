import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow">Intelligent Timetable Generator</h1>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-200/90 max-w-2xl">
          Auto-balanced, fully filled weekly schedules for multiple sections with a common lunch break.
        </p>
      </div>
    </section>
  );
}
