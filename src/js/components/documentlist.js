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
var start = require("./start");
var DocumentView = (function (_super) {
    __extends(DocumentView, _super);
    function DocumentView() {
        var _this = _super.call(this) || this;
        if (isNaN(_this.props.page)) {
            var page = page;
            page = 1;
        }
        return _this;
    }
    DocumentView.prototype.componentWillMount = function () {
        var domcomponents = '';
        var documents = start.RunningServer.db.documentlist(this.page);
        for (var i = 0; i < documents.length; i++) {
            domcomponents += this.documentbasic(documents[i]);
        }
    };
    DocumentView.prototype.render = function () {
        return (React.createElement("section", null,
            React.createElement("container", null,
                React.createElement("row", null,
                    React.createElement("div", { class: "col-md-12" },
                        React.createElement("ul", { class: "list-group" }, domcomponents))))));
    };
    return DocumentView;
}(React.Component));
