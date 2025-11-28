import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';
import startSerialReader from './utils/serialReader.js';

dotenv.config({
    path: "./.env"
});
connectDB()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is running on port ${process.env.PORT||3000}`);
    })
    // Start serial reader after server and DB are up.
    try {
        startSerialReader();
    } catch (err) {
        console.error('Failed to start serial reader:', err);
    }
})
.catch((err)=>{
    console.error("Failed to start server:",err);
    process.exit(1);
});
