const User = require('../../models/User');

const router = require('express').Router();


router.get('/login', (req, res) => {

    return res.render('login');
})


router.post('/login', async (req, res) => {

    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
          res
            .render('login', {
                error: "Invalid email or password"
            })
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .redirect('login')
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).render('login', {error: err});
      }
});

module.exports = router;