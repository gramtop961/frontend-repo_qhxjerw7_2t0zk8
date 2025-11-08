import React from 'react';
import { Image as ImageIcon, Calendar, Clock } from 'lucide-react';

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
};

const JournalList = ({ entries, onDelete }) => {
  if (!entries.length) {
    return (
      <div className="text-center text-zinc-600 dark:text-zinc-400 py-10">
        Your journal is empty. Start by writing a few words or adding a photo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((e) => (
        <div key={e.id} className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(e.createdAt)}</span>
              {e.image && <span className="inline-flex items-center gap-1"><ImageIcon className="h-4 w-4" /> Photo</span>}
            </div>
            <button onClick={() => onDelete(e.id)} className="text-red-600 hover:text-red-700 font-medium">Delete</button>
          </div>

          {e.text && <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">{e.text}</p>}
          {e.image && (
            <img src={e.image} alt="entry" className="mt-3 rounded-lg max-h-80 object-cover border border-zinc-200 dark:border-zinc-800" />
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;
