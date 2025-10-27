import React, { useMemo, useState } from 'react';
import SubjectBadge from './SubjectBadge';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = [
  { label: '9:00 - 10:00' },
  { label: '10:00 - 11:00' },
  { label: '11:00 - 12:00' },
  { label: '12:00 - 1:00', break: true },
  { label: '1:00 - 2:00' },
  { label: '2:00 - 3:00' },
  { label: '3:00 - 4:00' },
];

const SUBJECTS = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Bengali',
];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function rotateArray(arr, offset) {
  const n = arr.length;
  const k = ((offset % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function buildPoolForSixDays() {
  // For 6 days x 7 periods with 1 fixed break -> 6 teaching slots/day -> 36 total teaching slots
  const totalSlots = 36;
  const baseEach = Math.floor(totalSlots / SUBJECTS.length); // 3
  const remainder = totalSlots - baseEach * SUBJECTS.length; // 6

  const pool = [];
  // Add baseEach occurrences for all subjects
  SUBJECTS.forEach((s) => {
    for (let i = 0; i < baseEach; i++) pool.push(s);
  });
  // Distribute remainder by giving one extra slot to the first `remainder` subjects
  for (let i = 0; i < remainder; i++) {
    pool.push(SUBJECTS[i]);
  }
  return pool; // length 36
}

function buildSectionSchedule(sectionIndex) {
  const pool = buildPoolForSixDays();

  // Rotate base to diversify between sections
  const base = rotateArray(pool, sectionIndex * 4);

  // Simple reshuffle with seeded randomness to avoid identical patterns
  const shuffled = [...base];
  for (let i = 0; i < shuffled.length; i++) {
    const j = Math.floor(seededRandom(i + 17 * (sectionIndex + 1)) * shuffled.length);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Build a 6x7 matrix inserting BREAK at period index 3 and avoiding consecutive duplicates within a day
  const schedule = Array.from({ length: DAYS.length }, () => Array(PERIODS.length).fill(null));

  let idx = 0;
  for (let d = 0; d < DAYS.length; d++) {
    for (let p = 0; p < PERIODS.length; p++) {
      if (PERIODS[p].break) {
        schedule[d][p] = 'BREAK';
        continue;
      }
      let candidate = shuffled[idx % shuffled.length];
      let guard = 0;
      const prev = p > 0 && !PERIODS[p - 1].break ? schedule[d][p - 1] : null;
      while (candidate === prev && guard < 50) {
        idx++;
        candidate = shuffled[idx % shuffled.length];
        guard++;
      }
      schedule[d][p] = candidate;
      idx++;
    }
  }

  // Ensure the first period of a day isn't same as last of previous day
  for (let d = 1; d < DAYS.length; d++) {
    const lastPrev = schedule[d - 1][PERIODS.length - 1];
    const firstToday = schedule[d][0];
    if (lastPrev === firstToday) {
      const tmp = schedule[d][1];
      schedule[d][1] = schedule[d][0];
      schedule[d][0] = tmp;
    }
  }

  return schedule;
}

const SECTION_LABELS = ['A', 'B', 'C', 'D'];

export default function Timetable() {
  const [activeSection, setActiveSection] = useState('A');

  const schedules = useMemo(() => {
    const map = {};
    SECTION_LABELS.forEach((label, i) => {
      map[label] = buildSectionSchedule(i);
    });
    return map;
  }, []);

  return (
    <section className="mt-8">
      {/* Section Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {SECTION_LABELS.map((label) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                activeSection === label
                  ? 'bg-white text-slate-900 border-white shadow'
                  : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
              }`}
            >
              Section {label}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-300/90">
          Days: Monday–Saturday • Periods: 9:00 AM – 4:00 PM • Lunch 12–1 (fixed)
        </div>
      </div>

      {/* Grid */}
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[900px] rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-4 py-3 text-slate-200 text-sm font-semibold sticky left-0 bg-white/5 backdrop-blur-sm">Day</th>
                {PERIODS.map((p, idx) => (
                  <th key={idx} className="px-2 py-3 text-slate-200 text-sm font-semibold text-center">
                    <div className="leading-tight">
                      <div className="text-[11px] uppercase tracking-wide text-slate-300/80">P{idx + 1}</div>
                      <div className="text-xs">{p.label}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day, dIdx) => (
                <tr key={day} className="even:bg-white/0 odd:bg-white/[0.025]">
                  <td className="px-4 py-3 text-slate-100 text-sm font-medium sticky left-0 bg-inherit backdrop-blur-sm">
                    {day}
                  </td>
                  {schedules[activeSection][dIdx].map((slot, pIdx) => (
                    <td key={pIdx} className="p-2 align-middle">
                      {slot === 'BREAK' ? (
                        <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-slate-200 text-xs md:text-sm grid place-items-center">
                          Break
                        </div>
                      ) : (
                        <SubjectBadge subject={slot} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
