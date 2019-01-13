const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = "ArfiIAlwaysLoveYouAlot"

let generateToken = (data) => {

    try {
        let claims = {
            jetid: shortId.generate(),
            iat: Date.now(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            sub: 'authToken',
            iss: 'isuueTracker',
            data: data
        }
        let tokenDetails = {
            token: jwt.sign(claims, secretKey),
            tokenSecret: secretKey
        }
       return tokenDetails
    } catch (err) {
        console.log(err);
        return err
    }
}

let verifyClaim = async (token, secretKey) => {
    const decoded = await jwt.verify(token, secretKey)
    try {

        console.log('user verified');
        console.log(decoded);
        return decoded

    } catch (err) {
        console.log('error while verify token')
        console.log(err);
        return err
    }
}

let verifyClaimWithoutSecret = async (token) => {
    // verify a token symmetric
    const decoded = await jwt.verify(token, secretKey);
    try {
        console.log("user verified");
        return decoded

    } catch (err) {

        console.log("error while verify token");
        console.log(err);
        return (err, data)

    }



}// end verify claim 


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyClaim,
    verifyClaimWithoutSecret: verifyClaimWithoutSecret
}