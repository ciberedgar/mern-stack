const usersCtrl = {};
const User = require('../models/User');
usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}
usersCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({ username });
    console.log(newUser);
    await newUser.save();
    res.json({ message: 'User created' });
}
usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User Deleted' })
}
usersCtrl.updateUser = async (req, res) => {
    const { username } = req.body;
    await User.findOneAndUpdate(req.params.id, {
        username
    });
    res.json({ message: 'User Updated' })
}

module.exports = usersCtrl;
