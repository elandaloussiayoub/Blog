const mongoose = require('mongoose');

const {Schema} = mongoose;
var ObjectId = require('mongodb').ObjectID;

//Article : id auto generated by mongoDB
const articleSchema  = new Schema({
  userId: { 
    type: ObjectId, 
    required: true 
  },
  title : { 
    type: String, 
    required: true 
  }, 
  body  : { 
    type: String, 
    required: true 
  },
  date  : { 
    type: Date, 
    default: Date.now 
  },
  tags  : { 
    type: [String], 
    default: [] 
  }
});
const Article = mongoose.model('Article', articleSchema);


module.exports = Article;