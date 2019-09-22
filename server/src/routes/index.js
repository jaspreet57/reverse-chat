import { Router } from 'express';
import passport from 'passport';
import users from './users';
import auth from './auth';
import messages from './messages';


const api = Router();

api.get('/', (req, res) => {
  res.send('ok');
});

api.get('/_health', (req, res) => {
  res.sendStatus(200);
});

// Routes for signup and signin
api.use('/auth', auth);

// Rest of the APIs
api.use('/users', passport.authenticate('jwt', { session: false }), users);

api.use('/messages', passport.authenticate('jwt', { session: false }), messages);

export default api;
