require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in the environment!");
    process.exit(0);
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: (n) => /^\d{2,3}-\d+$/m.test(n) && n.length >= 8,
        required: true,
    },
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(process.env.MONGODB_URI);

module.exports = { Person };
