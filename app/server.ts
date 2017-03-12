#!/usr/bin/env node
"use strict";

import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';

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

    this.app.set('port', process.env.PORT || 80);

    this.app.listen(this.app.get('port'), function() {
      console.log('App started and listening on port %s', server.address().port);
    });

    this.app.use(function(err:any, req: express.Request, res: express.Response, next: express.NextFunction) {
      console.error(err.stack);
      err.status(404).send('ERROR — The site administrators have been notified');
      next(err);
    });
  }
}

module Route {
  export class Index {
    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.render("index");
    }
  }
}
