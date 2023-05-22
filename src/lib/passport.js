const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    //console.log(rows[0][0]);
    if (rows[0].length > 0){
        const user = rows[0][0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword){
            done(null, user, req.flash('success', `Welcome ${user.username}`));
        } else {
            done(null, false, req.flash('message', `Incorrect Password ...`));
        }
    } else {
        return done(null, false, req.flash('message', `The username does not exist`))
    }
}))


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const { fullname } = req.body;
    const newUser = {
        username,
        password: await helpers.encryptPassword(password),
        fullname
    };
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result[0].insertId;
    return done(null, newUser);
}));


passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE ID = ?', [id]);
    done(null, rows[0][0]);
})