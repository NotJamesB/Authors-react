const mongoose = require('mongoose');

const AuthorSchema = {
    name: {
        type: String, required: [true, "name is required"],
        minLength: [3, "Please provide a name with more than 3 characters"]
    },
};
module.exports = mongoose.model("Author", AuthorSchema);