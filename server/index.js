import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { syncDatabase } from './src/models/index.js';
import authRoutes from './src/routes/authRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import availabilityRoutes from './src/routes/availabilityRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import { initReminderJob } from './src/utils/reminders.js';

dotenv.config();

// Sync Database
syncDatabase();

// Init Cron
initReminderJob();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);



app.get('/', (req, res) => {
  res.send('Appointment System API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

