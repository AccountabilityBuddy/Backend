const bcrypt = require('bcryptjs');
const user = require('../../models/user');
const User = require('../../models/user')

module.exports = {
    users: async (args) => {
        let users;
        let usersPromise;
        if (args.id != null){
            usersPromise = User.findById(args.id)
        } else {
            usersPromise = User.find()
        }

        users = await usersPromise.populate({
            path: 'createdGoals',
            populate: { 
                path: 'buddy'
            }
        });

        users = await usersPromise.populate({
            path: 'goalsResponsible',
            populate: { 
                path: 'creator'
            }
        });

        users = await usersPromise.populate({
            path: 'goalsResponsible',
            populate: { 
                path: 'sessions'
            }
        });

        if (!Array.isArray(users)){
            // Ensure the object is an array to prepare for the mapping.
            users = [users]
        }

        return users
    },
    createUser: (args) => {
        return User.findOne({email: args.userInput.email}).then(user => {
            if (user){
                // Duplicate user, uncomment if need be.
                throw new Error("User exists already")
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
    },
    checkPassword: async (args) => {
        var users = await User.find({email: args.loginInfo.email})
        if (await bcrypt.compare(args.loginInfo.password, users[0].password))
        {
            return(users[0])
        }
        throw new Error("Incorrect username/password")
    },
    getIdByEmail: async (args) => {
        var users = await User.findOne({email: args.userEmail.email})
        if (users === null){
            throw new Error("No user found")
        }
        return users.id
    }
}