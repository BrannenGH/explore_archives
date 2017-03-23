#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
console.log(__dirname);
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.listen();
    }
    Server.start = function () {
        return new Server;
    };
    Server.prototype.config = function () {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set('port', 80);
        this.app.set('view engine', 'pug');
        this.app.listen(this.app.get('port'), function () {
            console.log('App started and listening on port %s', this.app.server.address().port);
        });
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            err.status(404).send('ERROR — The site administrators have been notified');
            next(err);
        });
    };
    Server.prototype.listen = function () {
    };
    return Server;
}());
var Database = (function () {
    function Database() {
    }
    return Database;
}());
