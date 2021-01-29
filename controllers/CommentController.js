const Comment = require('../models/comment');
const Article = require('../models/article');

exports.commentArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    const comment = Comment(req.body);
    article.comments.unshift(comment);
    article = await article.save();
    res.status(200).json({ status: 200, message: 'success', data: article });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ status: err.status, message: err.message });
  }
};

exports.findComments = async (req, res) => {
  try {
    const comments = await Comment.findById(req.params.id);
    res.status(200).json({ status: 200, message: 'success', data: comments });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({ status: err.status, message: err.message });
  }
};
