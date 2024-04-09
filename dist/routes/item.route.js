"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
exports.itemRouter = (0, express_1.default)();
exports.itemRouter.get("/items", (req, res) => {
    console.log("Se recibió una solicitud para obtener todos los ítems.");
    return res.status(200).send(__1.items);
});
exports.itemRouter.post("/items", (req, res) => {
    if (!req.body)
        return res.status(400).send("No body provided");
    const item = req.body;
    if (!item.id) {
        item.id = Math.floor(Math.random() * 1000000);
    }
    __1.items.push(item);
    res.status(200).send(__1.items);
});
exports.itemRouter.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = __1.items.find((item) => item.id === id);
    if (!item)
        return res.status(404).send("Item not found");
    res.status(200).send(item);
});
exports.itemRouter.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = __1.items.find((item) => item.id === id);
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
    res.status(200).send(__1.items);
});
exports.itemRouter.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = __1.items.findIndex((item) => item.id === id);
    if (!itemIndex)
        return res.status(404).send("item not found");
    __1.items.splice(itemIndex, 1);
    res.status(200).send(__1.items);
});
