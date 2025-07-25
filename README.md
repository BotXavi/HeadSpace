# Headspace – Rapid Reading Web App

**Headspace** is a speed reading web application that helps users improve their reading focus and pace. It allows users to upload documents in `.pdf`, `.docx`, or `.txt` formats, then rapidly displays each word at a configurable speed (WPM) in a clean, distraction-free interface.

## Features

- Upload support for `.pdf`, `.docx`, and `.txt` files
- Rapid one-word-at-a-time display
- Adjustable words-per-minute (WPM) speed
- Start, pause, resume, and restart reading sessions
- Built as a full-stack web application

## Tech Stack

### Frontend
- React
- HTML/CSS or Tailwind (optional)
- Fetch API for backend communication

### Backend
- FastAPI (Python)
- `python-docx` – for reading `.docx` files
- `PyPDF2` – for extracting text from `.pdf` files
- Built-in Python I/O – for `.txt` files

## Project Structure

```bash
Headspace/
├── backend/
│ ├── main.py # FastAPI entrypoint
│ ├── parsers.py # File parsing logic (PDF/DOCX/TXT)
│ ├── temp_files/ # Uploaded temporary files
│ └── requirements.txt # Python dependencies
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── components/
│ │ │ └── SpeedReader.jsx
│ └── package.json
│
└── README.md
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/headspace.git
cd headspace
```

### 2. Setup Backend (Fast API)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will run at http://localhost:8000.

### 3. Setup Frontend (React)

```bash
cd ../frontend
npm install
npm start
```
The frontend will run at http://localhost:3000.

## Usage

1. Launch both the backend and frontend servers
2. Go to http://localhost:3000
3. Upload a .pdf, .docx, or .txt file
4. Adjust the WPM slider
5. Click Start to begin rapid reading

## Example files

- sample.txt – Plain text file
- article.docx – Sample Word document
- paper.pdf – Extractable text PDF

## Roadmap / Future Features

- Sentence/phrase display mode
- Dark mode toggle
- User accounts and saved sessions
- Mobile optimization
- Reading comprehension tools