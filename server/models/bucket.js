var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },

  description: {
    type:String,
    required: true
  },

  state: {
    type: Boolean,
    default: false
  },

  tagger: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },

  taggee: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
    timestamps: true
});

mongoose.model('Bucket', BucketSchema);
