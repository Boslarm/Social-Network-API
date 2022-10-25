const { Schema, model, Types } = require("mongoose");
const Reactions = require('./Reaction');
const dateFormat = require("../utils/dateFormat");


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal), //I think this will work, got "get:" off mongoose documentation
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;