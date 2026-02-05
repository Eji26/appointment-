import { models } from '../models/index.js';

const { Availability } = models;

export const getAllAvailability = async (req, res) => {
    try {
        const availability = await Availability.findAll();
        res.status(200).json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setAvailability = async (req, res) => {
    try {
        const { dayOfWeek, date, startTime, endTime, isUnavailable } = req.body;

        // simplistic approach: if dayOfWeek is provided, upsert for that day
        // for now, just create new entries. A real system would check for overlaps.
        const availability = await Availability.create({
            dayOfWeek,
            date,
            startTime,
            endTime,
            isUnavailable,
        });

        res.status(201).json({ success: true, data: availability });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAvailability = async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        await availability.destroy();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
