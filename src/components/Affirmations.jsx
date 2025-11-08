import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULTS = [
  "I am worthy of love, rest, and growth.",
  "Every setback teaches me something valuable.",
  "I honor my feelings and move at my own pace.",
  "Small steps today create big changes tomorrow.",
  "I am resilient, grounded, and enough.",
  "My past does not define my future.",
  "I choose compassion over perfection.",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Affirmations = ({ custom = [] }) => {
  const items = useMemo(() => (custom.length ? custom : DEFAULTS), [custom]);
  const [current, setCurrent] = useState(randomFrom(items));

  useEffect(() => {
    const id = setInterval(() => setCurrent(randomFrom(items)), 8000);
    return () => clearInterval(id);
  }, [items]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500 text-white p-6 shadow-md">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 0%, white 0, transparent 40%)'}} />
      <div className="relative flex items-start gap-3">
        <div className="shrink-0 bg-white/20 rounded-lg p-2">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide/relaxed font-semibold/relaxed">Daily affirmation</p>
          <p className="text-lg md:text-xl font-medium mt-1 leading-snug">{current}</p>
          <button onClick={() => setCurrent(randomFrom(items))} className="mt-3 text-xs bg-white/20 hover:bg-white/30 rounded-md px-3 py-1 font-medium">New one</button>
        </div>
      </div>
    </div>
  );
};

export default Affirmations;
