#!/usr/bin/env node
"use strict";

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as pug from 'pug';

declare var __dirname;

module DocumentStructure{
  interface key{
    archivelocation: string;
    number: number;
    callnumber:string;
  }

  interface document {
    title: string;
    key: key;
    feature: string;
    description:string;
    documentdate:string;
  }

  interface institution extends document {
    dateestablished:number;
    purpose:string;
    head: string;
  }
  interface memoir extends document{
    firstname:string;
    lastname:string;
  }
}

class Server{
  public app : express.Application;

  //create instance of sever class
  public static start(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }
  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.set('port', 80);
    this.app.set('view engine', 'pug');

    this.app.listen(this.app.get('port'), function() {
      console.log('App started and listening on port %s', this.app.server.address().port);
    });

    this.app.use(function(err:any, req: express.Request, res: express.Response, next: express.NextFunction) {
      console.error(err.stack);
      err.status(404).send('ERROR — The site administrators have been notified');
      next(err);
    });
  }
}

// module Route {
//   export class Index {
//     public index(req: express.Request, res: express.Response, next: express.NextFunction) {
//       res.render("index");
//     }
//   }
// }
