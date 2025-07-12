const bcrypt = require('bcrypt-nodejs');
const { userParams } = require('../config/db');

//app is the same from index.js
module.exports = app =>{

    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt); //crypted password
    }

    // Save a new user or update an existing one
    const save = async(req, res) =>{
        const user = {...req.body}; //json on url
        if(req.params.id) user.id = req.params.id

        try{
            // Verify if all required fields are provided and valid
            existsOrError(user.name, 'Name is required');
            existsOrError(user.email, 'Email is required');
            existsOrError(user.password, 'Password is required');
            existsOrError(user.confirmPassword, 'Password confirmation is required');
            equalsOrError(user.password, user.confirmPassword, 'Passwords do not match');
            
            const userFromDB = await app.db('users') //db is a way to access knex
                .where({email: user.email}).first();

            // If this user already exists, prevent duplicate registration in the database
            if(!user.id){
                notExistsOrError(userFromDB, 'User already registered');
            }
        }
        catch(msg){
            return res.status(400).send(msg);
        }

        // Hash the user's password before saving
        user.password = encryptPassword(user.password);
        // Remove the password confirmation field — it's not stored in the database
        delete user.confirmPassword;

        // If the user already exists (based on ID), update their information
        // If successful, respond with status 204 (No Content); otherwise, return status 500 (Server Error)
        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        
    }
    //get all user of database
    const get = (req, res) =>{
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    return {save, get};
}