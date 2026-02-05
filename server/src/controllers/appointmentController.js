import { models } from '../models/index.js';
import { Op } from 'sequelize';

const { Appointment, Service, User } = models;

export const bookAppointment = async (req, res) => {
    try {
        const { serviceId, startDateTime, notes } = req.body;
        const customerId = req.user.id;

        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const start = new Date(startDateTime);
        const end = new Date(start.getTime() + service.duration * 60000);

        // Conflict Check
        const conflict = await Appointment.findOne({
            where: {
                status: { [Op.ne]: 'CANCELLED' },
                [Op.or]: [
                    {
                        startDateTime: { [Op.lt]: end },
                        endDateTime: { [Op.gt]: start },
                    },
                ],
            },
        });

        if (conflict) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const appointment = await Appointment.create({
            customerId,
            serviceId,
            startDateTime: start,
            endDateTime: end,
            notes,
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const where = req.user.role === 'ADMIN' ? {} : { customerId: req.user.id };

        const appointments = await Appointment.findAll({
            where,
            include: [
                { model: Service, as: 'service' },
                { model: User, as: 'customer', attributes: ['name', 'email'] },
            ],
            order: [['startDateTime', 'ASC']],
        });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Authorization: Only admin or the customer who booked it
        if (req.user.role !== 'ADMIN' && appointment.customerId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
        }

        await appointment.update({ status: 'CANCELLED' });
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Only admin can change to PAID or COMPLETED
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Only administrators can update appointment status' });
        }

        await appointment.update({ status });
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

