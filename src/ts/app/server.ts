#!/usr/bin/env node
"use strict";

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as pug from 'pug';
import * as document from './document';
import * as bodyparser from 'body-parser';

declare var __dirname;
console.log(__dirname)


export class Server{
  public app : express.Application;

  //create instance of sever class
  public static start(): Server {
    return new Server;
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  public config() {
    this.app.use(express.static(path.join(__dirname, "../../../public")));

    this.app.set('port', 3000);
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname,"../../../public/views"));

    this.app.use(bodyparser.json());

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
      this.app.use(function (req,res,next){
        res.status(404).render("404");
      });
  }
}


class Database {
  public db : mongoose.connection;
  public Document : mongoose.Schema;
  public Key : mongoose.Schema;

  constructor() {
    this.connectdb();
    var Key = new mongoose.Schema({
      archivelocation: String,
      number: Number,
      callnumber: String,
      keyword: Array
    });
  }

  public connectdb(){
    mongoose.connect('mongodb://localhost:30000/');
    this.db = mongoose.connection;
    this.db.on("error", console.error.bind(console, "connection error:"));
  }

  public initalizedb(){

  }
}
