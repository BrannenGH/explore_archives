#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
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
        this.app.use(express.static(path.join(__dirname, "../../../public")));
        this.app.set('port', 3000);
        this.app.set('view engine', 'pug');
        this.app.set('views', path.join(__dirname, "../../../public/views"));
        this.app.listen(this.app.get('port'), function () {
        });
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            next(err);
        });
    };
    Server.prototype.routes = function () {
        this.app.get("/", function (req, res) {
            res.render('index');
        });
        this.app.get("/documents", function (req, res) {
            this.db.initializedocuments();
        });
        this.app.get("/documents/:documentid", function (req, res) {
            this.db.displaydetails();
        });
        this.app.get("/documents/limit/:keywords", function (req, res) {
        });
        this.app.get("/about", function (req, res) {
            res.render('about');
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
        mongoose.connect('mongodb://localhost:30000/');
        this.db = mongoose.connection;
        this.db.use("explore_archives");
        this.db.on("error", console.error.bind(console, "connection error:"));
    };
    Database.prototype.documentlist = function () {
        var DocumentSchema = new mongoose.Schema({
            archivelocation: String,
            callnumber: String,
            docnumber: Number,
            feature: Number,
            date: Date,
            properties: mongoose.Schema.Types.Mixed
        });
        var Document = mongoose.model('Document', DocumentSchema);
        loaddocuments(startingpoint);
    };
    Database.prototype.readproperty = function (documentid) {
    };
    Database.prototype.readkey = function (documentid) {
        this.Document.findOne({ "_id": documentid }, 'archivelocation callnumber docnumber feature date', function (err, docuemnt) {
            if (err)
                return this.handleerror(err);
        });
    };
    Database.prototype.handleerror = function (error) {
        console.log("Error in database: %s", error);
    };
    return Database;
}());
