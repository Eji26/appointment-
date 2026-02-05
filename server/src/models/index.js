import sequelize from '../config/database.js';
import User from './User.js';
import Service from './Service.js';
import Availability from './Availability.js';
import Appointment from './Appointment.js';

const models = {
    User,
    Service,
    Availability,
    Appointment,
};

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Syncs models with DB
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

export { sequelize, models, syncDatabase };
