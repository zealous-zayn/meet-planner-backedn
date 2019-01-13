'use strict' 
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  countryName: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: 'false'
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  verified:{
    type:Boolean,
    default:'false'
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('User', userSchema);