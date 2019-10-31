const express = require('express');
const validateUserId = require('../middleware/validateUserId');
const validateUser = require('../middleware/validateUser');
const validatePost = require('../middleware/validatePost');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();


router.post('/', validateUser, (req, res) => {
    const user = req.body;
    userDB.insert(user).then(user =>{
        res.status(201).json(user);
    }).catch(error =>{
        res.status(500).json({error: 'An error occurred while attempting to add user to the database.'});
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
    let post = {
        text: req.body.text,
        user_id: req.params.id
    }

    postDB.insert(post).then(result =>{
        res.status(201).json(result);
    }).catch(error =>{
        res.status(500).json({error: "An error occurred while attempting to add post to the database."});
    });
});

router.get('/', (req, res) => {

    userDB.get().then(users =>{
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({error: 'Something went wrong fetching users.'});
    });

});

router.get('/:id', validateUserId, (req, res) => {
    userDB.getById(req.params.id).then(user =>{
        res.status(200).json(user);

    }).catch(error =>{
        res.status(500).json({error: 'An error occurred while fetching user from the database.'});
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDB.getUserPosts(req.params.id).then(posts =>{
        res.status(200).json(posts);
    }).catch(error =>{
        res.status(500).json({error: "An unexpected error occurred while fetching the user posts."});
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    userDB.remove(req.params.id).then(result =>{
        res.status(200).json({message: "Success"});
    }).catch(error =>{
        res.status(500).json({error: "There was a problem deleting user from the database"});
    });
});

router.put('/:id', validateUserId, (req, res) => {
    const updatedUser = req.body;

    userDB.update(req.params.id, updatedUser).then(result =>{
        res.status(200).json(result > 0);
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while trying to update the user."});
    });
});

module.exports = router;