#!/usr/bin/env node
"use strict";

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as pug from 'pug';
import * as ReactDOM from 'react-dom';
import * as document from './document';
import * as bodyParser from 'body-parser';
import * as bluebird from 'bluebird';

declare var __dirname;

export class Server{
  public app : express.Application;
  public database : Database;

  //create instance of sever class
  public static start(): Server {
    return new Server;
  }

  constructor() {
    this.app = express();
    this.config();
    this.database = Database.start();
    this.routes();
    this.app.database = this.database;
  }
  public config() {
    this.app.use(express.static(path.join(__dirname, "../../public")));

    this.app.set('port', 3000);
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname,"../../public/views"));

    this.app.use(bodyParser.json());

    this.app.listen(this.app.get('port'), function() {
      //console.log('App started and listening on port %s', this.app.get("port"));
    });

    this.app.use(function(err:any, req: express.Request, res: express.Response, next: express.NextFunction) {
      console.error(err.stack);
      //res.status(404).send('ERROR — The site administrators have been notified');
      next(err);
    });
  }
  public routes() {
    var documenthandlers :JSON;
    this.app.get("/",function(req,res){
      res.render('index');
    });
   this.app.get("/documents/",function(req,res){
      res.render('documents');
    });
   this.app.get("/about",function(req,res){
      res.render('about');
    });
    this.app.get("/apip/:page",function(req,res){
      var listofdocuments = {"documents": []}
      req.app.database.Document.find(null,null,{sort: 'relevance featured docnumber'},function(err,files){
        for (var i=0;i < req.params.page *10; i++){
        listofdocuments["documents"].push(files[i]["_id"]);}
        res.json(listofdocuments);
    });
      //console.log(listofdocuments);
      //res.json(listofdocuments);
      //for (var i=0; documentids.legnth < i; i++ ){
      //  documenthandlers[documentids[i]] = req.app.database.createdocuments(documentids[i]);
      //}
    });
    this.app.get("/apid/:documentid",function(req,res){
      var documentid = req.params.documentid;
      req.app.database.Document.findOne({"_id": documentid}, null, function (err,document){res.json(document)});
    });
    this.app.use(function (req,res,next){
      res.status(404).render("404");
    });
  }
}


class Database {
  public db : mongoose.connection;
  public Document: mongoose.model;
  public dummyobject;

  constructor() {
    this.connectdb();
  }

  public static start(){
    return new Database;
  }

  public connectdb(){
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
      properties: mongoose.Schema.Types.Mixed
    });
    this.Document = mongoose.model('Document', DocumentSchema);
    //console.log(this.Document.find(function(err, data){console.log(data);}).sort('odcnumber'));
    //console.log(this.Document.find(function(err, data){console.log(data);}).sort('relevance featured docnumber').
    //limit(10).sort('-relevance -featured -docnumber').
    //limit(10).sort('relevance featured docnumber').lean());//.distinct('_id'));
    mongoose.Promise = bluebird;
  }

  public documentlist(){
    var listofdocuments = {"documents": []}
    this.Document.find(null,null,{sort: 'relevance featured docnumber'},function(err,files){
      console.log(this.prototype);
      for (var i=0;i < files.length; i++){
        listofdocuments["documents"].push(files[i]["_id"]);
      }
      console.log(listofdocuments);
    });
    return listofdocuments;
  }

  public createdocuments(documentid){
    if (isNaN(documentid)){
      var currentdocumenthander = [];
      for (var i = 0; i < documentid.legnth; i++){
        currentdocumenthander.push(new document.DocumentHandler(documentid[i], this.readproperty(documentid[i]), this.readkey(documentid[i])));
      }
      return currentdocumenthander;
    }else{
      var currentdocumenthandler = new document.DocumentHandler(documentid, this.readproperty(documentid), this.readkey(documentid));
      return currentdocumenthandler;
    }
  }
  returnjson(err,document){
    var values: JSON;
    if (err) return this.handleerror(err);
    values = JSON.parse(document);
    console.log(values);
    return values;
  }
  readproperty(documentid){
    return this.Document.findOne({"_id": documentid}, 'property', function (err,document){this.returnjson(err,document.lean())});
  }
  readkey(documentid){
    return this.Document.findOne({"_id": documentid}, 'archivelocation callnumber docnumber feature date', function (err,document){this.returnjson(err,document.lean())});
  }
  public handleerror(error){
    console.log("Error in database: %s", error);
  }
}
