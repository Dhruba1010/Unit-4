let express = require("express");

let app = express();

app.get("/root", function (req, res) {

    res.send("hello");
});

app.get("/books", function(req, res) {

    res.json({
        book_1: "Harry Potter and the Goblet of Fire",
        book_2: "Harry Potter and the Order of the Pheonix",
        book_3: "Harry Potter and the Half-Blood Prince",
        book_4: "Harry Potter and the Deathly Hallows"
    });
});

app.listen(5000, () => {
    console.log("listen on port 5000");
});