import React from 'react';
import { motion } from 'framer-motion';

const subjectStyles = {
  Physics: 'from-indigo-500 to-blue-500',
  Chemistry: 'from-emerald-500 to-teal-500',
  Mathematics: 'from-fuchsia-500 to-purple-500',
  Biology: 'from-green-500 to-lime-500',
  'Computer Science': 'from-cyan-500 to-sky-500',
  English: 'from-rose-500 to-pink-500',
  History: 'from-amber-500 to-orange-500',
  Geography: 'from-teal-500 to-emerald-500',
  Economics: 'from-yellow-500 to-amber-500',
  Bengali: 'from-red-500 to-rose-500',
};

export default function SubjectBadge({ subject }) {
  const gradient = subjectStyles[subject] || 'from-slate-600 to-slate-700';
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full h-full rounded-xl bg-gradient-to-br ${gradient} text-white font-medium flex items-center justify-center text-xs md:text-sm shadow-lg`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <span className="drop-shadow-sm px-2 text-center leading-tight">
        {subject}
      </span>
    </motion.div>
  );
}
