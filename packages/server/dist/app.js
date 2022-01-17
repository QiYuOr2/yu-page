"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const app = Express();
app.get('/', (req, res) => {
    res.send('12');
});
app.listen(3000, () => {
    console.log('running at http://localhost:3000');
});
