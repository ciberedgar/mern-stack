const { Router } = require('express');
const router = Router();
const { getUsers, createUser, deleteUser, updateUser } = require('../controllers/users.controller');
router.route('/')
    .get(getUsers)
    .post(createUser)
router.route('/:id')
    .delete(deleteUser)
    .put(updateUser)
module.exports = router;
