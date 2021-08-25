const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// Create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
     return jwt.sign({ id, role }, process.env.JWT_SECRET, {
          expiresIn: maxAge
     })
}



/*
* Register User
*/
exports.register = (req, res) => {
     const { first_name, last_name, email, password } = req.body
     const HashPass = bcrypt.hashSync(password, 5)

     User.findOne({email: email}).then(data => {
          if(data) {
               return res.json({message: 'Email already exist'})
          }

          new User({
               first_name: first_name,
               last_name: last_name,
               email: email,
               role: 'user',
               password: HashPass
          })
          .save()
          .then(data => {
               return res.json({data: data, message: "User created success"})
          })
          
     }).catch(function(err) {console.log(err)})
     
     
}


/*
* Sign in User
*/
exports.signIn = (req, res) => {
     const { email, password } = req.body

     User.findOne({email: email}).then(user => {
          if(!user) {
               return res.json({message: 'Email or password incorrect'})
          }

          if(!bcrypt.compareSync(password, user.password)) {
               return res.json({message: 'Email or password incorrect'})
          }

          // Setup Token in Cookie
          const token = createToken(user._id, user.role)

          if ( user.role === 'admin') {
               return res.status(200).cookie('admin', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000
               }).json({message: 'You\'re LoggedIn as Admin'})
          } 
          else if( user.role === 'user') {
               return res.status(200).cookie('user', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000
               }).json({message: 'You\'re LoggedIn as User'})
          }
          
     })
     .catch((err) => {console.log(err)})
}


/* 
* Logout User
*/
exports.logout = (req, res) => {
     res.clearCookie('user')
     res.clearCookie('admin')
     // res.cookie('technician_token', '', { maxAge: 1 })
     res.redirect('/')
 }