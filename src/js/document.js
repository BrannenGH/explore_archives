#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentHandler = (function () {
    function DocumentHandler(documentid, property, key) {
        var documentid = documentid;
        var property = property;
        var key = key;
    }
    DocumentHandler.prototype.documentkey = function (keyvalue) {
        return this.key[keyvalue];
    };
    DocumentHandler.prototype.documentproperty = function (keyvalue) {
        return this.property[keyvalue];
    };
    return DocumentHandler;
}());
exports.DocumentHandler = DocumentHandler;
