import React, { useEffect, useState } from 'react';
import Affirmations from './components/Affirmations';
import JournalComposer from './components/JournalComposer';
import JournalList from './components/JournalList';
import TodoList from './components/TodoList';
import { BookHeart, Notebook, Image as ImageIcon } from 'lucide-react';

const App = () => {
  const [entries, setEntries] = useState(() => {
    const raw = localStorage.getItem('journal');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem('journal', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => setEntries([entry, ...entries]);
  const deleteEntry = (id) => setEntries(entries.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white rounded-lg p-2"><BookHeart className="h-6 w-6" /></div>
            <div>
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Mindful Journal</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">A private space for your wins, lessons, and plans</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Affirmations />
          <JournalComposer onAdd={addEntry} />
          <JournalList entries={entries} onDelete={deleteEntry} />
        </div>
        <div className="space-y-6">
          <TodoList />
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Tips</h2>
            <ul className="text-sm list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
              <li>Capture both wins and lessons to see your growth clearly.</li>
              <li>Add photos to anchor memories and emotions.</li>
              <li>Keep your tasks small and achievable to build momentum.</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-zinc-500">
        Built for you with care. Your entries are stored locally on this device.
      </footer>
    </div>
  );
};

export default App;
