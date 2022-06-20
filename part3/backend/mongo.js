require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in the environment!");
    process.exit(0);
}

const args = process.argv.slice(2);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

(async () => {
    // @ts-expect-error
    await mongoose.connect(process.env.MONGODB_URI);

    if (args.length === 0) {
        const people = await Person.find({});
        console.log("phonebook:");
        for (const { name, number } of people) {
            console.log(name, number);
        }
    } else if (args.length === 2) {
        const [name, number] = args;
        const person = new Person({ name, number });
        await person.save();
        console.log(`Added ${name} (${number}) to your phonebook`);
    } else {
        console.log("Invalid amount of arguments");
    }
    await mongoose.disconnect();
})();
