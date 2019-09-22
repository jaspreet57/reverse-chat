import express from 'express';

import {
  getMessages,
  getMessageCountByUser,
} from '../controllers/messages';

const router = express.Router();

router.get('/', getMessages);

router.get('/count-by-user', getMessageCountByUser);

export default router;
