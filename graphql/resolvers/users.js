const bcrypt = require('bcryptjs');
const User = require('../../models/user')

module.exports = {
    users: () => {
        // Two returns due to:
        // The first return: Tell JS that a promise will be returned
        // The second return: Return the actual list of events
        return User.find().populate('createdEvents').then(users => {
            return users.map(user => {
                return { ...user._doc, password: null };
            })
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email}).then(user => {
            if (user){
                // Duplicate user, uncomment if need be.
                // throw new Error("User exists already")
            }
            return bcrypt.hash(args.userInput.password, 12)
            .then(hashedPass => {
                const user = new User({
                username: args.userInput.username,
                password: hashedPass,
                email: args.userInput.email,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName                
            });

            return user.save()
            .then(user => {
                return {...user._doc, password: null}
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
            })
        })
    }
}