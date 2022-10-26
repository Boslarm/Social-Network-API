const { Thought, User } = require("../models");


module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created thought.')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.id },
                  { $pull: { thoughts: req.params.id } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Could not find user with this id!' })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

}