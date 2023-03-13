const jwt = require('jsonwebtoken');

const isLoggedIn = function (req, res, next) {
  jwt.verify(
    req.cookies.Token,
    'mynameispulkitupadhyayfromharda',
    (err, authData) => {
      if (err) {
        res.send('You please login first are not logged in please log in first ');
      } else {
        //   res.sendStatus(403);
        next(); 
        // res.clearCookie('Token');
      }
    }
  );
};
module.exports = isLoggedIn;
