import React from 'react';

const legendItems = [
  { label: 'Physics', colors: ['#6366f1', '#3b82f6'] },
  { label: 'Chemistry', colors: ['#10b981', '#14b8a6'] },
  { label: 'Mathematics', colors: ['#d946ef', '#a855f7'] },
  { label: 'Biology', colors: ['#22c55e', '#84cc16'] },
  { label: 'Computer Science', colors: ['#06b6d4', '#0ea5e9'] },
  { label: 'English', colors: ['#f43f5e', '#ec4899'] },
];

export default function Legend() {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="h-3 w-6 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`,
            }}
          />
          <span className="text-xs text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
