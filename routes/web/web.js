const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

const router = require('express').Router()

router.get('/', (req, res) => {

// TODO: check if user is logged in

    res.render("home", {
        logged_in: true,
    });

});


router.get('/dashboard', withAuth, async (req, res) => {

    const posts = (await Post.findAll()).map((post) => post.get({plain: true}));



    res.render('dashboard', {
        logged_in: req.session.logged_in,
        posts,

    })

})

module.exports = router;
