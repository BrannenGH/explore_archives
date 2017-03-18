#!/usr/bin/env node
"use strict";

import * as mongoose from "mongoose";
import * as start from "./start";

export class DocumentHandler {
  public properties: JSON;
  public key : JSON;
  documentid : number;

  constructor(documentid:number){
    var documentid = documentid;
    var properties = start.RunningServer.db.readproperty(documentid);
    var key = start.RunningServer.db.readkey(documentid);
    return new DocumentHandler(documentid);
  }
  //add code to edit objects
}
