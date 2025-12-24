import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    serviceId: {
        type: String, 
        required: true,
    },
    serviceTitle: {
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending',
    },
    totalCost: {
        type: Number,
        required: true,
    },
    rateType: {
        type: String,
        enum: ['hourly', 'daily'],
        default: 'hourly',
    },
    notes: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
