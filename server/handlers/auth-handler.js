const User = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) { 
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    let user = new User({
        name,
        email,
        password
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email , isAdmin: user.isAdmin }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
    registerUser,
    loginUser
};