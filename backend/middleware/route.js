const protectedRoute = (allowedRoles = [], redirectTo = 'http://localhost:8080/admin/login') => function (req, res, next) {
  const { role = 'unsigned' } = req._auth || {};
  console.log('role', role)

  if (!allowedRoles.includes(role)) {

    res.send({"result": false})
    // res.redirect(redirectTo);
  } else {
    next();
  }
};

module.exports = {
  protectedRoute
};
