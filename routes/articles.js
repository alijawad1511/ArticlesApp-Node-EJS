const express = require('express');
const router = express.Router();
const Article = require('../models/article');



// Get Single Article
router.get('/:id',(req,res) => {         // :id = This is a placeholder. It will be replaced with whatever will be passed in url
    Article.findById(req.params.id,(err,article) => {
        if (err) {
            console.log(err);
        } else {
            res.render('article',{
                article
            });
        }
    });
});


// Add Article Route
router.get('/add',(req,res) => {
    res.render('add_article');
});


// Add Article Submit POST Route
router.post('/add',(req,res) => {

    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
        } else {
            req.flash('success','Article added successfully');
            res.redirect('/');
        }
    });  // save end

}); // post end


// Load Edit Article Form
router.get('/edit/:id',(req,res) => {         // :id = This is a placeholder. It will be replaced with whatever will be passed in url
    Article.findById(req.params.id,(err,article) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit_article',{ article });
        }
    });
});


// Edit Submit POST Route
router.post('/edit/:id',(req,res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = { _id: req.params.id };

    Article.updateOne(query,article,(err) => {
        if (err) {
            console.log(err);
        } else {
            req.flash('success','Article updated');
            res.redirect('/');
        }
    });
});


router.delete('/:id',(req,res) => {
    let query = { _id: req.params.id };

    Article.deleteOne(query,(err) => {
        if (err) {
            console.log(err);
        }

        res.send('Success');
    })
})



module.exports = router;