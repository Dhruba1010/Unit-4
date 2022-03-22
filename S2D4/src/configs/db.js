const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://Dhruba:KINGi$back096P@cluster0.oyzil.mongodb.net/Unit-4?retryWrites=true&w=majority");
};

module.exports = connect;