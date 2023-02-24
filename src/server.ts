import express from 'express';

import router from './routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
