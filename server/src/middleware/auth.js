const jwt = require('jsonwebtoken')


exports.isLoggedIn =  (req, res, next) => {
    const token = req.cookies.admin || req.cookies.user

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) throw err

            else {
                next()
            }
        })
    }
    else {
        res.json('you\'re not logged in')
    }

}


// Check user role & is auth or not
exports.checkUser = (req, res, next) => {
    const token = req.cookies.admin || req.cookies.user
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                decodedToken.role === 'admin'
                ? res.status(200).clearCookie('admin').json({ role: 'Admin'})
                : res.status(200).clearCookie('user').json({ role: 'User'})
            }
            else {
                decodedToken.role === 'admin'
                    ? res.status(200).json({ isAuth: true, role: 'Admin' })
                    : res.status(200).json({ isAuth: true, role: 'User' })
            }
        })
    }
    else {
        res.status(200).json({ isAuth: false, role: '' })
    }
}