#!/usr/bin/env node
"use strict";

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as pug from 'pug';
import * as document from './document';

declare var __dirname;

export class Server{
  public app : express.Application;
  public db : Database;

  //create instance of sever class
  public static start(): Server {
    return new Server;
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.db = Database.start();
  }
  public config() {
    this.app.use(express.static(path.join(__dirname, "../../../public")));

    this.app.set('port', 3000);
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname,"../../../public/views"));

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
      this.app.get("/",function(req,res){
        res.render('index');
      });
      this.app.get("/documents",function(req,res){
        this.db.initializedocuments();
      });
      this.app.get("/documents/:documentid",function(req,res){
        this.db.displaydetails();
      });
      this.app.get("/documents/limit/:keywords",function(req,res){
          //Apply properties of doucments that only match
      });
      this.app.get("/about",function(req,res){
        res.render('about');
      });
      this.app.use(function (req,res,next){
        res.status(404).render("404");
      });

  }
}


class Database {
  public db : mongoose.connection;
  public Document: mongoose.model;

  constructor() {
    this.connectdb();
  }

  public static start(){
    return new Database;
  }

  public connectdb(){
    mongoose.connect('mongodb://localhost:30000/');
    this.db = mongoose.connection;
    this.db.use("explore_archives");
    this.db.on("error", console.error.bind(console, "connection error:"));
    var DocumentSchema = new mongoose.Schema({
      archivelocation: String,
      callnumber: String,
      docnumber: Number,
      featured: Boolean,
      relevance: Number,
      date: Date,
      //fill with JSON object will all optional parameters
      properties: mongoose.Schema.Types.Mixed
    });
    var Document = mongoose.model('Document', DocumentSchema);
  }

  public documentlist(page:number){
    var perpage = 10;
    return this.Document.sort('relevance featured docnumber').
    limit(page*perpage).sort('-relevance -featured -docnumber').
    limit(perpage).sort('relevance featured docnumber').lean().distinct('_id');
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
