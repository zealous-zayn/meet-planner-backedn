const express = require('express');
const router = express.Router();
const meetController = require("./../controllers/meetControllers");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

let baseUrl = `${appConfig.apiVersion}/users`;

module.exports.setRouter = (app) => {
    app.post(`${baseUrl}/create-meet`, auth.isAuthorized, meetController.createMeetingFunction);
    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/create-meet api to Add Meeting.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} title Topic of the Meeting. (body params) (required)
     * @apiParam {string} creatorId User Id of the user hosting Meeting. (body params) (required)
     * @apiParam {string} creatorName User Name of the user hosting Meeting. (body params) (required)
     * @apiParam {string} participant array in json format. (body params) (required)
     * @apiParam {string} startDate Start date/time of Meeting. (body params) (required)
     * @apiParam {string} endDate end date/time of Meeting. (body params) (required)
     * @apiParam {string} description Description of Meeting. (body params) (required)
     * @apiParam {string} venue Place of Meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting has been Added Sucesfully",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5b9a2581d1508e15f402fb36",
                "createdOn": "2018-09-13T08:53:21.000Z",
                "venue": "Leela Palace",
                "description": "Test Meeting for Checking",
                "endDate": "2018-09-12T17:57:50.382Z",
                "startDate": "2018-09-11T20:30:00.000Z",
                "participant" : [
                    {
                        "userId": "ahKl_mRT",
                        "firstName":"zayn"
                    }
                ]
                "creatorName": "Faisal Khan",
                "creatorId": "B1cyuc8OX",
                "title": "Test Meeting",
                "meetId": "rJttBsw_m"
            }
        }
    */


    app.post(`${baseUrl}/edit-meet`, auth.isAuthorized, meetController.editMeetFunction);
    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {put} /api/v1/user/edit-meet api to Update Meeting Details.
     *
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiParam {string} meetId Id of the Meeting. (body params) (required)
     * @apiParam {string} title Topic of the Meeting. (body params) (required)
     * @apiParam {string} creatorId User Id of the user hosting Meeting. (body params) (required)
     * @apiParam {string} creatorName User Name of the user hosting Meeting. (body params) (required)
     * @apiParam {string} participant array in json format. (body params) (required)
     * @apiParam {string} startDate Start date/time of Meeting. (body params) (required)
     * @apiParam {string} endDate end date/time of Meeting. (body params) (required)
     * @apiParam {string} description Description of Meeting. (body params) (required)
     * @apiParam {string} venue Place of Meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting Details Updated Sucessfully",
            "status": 200,
            "data": {
                "error": false,
                "message": "Meeting details Updated",
                "status": 200,
                "data": "None"
            }
        }
    */


    app.post(`${baseUrl}/delete-meet`, auth.isAuthorized, meetController.deleteMeetFnction);

    app.get(`${baseUrl}/get-all-meet/:userId`, auth.isAuthorized, meetController.getAllMeets)
    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meetings/view/users/get-all-meet/:userId api for Getting all Meetings of User.
     *
     * @apiParam {string} userId userId of the user. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meetings Found",
            "status": 200,
            "data": [
                {
                    "_id": "5b9a2581d1508e15f402fb36",
                    "createdOn": "2018-09-13T08:53:21.000Z",
                    "venue": "Golden Palace",
                    "description": "Test Meeting for Updating",
                    "endDate": "2018-09-12T17:57:50.382Z",
                    "startDate": "2018-09-11T20:30:00.000Z",
                    "participant" : [
                    {
                        "userId": "ahKl_mRT",
                        "firstName":"zayn"
                    }
                    ]
                    "creatorName": "Faisal Khan",
                    "creatorId": "B1cyuc8OX",
                    "title": "Test Meeting",
                    "meetingId": "rJttBsw_m",
                    "__v": 0
                }
            ]
        }
    */


    app.get(`${baseUrl}/get-single-meet/:meetId`, auth.isAuthorized, meetController.singleMeetDetails)
    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/get-single-meet/:meetId api for getting meeting details.
     *
     * @apiParam {string} meetId meeting Id of the Meeting. (query params) (required)
     * @apiParam {string} authToken Authentication Token. (body/header/query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        { 
            "error": false,
            "message": "Meeting Found",
            "status": 200,
            "data": {
                    "_id": "5b9a2581d1508e15f402fb36",
                    "createdOn": "2018-09-13T08:53:21.000Z",
                    "venue": "Golden Palace",
                    "description": "Test Meeting for Updating",
                    "endDate": "2018-09-12T17:57:50.382Z",
                    "startDate": "2018-09-11T20:30:00.000Z",
                    "participant" : [
                    {
                        "userId": "ahKl_mRT",
                        "firstName":"zayn"
                    }
                    ]
                    "creatorName": "Faisal Khan",
                    "creatorId": "B1cyuc8OX",
                    "title": "Test Meeting",
                    "meetingId": "rJttBsw_m",
                    "__v": 0
                }

        }
    */

}