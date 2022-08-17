const Author = require("../models/author.model")
module.exports = {
    createAuthor: (req, res) => {
        Author.create(req.body)
    .then((newAuthor) => res.json(newAuthor))
    .catch((err) =>console.log(err));
    },
    getAllAuthors: (req, res) => {
        Author.find({}).then(author=>{
            console.log(author);
            res.json(author);
        })
        .catch(err =>{
            console.log(err)
            res.json(err)
        })
    },
    getOneAuthor: (req, res) => {
        Author.findOne({_id: req.params.id})
        .then((oneAuthor)=> res.json(oneAuthor))
        .catch((err) => console.log(err));
    },
    updateAuthor: (req, res) => {
        Author.findByIdAndUpdate({_id: req.params.id}, req.body,{
            new: true,
            runValidators: true})
            .then((updatedAuthor) => res.json(updatedAuthor))
            .catch((err) => console.log(err));
    },
    deleteAuthor: (req, res) => {
        Author.deleteOne({_id: req.params.id})
        .then((deletedId) => res.json(deletedId))
        .catch((err)=> console.log(err));
    }
};
