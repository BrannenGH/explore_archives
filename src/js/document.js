#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start = require("./start");
var DocumentHandler = (function () {
    function DocumentHandler(documentid) {
        var documentid = documentid;
        return new DocumentHandler(documentid);
    }
    DocumentHandler.prototype.documentproperty = function (jsonkey) {
        var document = start.RunningServer.db.readproperty(this.documentid);
    };
    DocumentHandler.prototype.documentkey = function (jsonkey) {
        var key = start.RunningServer.db.readkey(this.documentid);
    };
    DocumentHandler.prototype.read = function (documentid) {
        return;
    };
    return DocumentHandler;
}());
exports.DocumentHandler = DocumentHandler;
