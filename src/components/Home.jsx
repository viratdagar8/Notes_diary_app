import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Title + Button row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="flex-1 rounded-xl border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/40"
          type="text"
          placeholder="Enter title name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="rounded-xl border border-neutral-700 bg-black px-6 py-3 font-medium text-white transition hover:border-neutral-500 hover:bg-neutral-900 active:scale-95 sm:whitespace-nowrap"
        >
          {pasteId ? "Update Note" : "Create New Note"}
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        <textarea
          className="w-full resize-none rounded-xl border border-neutral-800 bg-black p-4 text-white placeholder-neutral-500 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-500/40"
          value={value}
          placeholder="Enter content"
          onChange={(e) => setValue(e.target.value)}
          rows={18}
        />
      </div>
    </div>
  )
}

export default Home