import { Router } from 'express';

const api = Router();

api.get('/', (req, res) => {
  res.send('ok');
});

api.get('/_health', (req, res) => {
  res.sendStatus(200);
});

export default api;
