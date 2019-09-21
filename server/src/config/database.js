import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true });
