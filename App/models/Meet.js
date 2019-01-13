'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
let meetSchema = new Schema({
  meetId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  title : {
    type: String,
    default: ''
  },

  creatorId: {
    type: String,
    default: ''
  },
  creatorName: {
    type: String,
    default: ''
  },
  
  participant: [],

  startDate: {
    type: Date,
    default: ''
  },
  endDate: {
    type: Date,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  venue: {
    type: String,
    default: ''
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('Meet', meetSchema);