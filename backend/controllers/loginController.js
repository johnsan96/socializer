const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}
exports.login = (req, res) => {

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    /*  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
     refreshTokens.push(refreshToken) */

    res.cookie("token", accessToken,
        {
            httpOnly: false
        })
    res.json({ accessToken: accessToken/* , refreshToken: refreshToken  */})
}

const token = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
}