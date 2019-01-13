const mongoose = require('mongoose');
const shortId = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const emailVerify = require('./../libs/emailVerificationLib')

const MeetModel = mongoose.model('Meet')
const UserModel = mongoose.model('User')


let getAllMeets = async (req, res)=> {
    let userDetails = await new Promise(async (resolve)=>{
        const result = await UserModel.findOne({'userId': req.params.userId}) .select(' -password -__v -_id').lean().exec() 
            
        try{
            if (check.isEmpty(result)) {
                logger.captureInfo('No User Found', 'Meet Controller: getAllMeet')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                resolve(result)
            }
        } catch(err) {
                logger.captureError(err.message, 'Meet Controller: getAllMeet', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
        }
        
    })

    let allMeets = await new Promise(async (resolve)=>{
        if(userDetails.isAdmin === true){
            let meetDetails = await MeetModel.find({creatorId: req.params.userId})
                try{
                    if (check.isEmpty(meetDetails)) {
                        logger.captureInfo('No Meeting Found', 'Meet Controller:findMeetings')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        resolve(meetDetails)
                    }
                } catch(err){
                    logger.captureError(err.message, 'Meet Controller: findMeetings', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                    res.send(apiResponse)
                }
        } else {
            let meetDetails = await MeetModel.find({participant:{$elemMatch:{userId: req.params.userId}}})
            try{
                if (check.isEmpty(meetDetails)) {
                    logger.captureInfo('No Meeting Found', 'Meet Controller:findMeetings')
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    res.send(apiResponse)
                } else {
                    resolve(meetDetails)
                }
            } catch(err){
                logger.captureError(err.message, 'Meet Controller: findMeetings', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                res.send(apiResponse)
            } 
        }
    })
let apiResponse = response.generate(false, 'All Meeting Details found', 200, allMeets)
await res.send(apiResponse)
}


let deleteMeetFnction = async (req, res)=>{
    let meetingDetails = await new Promise(async (resolve)=>{
        let meetDetails = await MeetModel.findOne({meetId: req.body.meetId})
                try{
                    if (check.isEmpty(meetDetails)) {
                        logger.captureInfo('No Meeting Found', 'Meet Controller:findMeetings')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        resolve(meetDetails)
                    }
                } catch(err){
                    logger.captureError(err.message, 'Meet Controller: findMeetings', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                    res.send(apiResponse)
                }
    })

    let deleteMeet = await new Promise(async (resolve)=>{
        let result = await MeetModel.deleteOne({meetId: req.body.meetId})
            try{
                if (check.isEmpty(result)) {
                    logger.captureInfo('No Meeting Found', 'Meet Controller: deleteMeeting')
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let newMeetingObj = meetingDetails
                    for(user of newMeetingObj.participant){
                        let userDetails = await new Promise(async (resolve)=>{
                            const result = await UserModel.findOne({'userId': user.userId}) .select(' -password -__v -_id').lean().exec() 
                                
                            try{
                                if (check.isEmpty(result)) {
                                    logger.captureInfo('No User Found', 'Meet Controller: getAllMeet')
                                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                                    res.send(apiResponse)
                                } else {
                                    resolve(result)
                                }
                            } catch(err) {
                                    logger.captureError(err.message, 'Meet Controller: getAllMeet', 10)
                                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                                    res.send(apiResponse)
                            }
                            
                        })
                    
                    let sendEmailOptions = {
                        email: userDetails.email,
                        name: userDetails.firstName+' '+userDetails.lastName,
                        subject: `Your Meeting Has Been Canceled: ${newMeetingObj.title}`,
                        html: `<h3> Meeting Canceled </h3>
                              <br> Hi , ${userDetails.firstName+' '+userDetails.lastName} .
                              <br> ${newMeetingObj.creatorName} canceled the meeting: ${newMeetingObj.title}.
                            `
                    }

                    setTimeout(() => {
                        emailVerify.sendEmail(sendEmailOptions);
                    }, 2000);
                }
                    resolve(result)
            }
        }catch(err){
            logger.captureError(err.message, 'Meet Controller: deleteMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete Meeting', 500, null)
            res.send(apiResponse)
        }
    })
    let apiResponse = response.generate(false, 'Deleted the Meeting successfully', 200, deleteMeet)
      await res.send(apiResponse)


}

let singleMeetDetails = async (req, res)=>{
          let meetDetails = await MeetModel.findOne({meetId: req.params.meetId})
                try{
                    if (check.isEmpty(meetDetails)) {
                        logger.captureInfo('No Meeting Found', 'Meet Controller:editMeeting')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Meetind Details', 200, meetDetails)
                        res.send(apiResponse)
                    }
                } catch(err){
                    logger.captureError(err.message, 'Meet Controller: editMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                    res.send(apiResponse)
                }
    
}

let editMeetFunction = async (req, res)=>{
    let meetingDetails = await new Promise(async (resolve)=>{
        let meetDetails = await MeetModel.findOne({meetId: req.body.meetId})
                try{
                    if (check.isEmpty(meetDetails)) {
                        logger.captureInfo('No Meeting Found', 'Meet Controller:editMeeting')
                        let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                        res.send(apiResponse)
                    } else {
                        resolve(meetDetails)
                    }
                } catch(err){
                    logger.captureError(err.message, 'Meet Controller: editMeeting', 10)
                    let apiResponse = response.generate(true, 'Failed To Find Meetings', 500, null)
                    res.send(apiResponse)
                }
    })

    let editMeet = await new Promise(async(resolve)=>{
        let options = req.body
        options.participant = JSON.parse(req.body.participant)
        let result = await MeetModel.update({meetId : req.body.meetId}, options)
            try{
                if (check.isEmpty(result)) {
                    logger.captureInfo('No Meeting Found', 'Meet Controller:editMeeting')
                    let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                    res.send(apiResponse)
                } else {

                    let newMeetingObj = meetingDetails
                    for(user of options.participant){
                        let userDetails = await new Promise(async (resolve)=>{
                            const result = await UserModel.findOne({'userId': user.userId}) .select(' -password -__v -_id').lean().exec() 
                                
                            try{
                                if (check.isEmpty(result)) {
                                    logger.captureInfo('No User Found', 'Meet Controller: getAllMeet')
                                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                                    res.send(apiResponse)
                                } else {
                                    resolve(result)
                                }
                            } catch(err) {
                                    logger.captureError(err.message, 'Meet Controller: getAllMeet', 10)
                                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                                    res.send(apiResponse)
                            }
                            
                        })    
                    let sendEmailOptions = {
                        email: userDetails.email,
                        name: userDetails.firstName+' '+userDetails.lastName,
                        subject: `Your Meeting Has Been Updated: ${options.title}`,
                        html: `<h3 style="color: #007bff"> Your meeting has been modified! </h3>
                              <br> Hi , ${userDetails.firstName+' '+userDetails.lastName} .
                              <br> ${newMeetingObj.creatorName} Updated the meeting: ${options.title}.
                              <hr>
                                      
                              <div class="card" style="width: 18rem;">
                                  <div class="card-body">
                                      <h5 style="color: #007bff">Purpose</h5>
                                      <p class="card-text">${options.description}</p>
                                  </div>
                              </div>
                                <hr>
                              <div class="card" style="width: 18rem;">
                                  <div class="card-body">
                                      <h5 style="color: #007bff">Meet Timing</h5>
                                      <p class="card-text">${options.startDate}</p>
                                  </div>
                              </div>
                              <hr>
                              <div class="card" style="width: 18rem;">
                                  <div class="card-body">
                                      <h5 style="color: #007bff">Location</h5>
                                      <p class="card-text">${options.venue}</p>
                                  </div>
                              </div>
        
                              `
                    }

                    setTimeout(() => {
                        emailVerify.sendEmail(sendEmailOptions);
                    }, 2000);
                } 
                    resolve(result)
                }
            } catch(err){
                logger.captureError(err.message, 'Meet Controller:editMeeting', 10)
                let apiResponse = response.generate(true, 'Failed To Update Meeting details', 500, null)
                res.send(apiResponse)
            }
    })

    let apiResponse  = response.generate(false, "Meeting Details Updated Sucessfully", 200, editMeet)
    await res.send(apiResponse)
}

let createMeetingFunction = async (req, res)=>{
    let participants = JSON.parse(req.body.participant)
    console.log(participants)
    let newMeeting = new MeetModel({
        meetId : shortId.generate(),
        title : req.body.title,
        creatorId : req.body.creatorId,
        creatorName : req.body.creatorName,
        participant : participants,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        description : req.body.description,
        venue : req.body.venue,
        createdOn : time.now()
    })

    let meetDetails = await newMeeting.save()
        try{
            let newMeetingObj = meetDetails.toObject();
                for(user of participants){
                    let userDetails = await new Promise(async (resolve)=>{
                        const result = await UserModel.findOne({'userId': user.userId}) .select(' -password -__v -_id').lean().exec() 
                            
                        try{
                            if (check.isEmpty(result)) {
                                logger.captureInfo('No User Found', 'Meet Controller: getAllMeet')
                                let apiResponse = response.generate(true, 'No User Found', 404, null)
                                res.send(apiResponse)
                            } else {
                                resolve(result)
                            }
                        } catch(err) {
                                logger.captureError(err.message, 'Meet Controller: getAllMeet', 10)
                                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                                res.send(apiResponse)
                        }
                        
                    })
                    let sendEmailOptions = {
                        email: userDetails.email,
                        name: user.firstname+' '+user.lastName,
                        subject: `Meeting Confirmed: ${newMeetingObj.title}`,
                        html: `<h3 style="color: #007bff"> Meeting Planned! </h3>
                              <br> Hi , ${newMeetingObj.creatorName} has scheduled a meeting via Meet Planner.
                              <hr>  

                            <div class="card" style="width: 18rem;">
                              <div class="card-body">
                                  <h5 style="color: #007bff">Purpose</h5>
                                  <p class="card-text">${newMeetingObj.description}</p>
                              </div>
                            </div>
                            <hr>  
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 style="color: #007bff">Meet Timing</h5>
                                    <p class="card-text">${newMeetingObj.startDate}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="card" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 style="color: #007bff">Location</h5>
                                    <p class="card-text">${newMeetingObj.venue}</p>
                                </div>
                            </div>

                            `
                    }

                    setTimeout(() => {
                        emailVerify.sendEmail(sendEmailOptions);
                    }, 2000);
                }
                    let apiResponse = response.generate(false, 'Meeting has been Added Sucesfully', 200, newMeetingObj)
                    res.send(apiResponse)
        } catch(err){
            logger.captureError(err.message, 'meetController: createMeet', 10)
            let apiResponse = response.generate(true, 'Failed to add new Meeting', 500, null)
            res.send(apiResponse)
        }
}

module.exports = {
    createMeetingFunction : createMeetingFunction,
    editMeetFunction : editMeetFunction,
    deleteMeetFnction : deleteMeetFnction,
    getAllMeets : getAllMeets,
    singleMeetDetails : singleMeetDetails
}