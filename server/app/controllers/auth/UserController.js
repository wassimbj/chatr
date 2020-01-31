const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
const redisClient = require('../../../config/redis');
// const crypto = require('crypto');


class User {
    
    // Login/Register user using Facebook
    async facebookSign(accessToken, refreshToken, profile, done) {

        // Here we will do everything...
        // 1) get user by the email
        // 2) if there is an existing account, login him in 
        // 3) else create a new

        try {

            const existedUser = await UserModel.findOne({ email: profile.emails[0].value });

            if (existedUser) {
                // Log him in
                // console.log('User already exists');
                done(null, existedUser);
            } else {
                // Create an account
                const newUser = await UserModel.create({
                    method: 'google',
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                    "name.firstname": profile.name.givenName,
                    "name.lastname": profile.name.familyName
                });
                // console.log('Created a new user');

                done(null, newUser);
            }


        } catch (err) {
            console.log('FACEBOOK_AUTH_ERROR: ', err);
        }

    }

    facebookAuthCallback(req, res) {
        // Set user session
        req.session.userid = req.user._id;
        req.session.save((err) => {
            if(err)
                console.log(err);
            return res.status(200).json({ fail: false, msg: 'logged in with success' });
        });
    }


    // Register user (By email, no OAuth)
    async store(req, res) {
        const {email, password, firstname, lastname} = req.body;
        
        // Check if there is already an account with this email
        let userExists = await UserModel.findOne({ email: email });
        if (userExists)
            return res.status(400).json({ fail: true, msg: 'there is already an account' });
        else {
            // Hash the user password
            let hashed_password = await bcrypt.hash(password, 10);
            await UserModel.create({
                email,
                password: hashed_password,
                method: 'local',
                "name.firstname": firstname,
                "name.lastname": lastname
            }, (err, user) => {
                if (!err) {
                    req.session.userid = user.id;
                    req.session.save((err) => {
                        if (err)
                            console.log(err);
                        return res.status(200).json({ fail: false, msg: 'Successfully registered' })
                    });
                } else {
                    return res.status(500).json({ fail: true, msg: err })
                }
            });
        }
    }

    // Login user (By email, no OAuth)
    async emailLogin(req, res) {
        const {email, password} = req.body;
        // Get the user by email
        await UserModel.findOne({ email: email }, (err, user) => {
            // Check if there is user
            if (!err && user) {
                // compare passwords
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userid = user.id;
                        req.session.save((err) => {
                            if (err)
                                console.log(err);
                            return res.status(200).json({fail: false, msg: 'user logged in successfully'});
                        });
                    } else {
                        return res.status(400).json({fail: true, msg: 'This email is associated with a facebook account, try to login using facebook.'})
                    }
                });
            } else {
                return res.status(400).json({fail: true, msg: 'No user found'})
            }
        });

    }

    // Get authenticated user
    async getUser(req, res){
        let loggedInUser = await UserModel.findOne({_id: req.session.userid}, 'name');
        return res.status(200).json({ msg: 'slm', id: req.session.userid, name: loggedInUser.name });
    }

    // Logout user
    logout(req, res) {
        redisClient.hdel(`user:${req.session.userid}`, 'socketid', (err, reply) => {
            req.session.destroy((err) => {
                return res.status(200).json({fail: false, msg: 'logged out !'});
            });
        })
    }

    // a middleware to check if user is authenticated
    mustBeAuth(req, res, next){
        UserModel.findOne({_id: req.session.userid}, (err, user) => {
            if(err || !user)
                return res.status(401).json({fail: true, msg: 'You must be logged in'});
              next();
        });
    }

    // gives a 400 if user is trying to access routes that he needs to be log out to access'em like the login and signup
    redirectIfAuth(req, res, next){
        if(req.session.userid)
            return res.status(400).json({fail: true, msg: 'already logged in'});    
        
        next();
    }  
}

module.exports = new User();