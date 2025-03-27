# Loan Entries Manager

## Overview

Loan Entries Manager is a full-stack web application built using Node.js + Express for the backend and React for the frontend. The app provides an authentication system for users to sign up, log in, and manage loan entries efficiently. It offers features like creating, grouping, and filtering loan records, making financial management seamless.

## Features

- User Authentication: Secure sign-up and sign-in functionality.

- Loan Entry Management: Users can create new loan entries and manage existing ones.

- Bucketing (Grouping) Loans: Users can group loans based on a selected field, forming multiple categorized tables.

-Filtering System: Users can apply multiple filters based on loan attributes to refine their data.

-Combined Bucketing & Filtering: Allows simultaneous use of bucketing and filtering for better data management.

-Responsive UI: The application is fully responsive and provides a smooth user experience.

## Future Enhancements

- Update & Delete Functionalities: Currently missing due to time constraints but planned for future updates.

## Technologies Used

### Frontend

  - React.js

  - Tailwind CSS

  - Vite

### Backend

  - Node.js

  - Express.js

  - MongoDB (for data storage)

## Installation

### Prerequisites

- Node.js installed on your system

- MongoDB (local or cloud instance)

## Steps to Run Locally
### Backend Setup
1. Clone the repository:

    - git clone https://github.com/your-username/loan-manager-backend.git
    - cd loan-manager-backend

2. Install dependencies:

    - npm install

3. Set up environment variables in a .env file:
    - MONGO_URI=your_mongodb_uri
    - JWT_SECRET=your_secret_key

4. Start the backend server:

    - npm start

### Frontend Setup

  1.Clone the frontend repository:
      - git clone https://github.com/your-username/loan-manager-frontend.git
      - cd loan-manager-frontend

  2. Install dependencies:
      - npm install

  3. Set up environment variables in a .env file:
      - VITE_API_URL=http://localhost:5000  # Or your deployed backend URL

  5. Start the frontend server:
       - npm run dev
    
  ## Deployment
    frontend:Vercel
    backend: render
