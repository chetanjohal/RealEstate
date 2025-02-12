var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var q = require('q');
// Load the bcrypt module
var bcrypt = require('bcrypt-nodejs');
var deferred = q.defer(); // Use Q

var connection = mysql.createConnection({
    host: "localhost",
    user: "fa17g01",
    password: "csc648fa17g01",
    database: "fa17g01"
});

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// expose this function to our app using module.exports
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        //console.log("serialize: "+user.username);
        done(null, user.username);
    });

    passport.deserializeUser(function (user, done) {
        //If using Mongoose with MongoDB; if other you will need JS specific to that schema
        //User.findById(id, function (err, user) {
        //console.log("deserialize: "+user);
        connection.query("SELECT * FROM `users` WHERE `username` = '" + user + "'", function (err, user) {
            done(err, user[0]);
        });
    });


    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = '" + username + "'", function (err, rows) {
                //connection.query("select * from users where email = '" + email + "'", function (err, rows) {
                //console.log(rows);
                //console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, console.log('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();
                    let email = req.body.email;
                    let isAgent = req.body.is_agent;
                    newUserMysql.username = username;
                    var hash = bcrypt.hashSync(password);
                    console.log("hash: "+hash);
                    newUserMysql.password = hash; // use the generateHash function in our user model
                    newUserMysql.email = email;
                    console.log("isAgent: " +  isAgent);

                    var insertQuery = "INSERT INTO `users` (username, password, email, is_agent) values ('" + username + "','" + hash + "','" +  email + "','" +  isAgent + "')";
                    insertClient(insertQuery)
                        .then(() => {
                            connection.query("SELECT * FROM `users` WHERE `username` = '" + newUserMysql.username + "'", function (err, rows) {
                               // console.log("rows:");
                                //console.log(rows);
                                newUserMysql.user_id = rows[0]['user_id'];
                                console.log(newUserMysql);
                                return done(null, newUserMysql);
                            });
                        });
                }
            });
        }));


    function insertClient(insertQuery) {
        //console.log(insertQuery);
        connection.query(insertQuery, function (err, rows) {
            if (err) {
                //throw err;
                deferred.reject(err);
            }
            else {
                console.log("User created in DB");
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    }

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {
            console.log("local-login");
            connection.query("SELECT * FROM `users` WHERE `username` = '" + username + "'", function (err, rows) {
                //console.log(rows);
                //console.log("above row object");
                if (err)
                    return done(err);
                if (!rows.length) {
                    console.log('loginMessage', 'No user found.');
                    return done(null, false, {message: 'Incorrect username.'}); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong

                if (!bcrypt.compareSync(password, rows[0].password)) {
                    console.log('loginMessage', 'Oops! Wrong password.');
                    return done(null, false, {message: 'Incorrect password.'}); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                console.log('loginMessage', 'Successful');
                return done(null, rows[0]);
            });
        }
    ));
};
