#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var documenthandler = require("./document");
var DocumentList = (function (_super) {
    __extends(DocumentList, _super);
    function DocumentList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentList.prototype.render = function (documentids) {
        var documents = "";
        var i;
        for (i = 0; i < documentids.length; i++) {
            documents += this.documentbasic(documentids[i]);
        }
        return (React.createElement("section", null,
            React.createElement("container", null,
                React.createElement("row", null,
                    React.createElement("div", { class: "col-md-12" },
                        React.createElement("ul", { class: "list-group" }))))));
    };
    DocumentList.prototype.documentbasic = function (documentid) {
        var document = new documenthandler.DocumentHandler(documentid);
        return (React.createElement("div", { class: "col-md-6 col-xs-12 list-group-item" },
            React.createElement("div", { class: "container" },
                React.createElement("div", { class: "row" },
                    React.createElement("div", { class: "col-xs-2" },
                        React.createElement("h1", null,
                            " ",
                            document.documentkey("callnumber"),
                            " ")),
                    React.createElement("div", { class: "col-xs-10" },
                        React.createElement("h1", null,
                            " ",
                            document.documentproperty("title"),
                            " "))))));
    };
    return DocumentList;
}(React.Component));
