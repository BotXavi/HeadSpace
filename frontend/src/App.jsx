import React, { useState } from "react";
import { Upload, FileText, Zap, Brain, BookOpen } from "lucide-react";
import SpeedReader from "./components/SpeedReader";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files: [files[0]] } };
      handleFileUpload(event);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
        <div className="bg-element bg-element-3"></div>
      </div>

      <div className="app-content">
        {/* Header */}
        <div className="header">
          <div className="logo-container">
            <Brain className="logo-icon" />
            <h1 className="logo-text">HeadSpace</h1>
          </div>
          <p className="subtitle">
            Supercharge your reading with advanced speed reading technology. 
            Upload any document and accelerate your comprehension.
          </p>
        </div>

        {/* Feature highlights */}
        {words.length === 0 && !loading && (
          <div className="features-grid">
            <div className="feature-card">
              <Zap className="feature-icon feature-icon-yellow" />
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">Read up to 1000 words per minute with precision</p>
            </div>
            <div className="feature-card">
              <FileText className="feature-icon feature-icon-blue" />
              <h3 className="feature-title">Multiple Formats</h3>
              <p className="feature-description">Support for PDF, DOCX, and TXT files</p>
            </div>
            <div className="feature-card">
              <BookOpen className="feature-icon feature-icon-green" />
              <h3 className="feature-title">Enhanced Focus</h3>
              <p className="feature-description">Eliminate distractions and boost comprehension</p>
            </div>
          </div>
        )}

        {/* Upload area */}
        {words.length === 0 && !loading && (
          <div className="upload-container">
            <div
              className={`upload-area ${dragActive ? 'upload-area-active' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept=".docx,.pdf,.txt"
                onChange={handleFileUpload}
                className="upload-input"
              />
              <Upload className="upload-icon" />
              <h3 className="upload-title">Drop your file here</h3>
              <p className="upload-subtitle">or click to browse</p>
              <div className="upload-button">
                <Upload className="upload-button-icon" />
                Choose File
              </div>
              <p className="upload-note">
                Supports PDF, DOCX, and TXT files
              </p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-title">Processing your document...</p>
            <p className="loading-subtitle">This may take a moment</p>
          </div>
        )}

        {/* Speed reader component */}
        {words.length > 0 && !loading && (
          <SpeedReader words={words} />
        )}
      </div>
    </div>
  );
}

export default App;