const {User, Post, Comment} = require('../../models/index');
const withAuth = require('../../utils/auth');

const router = require('express').Router()

router.get('/', (req, res) => {

// TODO: check if user is logged in

    res.render("home", {
        logged_in: req.session.logged_in,
    });

});

router.post('/posts', async (req, res) => {

   await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    });

    res.redirect('/dashboard');
})

router.get('/posts/new', (req, res) => {
    res.render('newpost', {
        logged_in: req.session.logged_in,
    });
})



router.get('/posts/:id', async (req, res) => {


    const post = await Post.findByPk(req.params.id, {
        include: [
            {
                model: User
            },
            {
                model: Comment,
                //comments load in chronoligical order
                order: [
                    Comment, 'createdAt', 'ASC'
                ],
                include: [
                    {
                        model: User
                    }
                ]
            }
        ]
    });


    res.render("post", {
        logged_in: req.session.logged_in,
        post: post.get({plain: true}),
    });
})



router.get('/dashboard', withAuth, async (req, res) => {

    const models = (await Post.findAll({
        include: [
            {
                model: User,
            }
        ]
    }))

    const posts = models.map((post) => post.get({plain: true}));



    res.render('dashboard', {
        logged_in: req.session.logged_in,
        posts,

    })

})

module.exports = router;
