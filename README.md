# AI Meeting Analyzer

MeetIQ is an AI-powered tool that generates meeting summaries, extracts key keywords, and exports the summaries as PDFs. It features secure user authentication (login, signup, logout) and an intuitive interface.

## Features
- **User Authentication:** Secure login, signup, and logout.
- **Meeting Summaries:** Generate multiple types of summaries.
- **Keyword Extraction:** Automatically extract important keywords.
- **PDF Export:** Download summaries as PDFs.
- **File Upload:** Easily upload and process meeting data.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React, Vite, Tailwind CSS, Zustand


## Screenshots
![Signup Screen](./screenshots/signup.png)
![Login Screen](./screenshots/login.png)
![Dashboard](./screenshots/dashboard.png)
![File Selection](./screenshots/upload-transcript.png)
![Summary Options](./screenshots/summary-dropdown.png)
![Summary and Keyword Extraction](./screenshots/summary.png)
![PDF Export](./screenshots/pdf-export.png)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Tanvi-Ghadge/AI-Meeting-Analyzer.git
   cd AI-Meeting-Analyzer

2. **Setup the Backend**
   ```bash
   cd ../backend
   npm install
   npm start

4. **Setup the Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   
6. **Usage:**
    Open your browser and visit http://localhost:8000 (or the correct port for your frontend).
    Register or log in to access the application.
    Upload meeting files, generate summaries, extract keywords, and export as PDF.
