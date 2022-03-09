const exp = require("express");
const app = exp();


app.get("/books", allBooks, (req, res) => {
    return res.send("All books");
});

function allBooks(req, res, next){
    console.log("Fetching all books");
    next();
};

app.get("/books/:name", singleBook, (req, res) => {
    return res.json({bookName: req.name});
});

function singleBook(req, res, next){
    console.log(req.params.name);
    req.name = req.params.name;
    next();
}

app.listen(5000, () => {
    console.log("listening on port 5000");
});

