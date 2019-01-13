const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require("request")
const Auth = mongoose.model('Auth')

const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const token = require('./../libs/tokenLib')
const check = require('./../libs/checkLib')

let isAuthorized = async (req, res, next) => {


    if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {
        const result = await Auth.findOne({ authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken });
        try {
            if (check.isEmpty(result)) {
                logger.captureError('No AuthorizationKey Is Present', 'AuthorizationMiddleware', 10)
                let apiResponse = responseLib.generate(true, 'Invalid Or Expired AuthorizationKey', 404, null)
                res.send(apiResponse)
            } else {
              let decoded = await token.verifyToken(result.authToken, result.tokenSecret)
               
                try{
                    req.user = { userId: decoded.data.userId }
                    next()

                } catch(err){
                    logger.captureError(err.message, 'Authorization Middleware', 10)
                        let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
                        res.send(apiResponse)
                }    
                

            }
        } catch (err) {

            logger.captureError(err.message, 'AuthorizationMiddleware', 10)
            let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
            res.send(apiResponse)

        }


    } else {
        logger.captureError('AuthorizationToken Missing', 'AuthorizationMiddleware', 5)
        let apiResponse = responseLib.generate(true, 'AuthorizationToken Is Missing In Request', 400, null)
        res.send(apiResponse)
    }
}


module.exports = {
    isAuthorized: isAuthorized
}
