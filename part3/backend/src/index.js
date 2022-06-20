const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Person } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

morgan.token("data", (/** @type {any} */ req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.listen(process.env.PORT || 3001);

app.get("/info", async (req, res) => {
    res.send(
        `<p>Phonebook has info for ${await Person.count()} people</p><p>${new Date().toString()}</p>`
    );
});

app.get("/api/persons/:id", async (req, res) => {
    if (!/^[0-9a-f]{24}$/im.test(req.params.id))
        return res.status(400).json({ error: "invalid id " });
    const user = await Person.findById(req.params.id);
    if (user) {
        const { name, number, id } = user;
        return res.json({ name, number, id });
    }
    return res.status(404).json({ error: "person not found" });
});

app.delete("/api/persons/:id", async (req, res) => {
    if (!/^[0-9a-f]{24}$/im.test(req.params.id))
        return res.status(400).json({ error: "invalid id " });
    const person = await Person.findByIdAndRemove(req.params.id);
    if (person) return res.status(204).end();
    return res.status(404).json({ error: "person not found" });
});

app.put("/api/persons/:id", async (req, res) => {
    if (!/^[0-9a-f]{24}$/im.test(req.params.id))
        return res.status(400).json({ error: "invalid id " });
    const { number } = req.body;
    if (typeof number !== "string") {
        return res.status(400).json({ error: "invalid body" });
    }
    const person = await Person.findByIdAndUpdate(
        req.params.id,
        {
            number,
        },
        {
            new: true,
            runValidators: true,
            context: "query",
        }
    );
    if (person) return res.status(200).end();
    return res.status(404).json({ error: "person not found" });
});

app.post("/api/persons", async (req, res) => {
    const { name, number } = req.body;
    if (typeof name !== "string" || typeof number !== "string") {
        return res.status(400).json({ error: "invalid body" });
    }
    const person = await Person.findOne({
        $or: [
            {
                name,
            },
            {
                number,
            },
        ],
    });
    if (person != null) {
        return res.status(400).json({ error: "name or number already exists" });
    }
    const newPerson = new Person({
        name,
        number,
    });
    const savedPerson = await newPerson.save();
    return res.json({ id: savedPerson.id, name, number });
});

app.get("/api/persons", async (req, res) =>
    res.json((await Person.find({})).map(({ name, number, id }) => ({ name, number, id })))
);

app.use("/", express.static("./build"));

// express 5 is cool with async errors without using next()
app.use((err, _req, res, next) => {
    if (res.headersSent) return next(err);
    console.error(err);
    return res.status(500).send({ error: err.message });
});
