const Comment = require('../models/comment');
const Article = require('../models/article');

exports.commentArticle= async (req, res) => {
    
  let comment = new Comment(req.body);
  comment
    .save()
    .then(comment => {
      return Article.findById(req.params.id);
    })
    .then(article => {
     article.comments.unshift(comment);
     res.status(200).json({status:200, message: 'success', data: article});
     return article.save();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({status: 500, message: err.message});
    });
};

