console.log('buckets controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?
// Build out the methods in the friendsControllers below
var mongoose = require('mongoose');
var querystring = require('querystring');
var Bucket = mongoose.model('Bucket');
var User = mongoose.model('User');

function BucketsController(){
  this.index = function(req,res){
    Bucket.find({}, false, true).populate('answers').exec(function(err, buckets){
      console.log(buckets);
      res.json(buckets);
    })
  }

  this.create = function(req, res){
    var name = req.body.name;
    var bucket = req.body.bucket;

    console.log('create a bucket', bucket);

    Bucket.create(bucket, function(err, result){
      if(err){
        console.log(err);
      } else {
        var bucket = new Bucket(bucket);
        bucket.save(function(err, result){
          if(err){
            console.log('err', err);
          }else{
            console.log("success, result:", result);
          }
          res.json(result);
        })

      }
    })

  };

  this.toggle = function(req, res) {
    console.log('toggle bucket', req.body, req.query, req.params);
    var id = req.params.id;
    console.log('id', id);
    Bucket.findById(id, function(err, existBucket) {
      console.log('existBucket', existBucket);
      if (err) {
          console.log(err);
      }
      existBucket.state = !existBucket.state;
      existBucket.save(function(saveErr, result) {
        if (saveErr) {
          console.log(saveErr);
        }
        res.json(result);
      })
    });
  }

  this.get = function(req, res) {
    console.log('tagger:', req.query.tagger);
    console.log('taggee:', req.query.taggee);

    var config = {};
    var tagger = req.query.tagger;
    var taggee = req.query.taggee;

    if (tagger) {
      config.tagger = { name: tagger };

    } else if (taggee) {
      config.taggee = { taggee: taggee };
    }

// Bucket.find({})
// .populate({
//   path: 'tagger',
//   match: { name: tagger}
// })
// .exec(function(err, result) {
//       if (err) {
//         console.log('Error', err);
//       }
//       if (result) {
//         console.log('result', result);
//         res.json(result);
//       } else {
//         console.log('no result', result);
//       }
//     });


    Bucket.find(config, function(err, result) {
      if (err) {
        console.log('Error', err);
      }
      if (result) {
        console.log('result', result);
        res.json(result);
      } else {
        console.log('no result', result);
      }
    })
  }

}

module.exports = new BucketsController();
