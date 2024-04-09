import express, { response } from "express";
import { TodoItem } from "../types/item.model";



export const itemRouter = express();

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

itemRouter.get("/",(req, res) => {
    return res.status(200).send({response: "OK!"})
})

itemRouter.get("/items", (req, res) => {
    return res.status(200).send(items)
})

itemRouter.post("/items", (req, res) => {
    if (!req.body) return res.status(400).send("No body provided")

    const item: TodoItem = req.body

    if (!item.id) {
        item.id = Math.floor(Math.random() * 1000000)
    }

    items.push(item)

    res.status(200).send(items)
})

itemRouter.get("/items/:id",  (req,res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if(!item) return res.status(404).send("Item not found")

    res.status(200).send(item)
})

itemRouter.put("/items/:id",  (req,res) => {
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

itemRouter.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);

    if(!itemIndex) return res.status(404).send("item not found");

    items.splice(itemIndex, 1);

    res.status(200).send(items)
})