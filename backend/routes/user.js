const express = require ('express');
const { createUser, getUsers, getUser, deleteUser, 
        updateUser, userSignIn, getSignedInUser,
        createPost, getPost, getAllPost } = require('../controllers/userController');
const { verifyToken } = require('../middleware/middleware');
const router = express.Router()

//GET all users
router.get('/', getUsers)

//GET a single user
router.get('/:id', getUser)

//POST a new user
router.post('/', createUser)

//DELETE a single user
router.delete('/:id', deleteUser)

//UPDATE a single user
router.patch('/:id', updateUser)

//user sign in
router.post('/signIn', userSignIn)

// Fetch the signed-in user information
router.get('/signInUser', verifyToken, getSignedInUser);

//GET all posts
router.get('/post', getAllPost)

//GET a single post
router.get('/post/:postId', getPost)

//POST a new post
router.post('/post', createPost)

module.exports = router