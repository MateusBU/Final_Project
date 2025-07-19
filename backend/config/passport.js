const {authSecret} = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const {Strategy, ExtractJwt} = passportJwt

// Exporting a function that receives the app instance
module.exports = app =>{

    // JWT strategy configuration parameters
    const params = {
         // Secret key to verify the JWT signature (import this from your config, usually)
        secretOrKey: authSecret,
        // Tells Passport to extract the JWT from the Authorization header as a Bearer token
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    // Creating a new JWT strategy using the defined params
                                            //same payload of signin in auth.js
    const strategy = new Strategy(params, (payload, done) =>{
        // Look for the user in the database using the ID from the JWT payload
        app.db('users')
            .where({id: payload.id})
            .first()
            .then(user => done(null, user ? {...payload} : false)) // Look for the user in the database using the ID from the JWT payload
            .catch(err => done(err, false))
    });
     // Registering the strategy with Passport
    passport.use(strategy);

    // Returning a middleware function to use in route protection
    return{
        // Will use the 'jwt' strategy and disable sessions (since we're using token-based auth)
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}
