const passport = require('passport');
const path = require('path');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/auth/facebook');
    }


    router.get('/secret',  isLoggedIn, (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'secret.html'));
    });

    router.get('/auth/facebook', passport.authenticate('facebook',{ 
        scope: ['user_friends', 'manage_pages'] 
    }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook',{ 
        failureRedirect:'/error'
    }),(req,res)=>{
        res.redirect('/secret');
    });

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'views','/index.html'));
    });

    router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect("/")
    });

    return router;
};