const express = require('express');
const router = express.Router();
const userController = require("./../controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

let baseUrl = `${appConfig.apiVersion}/users`;

module.exports.setRouter = (app) =>{

     // params: firstName, lastName, email, password , mobileNumber.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for Registering User.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastname Last Name of the user. (body params) (required)
     * @apiParam {string} countryName country Name of the user. (body params) (required)
     * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
        "error": false,
        "message": "User Created",
        "status": 200,
        "data": [
            {
                "createdOn": "2018-09-12T13:42:58.000Z",
                "emailVerified": "Yes",
                "validationToken": "Null",
                "email": "sayyedsofttech313@gmail.com",
                "password": "$2a$10$XvHxf9JX76JvvIeqwd2CoOdxtCraX23nR2ToAYIhynLmNquDFdbOa",
                "mobileNumber": "91 7840962887",
                "countryName": "India",
                "lastName": "Sayyed",
                "firstName": "Shahrukh",
                "userId": "kqdFThCqv"
            }
        }
    */
    
     // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for Login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJKc0NubExxWCIsImlhdCI6MTUzODgxNzIzNDUzNCwiZXhwIjoxNTM4OTAzNjM0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJsZXRzTWVldEFwcCIsImRhdGEiOnsiZnJpZW5kUmVxdWVzdFNlbnQiOltdLCJmcmllbmRSZXF1ZXN0UmVjaWV2ZWQiOltdLCJmcmllbmRzIjpbXSwiZW1haWxWZXJpZmllZCI6IlllcyIsInZhbGlkYXRpb25Ub2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpxZDNScFpDSTZJa0o1ZFdaTFRWTTFOeUlzSW1saGRDSTZNVFV6T0RjMU9Ea3lOemszTWl3aVpYaHdJam94TlRNNE9EUTFNekkzTENKemRXSWlPaUpoZFhSb1ZHOXJaVzRpTENKcGMzTWlPaUpzWlhSelRXVmxkRUZ3Y0NJc0ltUmhkR0VpT25zaVgybGtJam9pTldKaU56azFNbVJtWWpVNFpXRXhNVGM0TWpBMU9UQTBJaXdpWDE5Mklqb3dMQ0pqY21WaGRHVmtUMjRpT2lJeU1ERTRMVEV3TFRBMVZERTJPalExT2pNekxqQXdNRm9pTENKbGJXRnBiRlpsY21sbWFXVmtJam9pV1dWeklpd2lkbUZzYVdSaGRHbHZibFJ2YTJWdUlqb2lJaXdpWlcxaGFXd2lPaUp6YUdGb2NuVnJhSE5oZVhsbFpDNTBaV05vUUdkdFlXbHNMbU52YlNJc0luQmhjM04zYjNKa0lqb2lKREpoSkRFd0pGWXpZbXRLVjBKbFZHOXphelYwTlM0d2VreEVaQzVJZUhoaVMzY3djSGxTUTBkNE5rVTFjMlJpTDBZNWVXdEZMekJGVmtwbElpd2ljM1JoZEhWeklqb2liMlptYkdsdVpTSXNJbWx6UVdSdGFXNGlPaUoxYm1SbFptbHVaV1FpTENKdGIySnBiR1ZPZFcxaVpYSWlPaUk1TVNBM09EUXdPVFl5T0RnM0lpd2lZMjkxYm5SeWVVNWhiV1VpT2lKSlRpSXNJblZ6WlhKT1lXMWxJam9pZFc1a1pXWnBibVZrSWl3aWJHRnpkRTVoYldVaU9pSlRZWGw1WldRaUxDSm1hWEp6ZEU1aGJXVWlPaUpUYUdGb2NuVnJhQ0lzSW5WelpYSkpaQ0k2SWxOclFrVklabE01TnlKOWZRLm1ocWs0Y2JzX1gyX2dieWtvUExydlJTU2drOHF4elRLLVBtU2V4ZGZ4V3ciLCJlbWFpbCI6InNoYWhydWtoc2F5eWVkLnRlY2hAZ21haWwuY29tIiwic3RhdHVzIjoib2ZmbGluZSIsImlzQWRtaW4iOiJ1bmRlZmluZWQiLCJtb2JpbGVOdW1iZXIiOiI5MSA3ODQwOTYyODg3IiwiY291bnRyeU5hbWUiOiJJTiIsInVzZXJOYW1lIjoidW5kZWZpbmVkIiwibGFzdE5hbWUiOiJTYXl5ZWQiLCJmaXJzdE5hbWUiOiJTaGFocnVraCIsInVzZXJJZCI6IlNrQkVIZlM5NyJ9fQ.-du1nE9FDeCDVf7fA7JjGVIPcYY7hb9TxvGLH6fYxd0",
                "userDetails": {
                    "verified": true,
                    "email": "fslkhn93@gmail.com",
                    "mobileNumber": "91 7840962887",
                    "countryName": "IN",
                    "lastName": "Faisal",
                    "firstName": "Khan",
                    "userId": "kqdFThCqv",
            }
        }
    */    

    // params: userId.
    app.post(`${baseUrl}/verifyEmail`, userController.emailVerification);
    /**
       * @apiGroup users
       * @apiVersion  1.0.0
       * @api {post} /api/v1/users/verifyEmail api for Verifying User Email Id.
       *
       * @apiParam {string} userId userId of the user. (body params) (required)
       *
       * @apiSuccess {object} myResponse shows error status, message, http status code, result.
       * 
       * @apiSuccessExample {object} Success-Response:
          {
              "error": false,
              "message": "User email verified",
              "status": 200,
              "data": "None"
          }
      */
     // params: verified email address.
    app.post(`${baseUrl}/forgetPassword`, userController.forgetPassword);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgetPassword api for Updating Password after Reset.
     *
     * @apiParam {string} user email address. (body params) (required)
     * @apiParam {string} verified as true . (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Password reset link sent successfully",
            "status": 200,
            "data": "None"
            
        }
    */
     
     // params: userId, New Password.
    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/resetPassword api for Updating Password after Reset.
     *
     * @apiParam {string} user Id. (body params) (required)
     * @apiParam {string} New Password . (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Password has been changed successfully!!",
            "status": 200,
            "data": "None"
            
        }
    */

    app.get(`${baseUrl}/getAllUsers`, auth.isAuthorized, userController.getAllUser);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/getAllUsers api for Getting all users.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [
                {
                    "createdOn": "2018-09-12T13:42:58.000Z",
                    "verified": true,
                    "email": "fslkhn93@gmail.com",
                    "mobileNumber": "91 876799554",
                    "countryName": "India",
                    "lastName": "Khan",
                    "firstName": "Faisal",
                    "userId": "kqdFThCqv"
                }
            ]
        }
    */

    // params: userId.
    app.post(`${baseUrl}/deleteUser`, auth.isAuthorized, userController.deleteUser);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/deleteUser api to Delete User.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Deleted the user successfully",
            "status": 200,
            "data": {
                "createdOn": "2018-09-12T13:42:58.000Z",
                "verified": true,
                "email": "fslkhn93@gmail.com",
                "password": "$5a$18$XvGxf9JX76JvvIeqwd2CoOdxtCraX23nA5ToAYIhynLmNquDFdbOa",
                "mobileNumber": "91 876799554",
                "countryName": "India",
                "lastName": "Khan",
                "firstName": "Faisal",
                "userId": "kqdFThCqv"
            }
        }
    */
      
    // params: userId.
    app.get(`${baseUrl}/singleUser/:userId`, auth.isAuthorized, userController.getSingleUser);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/singleUser/:userId api for getting user details.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                "createdOn": "2018-09-12T13:42:58.000Z",
                "verified": true,
                "email": "fslkhn93@gmail.com",
                "mobileNumber": "91 876799554",
                "countryName": "India",
                "lastName": "Khan",
                "firstName": "Faisal",
                "userId": "kqdFThCqv"
            }
        }
    */

    app.post(`${baseUrl}/logout`, userController.logout)
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api to logout from application.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */



}