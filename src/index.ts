import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { TodoItem } from "./types/item.model";
import { itemRouter } from "./routes/itemRoute";

export const items: TodoItem[] = [
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


app.get("/", itemRouter)

app.get("/items", itemRouter)

app.post("/items", itemRouter)

app.get("/items/:id", itemRouter)

app.put("/items/:id", itemRouter)

app.delete("/items/:id", itemRouter)

const PÖRT = 3000;

app.listen(PÖRT,() => {
    console.log(`Express server started on port ${PÖRT}`)
})