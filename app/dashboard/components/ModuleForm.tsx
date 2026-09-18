"use client";

import { useState } from "react";

export default function ModuleForm({ onSubmit }: { onSubmit: (moduleTitle: string) => void }) {
  const [moduleTitle, setModuleTitle] = useState("");

  return (
    <div className="mb-4">
      <h3 className="font-bold">Add Module</h3>
      <input
        className="border p-2 w-full"
        placeholder="Module Title"
        value={moduleTitle}
        onChange={(e) => setModuleTitle(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-2"
        onClick={() => {
          onSubmit(moduleTitle);
          setModuleTitle("");
        }}
      >
        Add Module
      </button>
    </div>
  );
}
