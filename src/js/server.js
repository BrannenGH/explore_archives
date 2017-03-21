#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var document = require("./document");
var bodyParser = require("body-parser");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
        this.db = Database.start();
    }
    Server.start = function () {
        return new Server;
    };
    Server.prototype.config = function () {
        this.app.use(express.static(path.join(__dirname, "../../public")));
        this.app.set('port', 3000);
        this.app.set('view engine', 'pug');
        this.app.set('views', path.join(__dirname, "../../public/views"));
        this.app.use(bodyParser.json());
        this.app.listen(this.app.get('port'), function () {
        });
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            next(err);
        });
    };
    Server.prototype.routes = function () {
        var documenthandlers;
        this.app.get("/", function (req, res) {
            res.render('index');
        });
        this.app.get("/documents/", function (req, res) {
            res.render('documents');
        });
        this.app.get("/about", function (req, res) {
            res.render('about');
        });
        this.app.get("/api/:page", function (req, res) {
            var documentids = this.db.documentlist(req.params.page);
            res.json(documentids);
            for (var i = 0; documentids.legnth < i; i++) {
                documenthandlers[documentids[i]] = this.db.createdocuments(documentids[i]);
            }
        });
        this.app.get("/api/:documentid/:type", function (req, res) {
            var documentid = req.params.documentid;
            if (!documenthandlers.hasOwnProperty(documentid)) {
                documenthandlers[documentid] = this.db.createdocuments(documentid);
            }
            if (req.params.type == "key") {
                res.json(documenthandlers[documentid].documentkey());
            }
            else if (req.params.type == "property") {
                res.json(documenthandlers[documentid].documentproperty());
            }
            else {
                console.log("ERROR INVALID REQUEST TYPE");
            }
        });
        this.app.use(function (req, res, next) {
            res.status(404).render("404");
        });
    };
    return Server;
}());
exports.Server = Server;
var Database = (function () {
    function Database() {
        this.connectdb();
    }
    Database.start = function () {
        return new Database;
    };
    Database.prototype.connectdb = function () {
        mongoose.connect('mongodb://localhost:27017/explore_archives/');
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "connection error:"));
        var DocumentSchema = new mongoose.Schema({
            archivelocation: String,
            callnumber: String,
            docnumber: Number,
            featured: Boolean,
            relevance: Number,
            date: Array,
            properties: mongoose.Schema.Types.Mixed
        });
        var Document = mongoose.model('Document', DocumentSchema);
    };
    Database.prototype.documentlist = function (page) {
        var perpage = 10;
        return this.Document.sort('relevance featured docnumber').
            limit(page * perpage).sort('-relevance -featured -docnumber').
            limit(perpage).sort('relevance featured docnumber').lean().distinct('_id');
    };
    Database.prototype.createdocuments = function (documentid) {
        if (isNaN(documentid)) {
            var currentdocumenthander = [];
            for (var i = 0; i < documentid.legnth; i++) {
                currentdocumenthander.push(new document.DocumentHandler(documentid[i], this.readproperty(documentid[i]), this.readkey(documentid[i])));
            }
            return currentdocumenthander;
        }
        else {
            var currentdocumenthandler = new document.DocumentHandler(documentid, this.readproperty(documentid), this.readkey(documentid));
            return currentdocumenthandler;
        }
    };
    Database.prototype.returnjson = function (err, document) {
        var values;
        if (err)
            return this.handleerror(err);
        values = JSON.parse(document);
        console.log(values);
        return values;
    };
    Database.prototype.readproperty = function (documentid) {
        return this.Document.findOne({ "_id": documentid }, 'property', function (err, document) { this.returnjson(err, document.lean()); });
    };
    Database.prototype.readkey = function (documentid) {
        return this.Document.findOne({ "_id": documentid }, 'archivelocation callnumber docnumber feature date', function (err, document) { this.returnjson(err, document.lean()); });
    };
    Database.prototype.handleerror = function (error) {
        console.log("Error in database: %s", error);
    };
    return Database;
}());
