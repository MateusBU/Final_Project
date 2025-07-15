const {authSecret} = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app =>{

    // Handles user login, token generation and response
    const signin = async(req, res) => {
        // Ensure email and password are provided
        if(!req.body.email || !req.body.password){
            return res.status(400).send("Inform user and password");
        }
        // Look up user in database by email
        const user = await app.db('users')
            .where({email: req.body.email})
            .first()

        // If user is not found, return error
        if(!user) return res.status(400).send('user not found!');

        // Check if the provided password matches the stored hash
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatch) return res.status(401).send('Email/password may be wrong')
        
        const now = Math.floor(Date.now() / 1000);

        //TODO reset exp every time the user logs in
        // Create payload for JWT, valid for 3 days
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //issued at
            exp: now + (60 * 60 * 24 * 2) //valid login is for 3 DAYS
        }

        // Respond with user info and token
        res.json({
            ...payload, 
            token: jwt.encode(payload, authSecret)
        });
    }
    
    // Validates a provided token to check if it's still valid
    const validateToken = async(req, res) =>{
        const userData = req.body || null;
        try{
            if(userData){
                // Decode token using secret
                const token = jwt.decode(userData.token, authSecret);
                // Check if token is still valid
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true); //TODO do a new token with new user.exp (token.exp)
                }
            }
        }
        catch(e){
            // Token is invalid or decoding failed (e.g., wrong authSecret)
        }
        res.send(false);// Token is invalid or expired
    }

    return {signin, validateToken};
}