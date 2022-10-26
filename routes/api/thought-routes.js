const router = require("express").Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
//     createReaction,
//     deleteReaction,
} = require('../../controllers/thought-controller');

// // all get & post routes
router
    .route("/")
    .get(getThoughts)
    .post(createThought);

// // get, put, & delete routes w/:id
router
    .route("/:id")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// router
//     .route("/:thoughtId/reactions")
//     .post(createReaction)
//     .delete(deleteReaction);

module.exports = router;