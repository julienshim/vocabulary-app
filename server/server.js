const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const keys = require('./config/keys');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const refreshRouter = require('./routes/renew');
const revokeRouter = require('./routes/revoke');

app.use('/cards', cardsRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/renewAccessToken', refreshRouter);
app.use('/revokeRefreshTokensForUsers', revokeRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is now listening for request on http://localhost:${PORT}`);
});
