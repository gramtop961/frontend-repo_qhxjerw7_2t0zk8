import React, { useState } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';

const JournalComposer = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === 'string') {
        setImageData(result);
        setPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!text.trim() && !imageData) return;
    onAdd({
      id: crypto.randomUUID(),
      text: text.trim(),
      image: imageData || null,
      createdAt: new Date().toISOString(),
    });
    setText('');
    setImageData(null);
    setPreview(null);
  };

  return (
    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Capture a moment</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write about your wins, lessons, ups and downs..."
        className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {preview && (
        <div className="mt-3">
          <img src={preview} alt="preview" className="max-h-48 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800" />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 cursor-pointer">
          <ImageIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Add image</span>
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Plus className="h-5 w-5" />
          Save entry
        </button>
      </div>
    </div>
  );
};

export default JournalComposer;
