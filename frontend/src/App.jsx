import React, { useState } from "react";
import SpeedReader from "./components/SpeedReader";

function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.words) {
        setWords(data.words);
      } else {
        alert("Error: " + (data.error || "Invalid file"));
      }
    } catch (err) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Headspace</h1>
      <input
        type="file"
        accept=".docx,.pdf,.txt"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        words.length > 0 && <SpeedReader words={words} />
      )}
    </div>
  );
}

export default App;
