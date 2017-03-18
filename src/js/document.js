#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start = require("./start");
var DocumentHandler = (function () {
    function DocumentHandler(documentid) {
        var documentid = documentid;
        var properties = start.RunningServer.db.readproperty(documentid);
        var key = start.RunningServer.db.readkey(documentid);
        return new DocumentHandler(documentid);
    }
    return DocumentHandler;
}());
exports.DocumentHandler = DocumentHandler;
