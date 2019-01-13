define({ "api": [
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/meetings/view/users/get-all-meet/:userId",
    "title": "api for Getting all Meetings of User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meetings Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5b9a2581d1508e15f402fb36\",\n            \"createdOn\": \"2018-09-13T08:53:21.000Z\",\n            \"venue\": \"Golden Palace\",\n            \"description\": \"Test Meeting for Updating\",\n            \"endDate\": \"2018-09-12T17:57:50.382Z\",\n            \"startDate\": \"2018-09-11T20:30:00.000Z\",\n            \"participant\" : [\n            {\n                \"userId\": \"ahKl_mRT\",\n                \"firstName\":\"zayn\"\n            }\n            ]\n            \"creatorName\": \"Faisal Khan\",\n            \"creatorId\": \"B1cyuc8OX\",\n            \"title\": \"Test Meeting\",\n            \"meetingId\": \"rJttBsw_m\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meet.js",
    "groupTitle": "Meetings",
    "name": "GetApiV1MeetingsViewUsersGetAllMeetUserid"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/get-single-meet/:meetId",
    "title": "api for getting meeting details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetId",
            "description": "<p>meeting Id of the Meeting. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"error\": false,\n    \"message\": \"Meeting Found\",\n    \"status\": 200,\n    \"data\": {\n            \"_id\": \"5b9a2581d1508e15f402fb36\",\n            \"createdOn\": \"2018-09-13T08:53:21.000Z\",\n            \"venue\": \"Golden Palace\",\n            \"description\": \"Test Meeting for Updating\",\n            \"endDate\": \"2018-09-12T17:57:50.382Z\",\n            \"startDate\": \"2018-09-11T20:30:00.000Z\",\n            \"participant\" : [\n            {\n                \"userId\": \"ahKl_mRT\",\n                \"firstName\":\"zayn\"\n            }\n            ]\n            \"creatorName\": \"Faisal Khan\",\n            \"creatorId\": \"B1cyuc8OX\",\n            \"title\": \"Test Meeting\",\n            \"meetingId\": \"rJttBsw_m\",\n            \"__v\": 0\n        }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meet.js",
    "groupTitle": "Meetings",
    "name": "GetApiV1UsersGetSingleMeetMeetid"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create-meet",
    "title": "api to Add Meeting.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Topic of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>User Id of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorName",
            "description": "<p>User Name of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "participant",
            "description": "<p>array in json format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "endDate",
            "description": "<p>end date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "venue",
            "description": "<p>Place of Meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting has been Added Sucesfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5b9a2581d1508e15f402fb36\",\n        \"createdOn\": \"2018-09-13T08:53:21.000Z\",\n        \"venue\": \"Leela Palace\",\n        \"description\": \"Test Meeting for Checking\",\n        \"endDate\": \"2018-09-12T17:57:50.382Z\",\n        \"startDate\": \"2018-09-11T20:30:00.000Z\",\n        \"participant\" : [\n            {\n                \"userId\": \"ahKl_mRT\",\n                \"firstName\":\"zayn\"\n            }\n        ]\n        \"creatorName\": \"Faisal Khan\",\n        \"creatorId\": \"B1cyuc8OX\",\n        \"title\": \"Test Meeting\",\n        \"meetId\": \"rJttBsw_m\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meet.js",
    "groupTitle": "Meetings",
    "name": "PostApiV1UsersCreateMeet"
  },
  {
    "group": "Meetings",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/user/edit-meet",
    "title": "api to Update Meeting Details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authentication Token. (body/header/query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "meetId",
            "description": "<p>Id of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Topic of the Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>User Id of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorName",
            "description": "<p>User Name of the user hosting Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "participant",
            "description": "<p>array in json format. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "startDate",
            "description": "<p>Start date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "endDate",
            "description": "<p>end date/time of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of Meeting. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "venue",
            "description": "<p>Place of Meeting. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Meeting Details Updated Sucessfully\",\n    \"status\": 200,\n    \"data\": {\n        \"error\": false,\n        \"message\": \"Meeting details Updated\",\n        \"status\": 200,\n        \"data\": \"None\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/meet.js",
    "groupTitle": "Meetings",
    "name": "PutApiV1UserEditMeet"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/getAllUsers",
    "title": "api for Getting all users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n            \"verified\": true,\n            \"email\": \"fslkhn93@gmail.com\",\n            \"mobileNumber\": \"91 876799554\",\n            \"countryName\": \"India\",\n            \"lastName\": \"Khan\",\n            \"firstName\": \"Faisal\",\n            \"userId\": \"kqdFThCqv\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersGetallusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/singleUser/:userId",
    "title": "api for getting user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": {\n        \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n        \"verified\": true,\n        \"email\": \"fslkhn93@gmail.com\",\n        \"mobileNumber\": \"91 876799554\",\n        \"countryName\": \"India\",\n        \"lastName\": \"Khan\",\n        \"firstName\": \"Faisal\",\n        \"userId\": \"kqdFThCqv\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersSingleuserUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/deleteUser",
    "title": "api to Delete User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Deleted the user successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n        \"verified\": true,\n        \"email\": \"fslkhn93@gmail.com\",\n        \"password\": \"$5a$18$XvGxf9JX76JvvIeqwd2CoOdxtCraX23nA5ToAYIhynLmNquDFdbOa\",\n        \"mobileNumber\": \"91 876799554\",\n        \"countryName\": \"India\",\n        \"lastName\": \"Khan\",\n        \"firstName\": \"Faisal\",\n        \"userId\": \"kqdFThCqv\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersDeleteuser"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgetPassword",
    "title": "api for Updating Password after Reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user",
            "description": "<p>email address. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "verified",
            "description": "<p>as true . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password reset link sent successfully\",\n    \"status\": 200,\n    \"data\": \"None\"\n    \n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for Login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJKc0NubExxWCIsImlhdCI6MTUzODgxNzIzNDUzNCwiZXhwIjoxNTM4OTAzNjM0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJsZXRzTWVldEFwcCIsImRhdGEiOnsiZnJpZW5kUmVxdWVzdFNlbnQiOltdLCJmcmllbmRSZXF1ZXN0UmVjaWV2ZWQiOltdLCJmcmllbmRzIjpbXSwiZW1haWxWZXJpZmllZCI6IlllcyIsInZhbGlkYXRpb25Ub2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpxZDNScFpDSTZJa0o1ZFdaTFRWTTFOeUlzSW1saGRDSTZNVFV6T0RjMU9Ea3lOemszTWl3aVpYaHdJam94TlRNNE9EUTFNekkzTENKemRXSWlPaUpoZFhSb1ZHOXJaVzRpTENKcGMzTWlPaUpzWlhSelRXVmxkRUZ3Y0NJc0ltUmhkR0VpT25zaVgybGtJam9pTldKaU56azFNbVJtWWpVNFpXRXhNVGM0TWpBMU9UQTBJaXdpWDE5Mklqb3dMQ0pqY21WaGRHVmtUMjRpT2lJeU1ERTRMVEV3TFRBMVZERTJPalExT2pNekxqQXdNRm9pTENKbGJXRnBiRlpsY21sbWFXVmtJam9pV1dWeklpd2lkbUZzYVdSaGRHbHZibFJ2YTJWdUlqb2lJaXdpWlcxaGFXd2lPaUp6YUdGb2NuVnJhSE5oZVhsbFpDNTBaV05vUUdkdFlXbHNMbU52YlNJc0luQmhjM04zYjNKa0lqb2lKREpoSkRFd0pGWXpZbXRLVjBKbFZHOXphelYwTlM0d2VreEVaQzVJZUhoaVMzY3djSGxTUTBkNE5rVTFjMlJpTDBZNWVXdEZMekJGVmtwbElpd2ljM1JoZEhWeklqb2liMlptYkdsdVpTSXNJbWx6UVdSdGFXNGlPaUoxYm1SbFptbHVaV1FpTENKdGIySnBiR1ZPZFcxaVpYSWlPaUk1TVNBM09EUXdPVFl5T0RnM0lpd2lZMjkxYm5SeWVVNWhiV1VpT2lKSlRpSXNJblZ6WlhKT1lXMWxJam9pZFc1a1pXWnBibVZrSWl3aWJHRnpkRTVoYldVaU9pSlRZWGw1WldRaUxDSm1hWEp6ZEU1aGJXVWlPaUpUYUdGb2NuVnJhQ0lzSW5WelpYSkpaQ0k2SWxOclFrVklabE01TnlKOWZRLm1ocWs0Y2JzX1gyX2dieWtvUExydlJTU2drOHF4elRLLVBtU2V4ZGZ4V3ciLCJlbWFpbCI6InNoYWhydWtoc2F5eWVkLnRlY2hAZ21haWwuY29tIiwic3RhdHVzIjoib2ZmbGluZSIsImlzQWRtaW4iOiJ1bmRlZmluZWQiLCJtb2JpbGVOdW1iZXIiOiI5MSA3ODQwOTYyODg3IiwiY291bnRyeU5hbWUiOiJJTiIsInVzZXJOYW1lIjoidW5kZWZpbmVkIiwibGFzdE5hbWUiOiJTYXl5ZWQiLCJmaXJzdE5hbWUiOiJTaGFocnVraCIsInVzZXJJZCI6IlNrQkVIZlM5NyJ9fQ.-du1nE9FDeCDVf7fA7JjGVIPcYY7hb9TxvGLH6fYxd0\",\n        \"userDetails\": {\n            \"verified\": true,\n            \"email\": \"fslkhn93@gmail.com\",\n            \"mobileNumber\": \"91 7840962887\",\n            \"countryName\": \"IN\",\n            \"lastName\": \"Faisal\",\n            \"firstName\": \"Khan\",\n            \"userId\": \"kqdFThCqv\",\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api to logout from application.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "api for Updating Password after Reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user",
            "description": "<p>Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "New",
            "description": "<p>Password . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Password has been changed successfully!!\",\n    \"status\": 200,\n    \"data\": \"None\"\n    \n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for Registering User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>country Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created\",\n\"status\": 200,\n\"data\": [\n    {\n        \"createdOn\": \"2018-09-12T13:42:58.000Z\",\n        \"emailVerified\": \"Yes\",\n        \"validationToken\": \"Null\",\n        \"email\": \"sayyedsofttech313@gmail.com\",\n        \"password\": \"$2a$10$XvHxf9JX76JvvIeqwd2CoOdxtCraX23nR2ToAYIhynLmNquDFdbOa\",\n        \"mobileNumber\": \"91 7840962887\",\n        \"countryName\": \"India\",\n        \"lastName\": \"Sayyed\",\n        \"firstName\": \"Shahrukh\",\n        \"userId\": \"kqdFThCqv\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/verifyEmail",
    "title": "api for Verifying User Email Id.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User email verified\",\n    \"status\": 200,\n    \"data\": \"None\"\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersVerifyemail"
  }
] });
