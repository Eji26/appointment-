import cron from 'node-cron';
import { models } from '../models/index.js';
import { Op } from 'sequelize';

const { Appointment, User, Service } = models;

export const initReminderJob = () => {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running reminder cron job...');

        // Find appointments in the next 24 hours that are confirmed and not reminded
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);

        try {
            const appointments = await Appointment.findAll({
                where: {
                    startDateTime: {
                        [Op.between]: [new Date(), tomorrow],
                    },
                    status: 'CONFIRMED',
                },
                include: [
                    { model: User, as: 'customer' },
                    { model: Service, as: 'service' },
                ],
            });

            for (const appt of appointments) {
                // Log to console as requested for mockup email
                console.log(`REMINDER: Sending email to ${appt.customer.email} for ${appt.service.name} at ${appt.startDateTime}`);
            }
        } catch (error) {
            console.error('Cron job error:', error);
        }
    });
};
