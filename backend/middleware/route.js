const protectedRoute = (allowedRoles = [], redirectTo = '/admin/login') => function (req, res, next) {
  console.log('req._auth 1', req._auth)

  const { role = 'unsigned' } = req._auth || {};

  if (!allowedRoles.includes(role)) {
    console.log('here should be a redirect to /admin/login')
    res.writeHead(302, {
      Location: redirectTo
    });
    res.end();

    // res.send({"result": "Not admin"})
    // return res.redirect(redirectTo);
  } else {
    next();
  }
};

module.exports = {
  protectedRoute
};
