import express from 'express';
import cors from 'cors';
import router from './routes';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(`server running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
