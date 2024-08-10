import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookies
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
});

export default sessionMiddleware;
