const Article =require('../models/article');

exports.createArticle = async (req, res) => {
    
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
    });
      
    try{
        article = await article.save();
        res.status(200).json({ status:200,message: 'success'});
    } catch(err){
        console.log(err);
        res.status(err.status).json({status:err.status, message: err.message});
    }
};

exports.findAllArticles = async (req, res) => {
    
    try{
        let articles = await Article.find();
        res.status(200).json({ status:200, message: 'success',data: articles});
    } catch(err){
        console.log(err.message);
        res.status(err.status).json({status:err.status, message: err.message})
    }
};

exports.findOneArticle = async (req, res) => {

    try{
        let article = await Article.findById(req.params.id).lean().populate('comments');
        console.log('here');
        res.status(200).json({status:200, message: 'success', data: article});

    } catch(err) {
        console.log(err.message);
        res.status(err.status).json({status:err.status, message: err.message});
    }  
};


exports.updateArticle = async (req, res) => {

    try{
        let article = await Article.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({status: 200, message: 'Update Successful', data:article});
    } catch(err){
        console.log(err.message);
        res.status(err.status).json( {status: err.status, message: err.message});
    }
};

exports.deleteArticle = async(req, res) => {

    try{
        let article = await Article.findByIdAndDelete(req.params.id);
        if(!article){
            res.status(500).json({status:500, message: 'post not found'});
        } else {
            res.status(200).json({status:200, message:'deleted successfully'});
        }
    } catch(err) {
        console.log(err.message);
        res.status(err.status).json({status:err.status, message: 'error occurred'});   
    }  
};

exports.deleteAllArticles = async (req, res) => {

    try{
        let article = await Article.deleteMany({});
        if(!article) {
            res.status(500).json({status:500, message: 'cannot delete all'});
        } else {
            res.status(200).json({status:200, message: `${article.deletedCount} posts deleted`});
        }
    } catch(err) {
        console.log(err.message);
        res.status(err.status).json({status:err.status, message:'error occured'});
    }
};
