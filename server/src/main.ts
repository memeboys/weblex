import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import source from './assets/data.json';
import {filterData} from './helpers/filterData';
import {sortData} from './helpers/sortData';

const app = express();
app.use(helmet());
app.use(cors({allowedHeaders: '*', origin: '*'}));
app.get('/data', (req, res) => {
  const page = Number(req.query['page']);
  const pageSize = Number(req.query['pageSize']);
  const {sortBy, order, filterBy, filterOp, filterValue} = req.query;
  if (!Number.isInteger(page) || page <= 0) {
    res.status(400).send('Invalid page parameter');
    return;
  }
  if (!Number.isInteger(pageSize) || pageSize <= 0) {
    res.status(400).send('Invalid pageSize parameter!');
    return;
  }
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  let data = source;
  if (typeof sortBy === 'string' && typeof order === 'string') {
    data = sortData(data, sortBy, order);
  }
  if (
    typeof filterBy === 'string' &&
    typeof filterOp === 'string' &&
    typeof filterValue === 'string'
  ) {
    data = filterData(data, filterBy, filterOp, filterValue);
  }
  res.json({
    totalPages: Math.ceil(data.length / pageSize),
    items: data.slice(startIndex, endIndex),
  });
});

app.listen(8080, () => console.log('App running at http://localhost:8080'));
