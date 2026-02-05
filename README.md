# 🏛️ Prestige Appointment Management System

A high-end, full-stack appointment scheduling platform designed with a premium "Navy & Gold" aesthetic. This system provides a seamless experience for both customers to book services and business owners to manage their schedule and service offerings.

> [!NOTE]  
> This project was developed as a **beginner-friendly demonstration** of a full-stack application (MEVN/PERN stack). It is highly encouraged that you fork, modify, and experiment with the code to add your own features or themes!

## ✨ Key Features

### 👤 User Experience
- **Elite Authentication**: Role-based registration and login system (Customers vs. Business Owners).
- **Curated Booking Calendar**: Integrated with **FullCalendar** for a visual, interactive booking experience.
- **My Agenda**: A personalized dashboard for users to track, view, and manage their upcoming reservations.
- **Premium Design**: Responsive, luxury-themed UI utilizing **Tailwind CSS v4**, **Framer Motion** animations, and glassmorphism.

### 💼 Business Tools
- **Administrative Command Center**: Overview of all scheduled sessions with real-time status management.
- **Service Curation**: Full CRUD functionality to manage available services, pricing, and durations.
- **Status Control**: Track the lifecycle of an appointment (Confirmed → Paid → Completed / Cancelled).
- **Automated Conflict Checks**: Backend logic ensures slots are only booked once.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, FullCalendar.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: PostgreSQL (via the `pg` driver).
- **Validation/Security**: JWT (Authentication), Bcrypt (Password Hashing), Zod (Schema Validation).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (installed and running)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eji26/appointment-.git
   cd appointment-
   ```

2. **Backend Configuration**:
   - Navigate to the `server` directory.
   - Install dependencies: `npm install`.
   - Create a `.env` file based on the environment variables needed (Database URI, JWT Secret).
   - Sync the database: `node sync-db.js`.
   - Run the server: `npm run dev`.

3. **Frontend Configuration**:
   - Navigate to the `client` directory.
   - Install dependencies: `npm install`.
   - Run the development server: `npm run dev`.

---

## 🎨 Modification Guide

This system is built to be easily customized. Here are some ideas for your first modifications:

- **Change the Palette**: Modify `client/src/index.css` to switch between the pre-defined themes (Emerald & Taupe or Charcoal & Rose Gold).
- **Add Email Notifications**: Integrate an email service (like Nodemailer or SendGrid) for booking confirmations.
- **Social Auth**: Extend the login system to support Google or Facebook OAuth.
- **Mobile App**: Use the backend API to build a companion mobile app using React Native or Flutter.

Happy Coding! 🚀