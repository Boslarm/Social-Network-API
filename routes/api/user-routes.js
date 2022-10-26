const router = require("express").Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    // deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// all get & post routes
router
    .route("/")
    .get(getUsers)
    .post(createUser);

// get, put, & delete routes w/:id
router
    .route("/:id")
    .get(getOneUser)
    .put(updateUser)
    // .delete(deleteUser);

// add and delete friend route
router
    .route("/:id/friends/:friendsId")
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;