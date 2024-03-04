const mongoose = require('mongoose');
const DocRegisters = require('../models/docRegister');
const HospRegisters = require('../models/hospRegister');

const AppointSchema = new mongoose.Schema({
    docID: {
        type: String,
        required: true
    },
    docName: {
        type: String,
    },
    hospID: {
        type: String,
        required: true
    },
    hospName: {
        type: String,
    },
    appointmentID: {
        type: Number,
        unique: true,
    },
    Username: {
        type: String,
        required: true
    },
    PatientName: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Timeslot: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    },
    Fee: {
        type: Number,
        required: true
    },
    Note: {
        type: String,
        required: true
    }
});

AppointSchema.pre('save', async function (next) {
    if (!this.appointmentID) {
        try {
            const lastAppointment = await this.constructor.findOne({}, {}, { sort: { 'appointmentID': -1 } });
            this.appointmentID = lastAppointment ? lastAppointment.appointmentID + 1 : 1;
        } catch (error) {
            return next(error);
        }
    }

    try {
        await DocRegisters.findOneAndUpdate(
            { docID: this.docID },
            { $push: { appointments: this.appointmentID } },
            { new: true }
        );
    } catch (error) {
        return next(error);
    }

    try {
        await HospRegisters.findOneAndUpdate(
            { hospID: this.hospID },
            { $push: { appointments: this.appointmentID } },
            { new: true }
        );
    } catch (error) {
        return next(error);
    }

    next();
});

const Appointments = mongoose.model('appointments', AppointSchema);
module.exports = Appointments;