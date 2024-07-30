const protectedRoute = (allowedRoles = [], redirectTo = 'http://localhost:8080/admin/login') => function (req, res, next) {
  console.log('req._auth 1', req._auth)

  const { role = 'unsigned' } = req._auth || {};

  if (!allowedRoles.includes(role)) {
    console.log('here should be a redirect to', redirectTo)


    res.send({"result": false})
    // res.redirect(redirectTo);
  } else {
    next();
  }
};

module.exports = {
  protectedRoute
};
