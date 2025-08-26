# Al Rahma - Hospital Management System

A full-stack web application designed to streamline the process of managing hospital appointments. This system provides a seamless experience for patients to book, manage, and track their medical appointments, while offering a robust dashboard for administrators to oversee hospital operations.

**Live Demo:** [**https://alrahmahill.netlify.app/**](https://alrahmahill.netlify.app/)

---

## ✨ Key Features

### 👤 Patient Dashboard

- **Secure Authentication:** Users can sign up and log in securely using JWT for authentication.
- **Appointment Booking:** A multi-step form allows patients to book appointments with specific doctors, choosing from available dates (up to 20 days in the future) and time slots (Morning, Afternoon, Evening).
- **Appointment Management:** Patients can view all past and upcoming appointments in a clean, organized dashboard.
- **Reschedule & Cancel:** Flexibility to reschedule or cancel upcoming appointments.
- **Online Payments:** A "Pay Now" option for appointments that were booked with the "Pay Later" choice.
- **View Prescriptions:** Access and view prescriptions from past appointments.
- **Profile Management:** Patients can view and manage their personal information, medical conditions, and reports uploaded by the hospital.
- **Protected Routes:** Unauthorized users are redirected from patient-specific pages, ensuring data privacy.

### ⚙️ Admin Panel

- **Doctor Management:** Admins can add new doctors to the system and remove existing ones.
- **Control Doctor Availability:** Toggle a doctor's availability on or off as needed.
- **Appointment Oversight:** View and manage all appointments booked across the hospital.

### 🚧 Work in Progress

- **Doctor's Panel:** A dedicated dashboard for doctors to view their schedules, manage appointments, and write prescriptions for patients.

---

## 🛠️ Tech Stack

This project is built using the MERN stack and other modern technologies.

- **Frontend:** React.js, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose), PostgreSQL (with Prisma ORM)
- **Authentication:** JSON Web Tokens (JWT)
- **Cloud Services:** Cloudinary (for image and file storage)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/) (which includes npm)

### Installation & Setup

1.  **Create a new repository at github.com.(this is your repository)**

    Give it the same name as the this repository.

    Don't initialize it with a README, .gitignore, or license.

2.  **Clone this repository to your local machine.** (if you haven't done so already)

    ```sh
    git clone https://github.com/Muzzu153/Al-RahmaHill.git
    ```

3.  **Rename the local repository's current 'origin' to 'upstream'**

    ```sh
    git remote rename origin upstream
    ```

4.  **Give the local repository an 'origin' that points to your repository.**

    ```sh
    git remote add origin https://github.com/your-account/Al-RahmaHill.git
    ```

5. **Push the local repository to your repository on github.**

    ```sh
    git push origin main
    ```

6.  **Install Backend Dependencies:**
    Navigate to the backend folder and install the necessary packages.

    ```sh
    cd backend
    npm install
    ```

7.  **Install Frontend Dependencies:**
    Navigate to the frontend folder and install the necessary packages.

    ```sh
    cd ../frontend
    npm install
    ```

8.  **Set up Environment Variables:**
    Create a `.env` file in the `backend` directory. Add the following environment variables. You will need to create your own MongoDB connection string, JWT secret, and Cloudinary credentials.

    ```env
    # .env file in /backend

    MONGODB_URI = 'your_mongodb_connection_string'
    PORT = 4000
    SALT_ROUNDS = 10
    USER_JWT_SECRET= "your_super_secret_jwt_key"
    CLOUDINARY_NAME = 'your_cloudinary_cloud_name' 
    CLOUDINARY_API_KEY = 'your_cloudinary_api_key'
    CLOUDINARY_SECRET_KEY = 'your_cloudinary_api_secret'
    
    
    # .env file in /frontend
    VITE_BACKEND_URL = http://localhost:4000
    ```

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory, run:

    ```sh
    npm run dev
    ```

    The server will start on `http://localhost:4000` (or the port you specified).

2.  **Start the Frontend Development Server:**
    From the `frontend` directory, run:
    ```sh
    npm run dev
    ```
    The application will open in your browser at `http://localhost:5175` (or the port you specified).

---

## 📬 Contact

Syed Muzaffer Ali - [Portfolio Website](https://your-portfolio-url.com) | [LinkedIn Profile](https://www.linkedin.com/in/your-linkedin-url/)

Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)
