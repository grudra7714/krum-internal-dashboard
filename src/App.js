"use strict";
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ApiRouter_1 = require('./routes/ApiRouter');
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(express.static(path.join(process.cwd(), '../app/ui/elements'), { maxAge: '7d' }));
        this.express.use('/bower_components', express.static(path.join(process.cwd(), '../app/ui/bower_components')));
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.sendFile("index.html", { root: path.join(process.cwd(), "../app/ui/elements") });
        });
        this.express.use("/", router);
        this.express.use("/api", ApiRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
