// const jwt = require('jwt-simple');
// const User = require('./models/users');
// const config = require('./config')

// exports.requireSignedIn = ( req, res, next ) => {

//     // console.log('req.body az addCity CityController', req.body);
//     const { authentication } = req.headers;
//     const { sub, iat } = jwt.decode(authentication, config.mySecret);

//     User.findById(sub)
//       .exec()
//       .then(userFinded => {
//         req.user = userFinded;
//         next()
//       })

//   }
