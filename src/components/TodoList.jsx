import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';

const TodoList = () => {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('todos');
    return raw ? JSON.parse(raw) : [];
  });
  const [text, setText] = useState('');

  const persist = (next) => {
    setItems(next);
    localStorage.setItem('todos', JSON.stringify(next));
  };

  const addItem = () => {
    if (!text.trim()) return;
    const next = [
      { id: crypto.randomUUID(), text: text.trim(), done: false, createdAt: Date.now() },
      ...items,
    ];
    setText('');
    persist(next);
  };

  const toggle = (id) => {
    const next = items.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    persist(next);
  };

  const remove = (id) => {
    const next = items.filter((i) => i.id !== id);
    persist(next);
  };

  return (
    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Today\'s plan</h2>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="h-5 w-5" /> Add
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {items.length === 0 && (
          <li className="text-sm text-zinc-600 dark:text-zinc-400">No tasks yet. What\'s one small thing you can do today?</li>
        )}
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between bg-white/60 dark:bg-zinc-950/60 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2">
            <button onClick={() => toggle(item.id)} className="inline-flex items-center gap-2">
              {item.done ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Circle className="h-5 w-5 text-zinc-400" />
              )}
              <span className={`text-sm ${item.done ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{item.text}</span>
            </button>
            <button onClick={() => remove(item.id)} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
