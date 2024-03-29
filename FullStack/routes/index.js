var express = require('express');
var router = express.Router();

/* GET home page. */
/* //We are not includding this, because it already is included with the jade functions
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    console.log(comments);
    res.json(comments);
  });
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    console.log(comment);
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

router.get('/comments/:comment', function(req, res) {
  console.log(req.comment);
  res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    console.log(comment);
    res.json(comment);
  });
});

module.exports = router; //Once we have added everything to router, we export it?
