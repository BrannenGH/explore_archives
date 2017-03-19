#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DocumentHandler = (function () {
    function DocumentHandler(documentid, property, key) {
        var documentid = documentid;
        var property = property;
        var key = key;
    }
    DocumentHandler.prototype.documentkey = function () {
        return this.key;
    };
    DocumentHandler.prototype.documentproperty = function () {
        return this.property;
    };
    return DocumentHandler;
}());
exports.DocumentHandler = DocumentHandler;
