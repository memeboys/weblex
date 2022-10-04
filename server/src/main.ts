import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import data from './assets/data.json';

const app = express();
app.use(helmet());
app.use(cors({allowedHeaders: '*', origin: '*'}));
app.get('/data', (req, res) => {
  res.json(data);
});
app.listen(8080, () => console.log('App running at http://localhost:8080'));
