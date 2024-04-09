"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const itemRoute_1 = require("./routes/itemRoute");
exports.items = [
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
];
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", itemRoute_1.itemRouter);
app.get("/items", itemRoute_1.itemRouter);
app.post("/items", (req, res) => {
    if (!req.body)
        return res.status(400).send("No body provided");
    const item = req.body;
    if (!item.id) {
        item.id = Math.floor(Math.random() * 1000000);
    }
    exports.items.push(item);
    res.status(200).send(exports.items);
});
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = exports.items.find((item) => item.id === id);
    if (!item)
        return res.status(404).send("Item not found");
    res.status(200).send(item);
});
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = exports.items.find((item) => item.id === id);
    if (!item)
        return res.status(404).send("Item not found");
    const updateItem = req.body;
    if (!updateItem)
        return res.status(404).send("No body provided");
    if (updateItem.title)
        item.title = updateItem.title;
    if (updateItem.description)
        item.description = updateItem.description;
    if (updateItem.done)
        item.done = updateItem.done;
    res.status(200).send(exports.items);
});
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = exports.items.findIndex((item) => item.id === id);
    if (!itemIndex)
        return res.status(404).send("item not found");
    exports.items.splice(itemIndex, 1);
    res.status(200).send(exports.items);
});
const PÖRT = 3000;
app.listen(PÖRT, () => {
    console.log(`Express server started on port ${PÖRT}`);
});
