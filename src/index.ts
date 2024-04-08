import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { TodoItem } from "./types/item.model";

const items: TodoItem[] = [
    {
        title: "item 1",
        description: "Do thing",
        done: false,
        id: 1
    },
    {
        title: "item 1",
        description: "Do thing",
        done: false,
        id: 2
    },
    {
        title: "item 2",
        description: "Do thing",
        done: false,
        id: 3
    },
    {
        title: "item 3",
        description: "Do thing",
        done: false,
        id: 4
    }
]

const app = express();
app.use(cors());
app.use(bodyParser.json())


app.get("/", (req,res) => {
    return res.status(200).send({ response: "Hello world"})
})

app.get("/items", (req,res) => {
    console.log("Se recibió una solicitud para obtener todos los ítems.");
    return res.status(200).send(items)
})

app.post("/items",(req, res) => {
    if (!req.body) return res.status(400).send("No body provided")

    const item: TodoItem = req.body

    if (!item.id) {
        item.id = Math.floor(Math.random() * 1000000)
    }

    items.push(item)

    res.status(200).send(items)
})

app.get("/items/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if(!item) return res.status(404).send("Item not found")

    res.status(200).send(item)
})

app.put("/items/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if(!item) return res.status(404).send("Item not found")

    const updateItem: TodoItem = req.body;

    if(!updateItem) return res.status(404).send("No body provided")

    if (updateItem.title) item.title = updateItem.title;
    if (updateItem.description) item.description = updateItem.description;
    if (updateItem.done) item.done = updateItem.done;

    res.status(200).send(items)
})

app.delete("/items/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);

    if(!itemIndex) return res.status(404).send("item not found");

    items.splice(itemIndex, 1);

    res.status(200).send(items)
})

const PÖRT = 3000;

app.listen(PÖRT,() => {
    console.log(`Express server started on port ${PÖRT}`)
})