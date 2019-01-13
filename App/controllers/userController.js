const mongoose = require('mongoose');
const shortId = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('./../libs/paramValidationLib');
const passwordLib = require('./../libs/generatePasswordLib')
const check = require('./../libs/checkLib');
const token = require('./../libs/tokenLib');
const emailVerify = require('./../libs/emailVerificationLib')

const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')

const appUrl = "http://localhost:4200"


let getAllUser = async (req, res) => {
   const result = await UserModel.find() .select(' -password -__v -_id').lean().exec() 
            
        try{
            if (check.isEmpty(result)) {
                logger.captureInfo('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        } catch(err) {
                logger.captureError(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
        }
        
}// end get all users

/* Get single user details */
let getSingleUser = async (req, res) => {
   const result = await UserModel.findOne({ 'userId': req.params.userId, 'verified': true }).select('-password -__v -_id').lean().exec();
        try{
            if (check.isEmpty(result)) {
                logger.captureInfo('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        } catch(err){
            console.log(err)
                logger.captureError(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
        }
}// end get single user

let deleteUser = async (req, res) => {

   const result = await UserModel.deleteOne({ 'userId': req.body.userId }).exec()
    
    try{
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
            res.send(apiResponse)
        }
    } catch(err){
        console.log(err)
            logger.captureError(err.message, 'User Controller: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
    }


}// end delete user

let editUser = async (req, res) => {

    let options = req.body;
    const result = await UserModel.update({ 'userId': req.params.userId }, options).exec()
     try{
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    } catch(err){
        console.log(err)
            logger.captureError(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
    }


}// end edit user

// start user signup function 

let signUpFunction = async (req, res) => {
    await new Promise(async (resolve) => {
        if (req.body.email) {
            if (!validateInput.Email(req.body.email)) {
                let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null)
                res.send(apiResponse)
            } else if (check.isEmpty(req.body.password)) {
                let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                res.send(apiResponse)
            } else {
                resolve(req)
            }
        } else {
            logger.captureError('Field Missing During User Creation', 'userController: createUser()', 5)
            let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
            res.send(apiResponse)
        }
    })
    await new Promise(async () => {
        let retrievedUserDetails = await UserModel.findOne({ email: req.body.email }).exec()
        try {
            if (check.isEmpty(retrievedUserDetails)) {
                console.log(req.body)
                let newUser = new UserModel({
                    userId: shortId.generate(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName || '',
                    email: req.body.email.toLowerCase(),
                    mobileNumber: req.body.mobileNumber,
                    password: passwordLib.hashpassword(req.body.password),
                    country: req.body.country,
                    isAdmin : req.body.isAdmin,
                    createdOn: time.now()
                })
                newUser.save((err, newUser) => {
                    if (err) {
                        console.log(err)
                        logger.captureError(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                        res.send(apiResponse)
                    } else {
                        let newUserObj = newUser.toObject();
                        let emailOptions = {
                            email: newUserObj.email,
                            name: newUserObj.firstName + ' ' + newUserObj.lastName,
                            subject: 'Welcome to Meet Planner ',
                            html: `<b> Dear ${newUserObj.firstName}</b><br> Hope you are doing well. 
                            <br>Welcome to our Meet Planner App <br>
                            Please click on following link to verify your account with Lets-Do.<br>
                            <br> <a href="${appUrl}/verify-email/${newUserObj.userId}">Click Here</a>                                     
                            `
                        }
                        setTimeout(() => {
                            emailVerify.sendEmail(emailOptions);
                        }, 2000);
                        delete newUserObj.password
                        let apiResponse = response.generate(false, 'User created', 200, newUserObj)
                        res.send(apiResponse)
                    }
                })
            } else {
                logger.captureError('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                res.send(apiResponse)
            }
        } catch (err) {
            logger.captureError(err.message, 'userController: createUser', 10)
            let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
            res.send(apiResponse)
        }
    })

}// end user signup function 

let emailVerification = async (req, res) =>{
    const data = await UserModel.findOne({userId: req.body.userId, verified: true}).exec()
    if(data){
        let apiResponse = response.generate(true, 'Email Already Verified', 200, null)
        res.send(apiResponse)
    }else{
    
    const result = await UserModel.updateOne({ 'userId': req.body.userId }, {'verified': true}).exec()
     try{
         
        if (check.isEmpty(result)) {
            logger.captureInfo('No User Found', 'User Controller: emailVerification')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Email Verified Successfully', 200, result)
            res.send(apiResponse)
        }
    } catch(err){
        console.log(err)
            logger.captureError(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
    }
    }
}

let loginFunction = async (req, res) => {
  try{  
    console.log("findUser");
    let retrievedUserDetails = await new Promise((resolve) => {
        if (req.body.email) {
            console.log('req body email is here');
            console.log(req.body);
            UserModel.findOne({ email: req.body.email, verified: true }, (err, userDetails) => {
                if (err) {
                    console.log(err);
                    logger.captureError('Failed To Retrieve User Data', 'userController: findUser()', 10);
                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null);
                    res.send(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.captureError('No User Found', 'userController: findUser()', 7)
                    let apiResponse = response.generate(true, 'No Details Found or Your email might not be verified', 404, null)
                    res.send(apiResponse)
                } else {
                    logger.captureInfo('User Found', 'userController: findUser()', 10)
                    resolve(userDetails)
                }
            })
        } else {
            let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
            res.send(apiResponse)
        }
    })
    console.log('validatePassword');
    let userDetails = await new Promise(async (resolve) => {
        let isMatch = await passwordLib.comparePassword(req.body.password, retrievedUserDetails.password)
      try{  
        if (isMatch) {
            let retrievedUserDetailsObj = retrievedUserDetails.toObject()
            delete retrievedUserDetailsObj.password
            delete retrievedUserDetailsObj._id
            delete retrievedUserDetailsObj.__v
            delete retrievedUserDetailsObj.createdOn
            delete retrievedUserDetailsObj.modifiedOn
            resolve(retrievedUserDetailsObj)
        } else {
            logger.captureInfo('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
            let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
            res.send(apiResponse)
        }
    }catch(err){
        logger.captureError(err.message, 'userController: loginFunction', 10)
        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
        res.send(apiResponse)
    }
    })

    console.log("generate token");
    let tokenDetails = await new Promise(async (resolve) => {
        let tokenDetails = await token.generateToken(userDetails)
        if (!tokenDetails) {
            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
            res.send(apiResponse)
        } else {
            tokenDetails.userId = userDetails.userId
            tokenDetails.userDetails = userDetails
            resolve(tokenDetails)
        }
    })
    console.log('save token');
    let result = await new Promise(async (resolve) => {
        let retrievedUserDetails = await AuthModel.findOne({ userId: tokenDetails.userId })
      try{  
        if (check.isEmpty(retrievedUserDetails)) {
            let newAuthToken = new AuthModel({
                userId: tokenDetails.userId,
                authToken: tokenDetails.token,
                tokenSecret: tokenDetails.tokenSecret,
                tokenGenerationTime: time.now()
            })
            newAuthToken.save((err, newTokenDetails) => {
                if (err) {
                    console.log(err)
                    logger.captureError(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, "Failed to generate token", 500, null)
                    res.send(apiResponse)
                } else {
                    let responseBody = {
                        authToken: newTokenDetails.authToken,
                        userDetails: tokenDetails.userDetails
                    }
                    resolve(responseBody)
                }
            })
        } else {
            retrievedUserDetails.authToken = tokenDetails.token
            retrievedUserDetails.tokenSecret = tokenDetails.tokenSecret
            retrievedUserDetails.tokenGenerationTime = time.now()
            retrievedUserDetails.save((err, newTokenDetails) => {
                if (err) {
                    console.log(err)
                    logger.captureError(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed to generate token', 500, null)
                    res.send(apiResponse)
                } else {
                    let responseBody = {
                        authToken: newTokenDetails.authToken,
                        userDetails: tokenDetails.userDetails
                    }

                    resolve(responseBody)
                }
            })

        }
    }catch(err){
        console.log(err.message, "userController: saveToken", 10);
            let apiResponse = response.generate(true, 'Failed to generate token', 500, null)
            res.send(apiResponse)
    }
    })



    let apiResponse = response.generate(false, 'Login Successful', 200, result)
    res.status(200)
    res.send(apiResponse)
}catch(err){
        console.log("errorhandler");
        console.log(err);
        res.status(err.status)
        res.send(err)
    }


} 

let forgetPassword = async (req, res) => {
    let details = await UserModel.findOne({'email': req.body.email, 'verified': true})
    try{
        if(check.isEmpty(details)){
            logger.captureInfo('No User Found', 'User Controller:forgetPassword')
            let apiResponse = response.generate(true, 'Provided Email is not register with us or not yet verified', 404, null)
            res.send(apiResponse)
        } else {
            let userDetails = details.toObject();
                        let emailOptions = {
                            email: userDetails.email,
                            name: userDetails.firstName + ' ' + userDetails.lastName,
                            subject: 'Welcome to Meet Planner ',
                            html: `<b> Dear ${userDetails.firstName}</b><br> Hope you are doing well. 
                            <br>Welcome to our Meet Planner App <br>
                            Please click on following link to Reset you pasword with Meet Planner.<br>
                            <br> <a href="${appUrl}/reset-password/${userDetails.userId}">Click Here</a>                                     
                            `
                        }
                        setTimeout(() => {
                            emailVerify.sendEmail(emailOptions);
                        }, 2000);
            let apiResponse = response.generate(false, 'Password reset link sent successfully', 200, null)
            res.send(apiResponse)
        }
    } catch(err){
        logger.captureError(err.message, 'User Controller: forgetPassword', 10)
        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
         res.send(apiResponse)
    }
}

let resetPassword = async(req, res) =>{
    const result = await UserModel.updateOne({'userId': req.body.userId}, {'password': passwordLib.hashpassword(req.body.password)})
    try{
        if(check.isEmpty(result)){
            logger.captureInfo('No User Found', 'User Controller:resetPassword')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log(result)
            let apiResponse = response.generate(false, 'Password has been changed successfully!!', 200, null)
            res.send(apiResponse)
        }
    } catch(err){
        logger.captureError(err.message, 'User Controller: resetPassword', 10)
        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
         res.send(apiResponse)
    }
}

let logout = async (req, res) => {
  let userDetails = await  UserModel.findOne({userId: req.body.userId})
  try{
    if(check.isEmpty(userDetails)){
        logger.captureInfo('No User Found', 'User Controller:logout')
        let apiResponse = response.generate(true, 'No User Found', 404, null)
        res.send(apiResponse)
    } else {
        await AuthModel.findOneAndDelete({userId: req.body.userId})
        let apiResponse = response.generate(false, 'Logged out successfully', 200, null)
        res.send(apiResponse)
    }
} catch(err){
    logger.captureError(err.message, 'User Controller: logout', 10)
    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
     res.send(apiResponse)
}


} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout,
    getAllUser : getAllUser,
    deleteUser : deleteUser,
    getSingleUser : getSingleUser,
    editUser : editUser,
    emailVerification: emailVerification,
    forgetPassword: forgetPassword,
    resetPassword: resetPassword

}// end exports