const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();

const localStrategy = new Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    console.log('email : ', email)
    try {
        const user = service.findByEmail(email).then((user) => {
            console.log('user.email : ', user.email)
            console.log('user.name : ', user.name)
            if (!user) {
                done(boom.unauthorized(), false)
            }
            const isMatch = bcrypt.compareSync(password, user.password)
            console.log('isMatch : ', isMatch)

            if (!isMatch) {
                done(boom.unauthorized(), false);
            }
            done(null, user)

        });

        console.log('user : ', user)

    } catch (error) {
        done(error, false)
    }
})

module.exports = localStrategy;