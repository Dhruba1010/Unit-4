const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = ()=> {
    return mongoose.connect("mongodb+srv://Dhruba:KINGi$back096P@cluster0.oyzil.mongodb.net/Unit-4?retryWrites=true&w=majority")
}


//creating section schema
const sectionSchema = new mongoose.Schema ({
    sectionName: {type:String, required:true},
},
{
    versionKey: false,
    timestamps: true
});

const Section = mongoose.model("section", sectionSchema);


//creating book schema
const bookSchema = new mongoose.Schema ({
    title: {type: String, required:true},
    body: {type:String, required:true},
    sectionId: {type:mongoose.Schema.Types.ObjectId, ref: "section",required: true}
},
{
    versionKey: false,
    timestamps: true
});

const Book = mongoose.model("book", bookSchema);


//creating author schema
const authorSchema = new mongoose.Schema ({
    first_name: {type: String, required:true},
    last_name: {type: String, required: true}
},
{
    versionKey: false,
    timestamps: true
});

const Author = mongoose.model("author", authorSchema);


// book_author Schema
const bookAuthorSchema = new mongoose.Schema ({
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'book', required:true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true},
},
{
    versionKey: false,
    timestamps: true
});

const BookAuthor = mongoose.model('bookAuthor', bookAuthorSchema);



// CRUD operations
// author CRUD
app.get ("/authors", async (req, res) => {
    try {
        const authors = await Author.find().lean().exec();
        return res.status(200).send(authors);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("/authors", async (req, res) => {
    try {
        const author = await Author.create(req.body);
        return res.status(201).send(author);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});


//book CRUD
app.get ("/books", async (req, res) => {
    try {
        const books = await Book.find().populate('sectionName').lean().exec();
        return res.status(200).send(books);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).send(book);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean().exec();
        return res.status(200).send(book);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

//section CRUD
app.get ("/sections", async (req, res) => {
    try {
        const sections = await Section.find().lean().exec();
        return res.status(200).send(sections);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post("/sections", async (req, res) => {
    try {
        const section = await Section.create(req.body);
        return res.status(201).send(section);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});


// bookAuthor CRUD
app.get ("/book_author", async (req, res) => {
    try {
        const bookByAuthor = await BookAuthor.find().populate('authorId').lean().exec();
        return res.status(200).send(bookByAuthor);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

app.post ("/book_author", async (req, res) => {
    try {
        const bookByAuthor = await BookAuthor.create(req.body);
        return res.status(201).send(bookByAuthor);
    }
     catch(err){
        return res.status(500).send({message: err.message});
    }
});

//all books written by an author
app.get('/booksByAuthor/:id', async (req, res) => {
    try {
        const allBooks = await BookAuthor.find().populate('authorId').populate('bookId').lean().exec();
        res.status(200).send(allBooks);
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
})


app.listen(5000, async () => {
    try {
        await connect();
    } catch(err){
        console.log(err);
    }
    console.log("listening to port 5000");
});