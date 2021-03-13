module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  function validateEmail(userEmail) {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(userEmail);
  }

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.sendStatus(401);
    }
    if (!validateEmail(email)) {
      return res.sendStatus(401);
    }
  }

  if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.sendStatus(401);
    }
    if (!validateEmail(email)) {
      return res.sendStatus(401);
    }
  }

  next();
};
