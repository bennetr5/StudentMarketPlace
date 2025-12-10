import { Strategy as LocalStrategy } from "passport-local"
import passport from 'passport'
import bcrypt from "bcrypt"
import User from '../models/user.js'

export default function(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "username" },
            async (username, password, done) => {
                try {
                    const user = await User.findOne({ username: username })
                    if (!user) {
                        return done(null, false, {message: "Incorrect Username"})
                    }

                    const validPassword = await bcrypt.compare(password, user.password)
                    if (!validPassword) {
                        return done(null, false, {message: "Incorrect Password"})
                    }

                    return done(null, user)
                }
                catch(err) {
                    return done(err)
                }
            }
        )
    )
}

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    }
    catch(err) {
        done(err)
    }
})