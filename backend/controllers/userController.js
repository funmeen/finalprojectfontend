const { UserModel, PostModel } = require('../models/user-register');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// GET all user
const getUsers = async (req, res) => {
    const users = await UserModel.find({}).sort({createdAt: -1})
    res.status(200).json(users)
};

// GET a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// POST a single user
const createUser = async (req, res) => {
    const {username, fullname, email, password, role} = req.body
    // add doc to db
    try{
        const user = UserModel.create({username, fullname, email, password, role})
        res.status(200).json(user)
    }catch (error){
        res.status(400).json({
            error: error.message
        });
        return;
    }
};


// DELETE a single user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// UPDATE a single user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await UserModel.findByIdAndUpdate(
            id,
            { username, password, role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

//user sign in
const userSignIn = async (req, res) => {
    try {
      console.log('Starting userSignIn function');
      const { username, password } = req.body;
      console.log('Received request with username:', username);
  
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate a token for the signed-in user
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');  // Replace 'your-secret-key' with a secret key for signing the token
  
      // Attach signed-in user information and token to the response
      res.status(200).json({
        message: 'Sign-in successful',
        signedInUser: { username: user.username, email: user.email, _id: user._id },
        token,
      });
    } catch (error) {
      console.error('Error during sign-in:', error);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
  };
  

// Fetch the signed-in user information
const getSignedInUser = async (req, res) => {
    try {
        // Assuming you've attached the signed-in user information to the request object during sign-in
        const signedInUser = req.user;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(signedInUser.userId)) {
            console.log('Invalid user ID');
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch the signed-in user from the database using the attached user ID
        const user = await User.findById(signedInUser.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

//POST a single post
const createPost = async (req, res) => {
    const { header, content, author } = req.body;

    try {
        const post = await PostModel.create({ header, content, author });
        res.status(200).json(post)
    }catch (error){
        res.status(400).json({
            error: error.message
        });
        return;
    }
};


// GET a single post
const getPost = async (req, res) => {
    const { postId } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// GET all posts
const getAllPost = async (req, res) => {
    const posts = await PostModel.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
};


module.exports = {
    getUsers, 
    getUser,
    createUser,
    deleteUser,
    updateUser,
    userSignIn,
    getSignedInUser,
    createPost,
    getPost,
    getAllPost
}