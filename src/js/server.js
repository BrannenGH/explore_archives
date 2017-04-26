#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var document = require("./document");
var bodyParser = require("body-parser");
var bluebird = require("bluebird");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.database = Database.start();
        this.routes();
        this.app.database = this.database;
    }
    //create instance of sever class
    Server.start = function () {
        return new Server;
    };
    Server.prototype.config = function () {
        this.app.use(express.static(path.join(__dirname, "../../public")));
        this.app.set('port', 80);
        this.app.set('view engine', 'pug');
        this.app.set('views', path.join(__dirname, "../../public/views"));
        this.app.use(bodyParser.json());
        this.app.listen(this.app.get('port'), function () {
            //console.log('App started and listening on port %s', this.app.get("port"));
        });
        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            //res.status(404).send('ERROR — The site administrators have been notified');
            next(err);
        });
    };
    Server.prototype.routes = function () {
        var documenthandlers;
        /*this.app.get("/",function(req,res){
          res.render('index');
        });
       this.app.get("/documents/",function(req,res){
          res.render('documents');
        });
       this.app.get("/about",function(req,res){
          res.render('about');
        });
        this.app.get("/visiting",function(req,res){
          res.render('visiting');
        });*/
        this.app.get("/", function (req, res) {
            res.render('documents');
        });
        this.app.get("/apip/:filters", function (req, res) {
            var listofdocuments = { "documents": [] };
            req.app.database.Document.find(null, null, { sort: 'properties.machinelocation' }, function (err, files) {
                for (var i = 0; i < files.length; i++) {
                    if (files[i - 1] != undefined && files[i] != undefined && JSON.stringify(files[i - 1]["properties"]["machinelocation"]) == JSON.stringify(files[i]["properties"]["machinelocation"])) {
                        listofdocuments["documents"][listofdocuments["documents"].length - 1]["Document"].push(files[i]["_id"]);
                    }
                    else {
                        var stagedObject = { "Location": files[i]["properties"]["machinelocation"], "Document": [files[i]["_id"]] };
                        listofdocuments["documents"].push(stagedObject);
                    }
                }
                res.json(listofdocuments);
            });
        });
        this.app.get("/apid/:documentid", function (req, res) {
            var documentid = req.params.documentid;
            req.app.database.Document.findOne({ "_id": documentid }, null, function (err, document) { res.json(document); });
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
        mongoose.connect('mongodb://localhost:27017/explore_archives');
        this.db = mongoose.connection;
        //    this.db.use("explore_archives");
        this.db.on("error", console.error.bind(console, "connection error:"));
        var DocumentSchema = new mongoose.Schema({
            archivelocation: String,
            callnumber: String,
            docnumber: Number,
            featured: Boolean,
            relevance: Number,
            date: Array,
            //fill with JSON object will all optional parameters
            properties: JSON
        });
        this.Document = mongoose.model('Document', DocumentSchema);
        //console.log(this.Document.find(function(err, data){console.log(data);}).sort('odcnumber'));
        //console.log(this.Document.find(function(err, data){console.log(data);}).sort('relevance featured docnumber').
        //limit(10).sort('-relevance -featured -docnumber').
        //limit(10).sort('relevance featured docnumber').lean());//.distinct('_id'));
        mongoose.Promise = bluebird;
    };
    Database.prototype.documentlist = function () {
        var listofdocuments = { "documents": [] };
        this.Document.find(null, null, { sort: 'relevance featured docnumber' }, function (err, files) {
            console.log(this.prototype);
            for (var i = 0; i < files.length; i++) {
                listofdocuments["documents"].push(files[i]["_id"]);
            }
            console.log(listofdocuments);
        });
        return listofdocuments;
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
