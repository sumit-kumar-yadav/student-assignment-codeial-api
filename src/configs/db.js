import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit with a non-zero status code to indicate connection failure
    }
};

export default connectDB;
