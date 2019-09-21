import passport from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-token-google';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import security from './config/security';
import User from './models/users';
import authKeys from './config/authKeys';

const initPassport = () => {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: authKeys.googleAuth.clientId,
        clientSecret: authKeys.googleAuth.clientSecret,
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user.toJSON());
        }

        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.displayName,
        });

        const savedUser = await newUser.save();
        return done(null, savedUser.toJSON());
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: security.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, { userId: token.userId });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (user) {
            return done(null, false, { message: 'User already exists' });
          }

          if (!password) {
            return done(null, false, { message: 'Password is required' });
          }

          if (!email) {
            return done(null, false, { message: 'Email is required' });
          }

          const newUser = new User({
            email,
            name: req.body.name || email,
            password,
          });

          const savedUser = await newUser.save();
          return done(null, savedUser.toJSON());
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          const validate = await user.isValidPassword(password);
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
          return done(null, user.toJSON(), { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initPassport;
