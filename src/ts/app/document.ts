#!/usr/bin/env node
"use strict";

import * as mongoose from "mongoose";
import * as start from "./start";

export interface document{
  title: String,
  key: mongoose.Schema,
  feature: String,
  description: String,
  //fill with JSON object will all optional parameters
  other: documentproperties
}

interface documentproperties{
  "firstname": string,
  "lastname": string,
  "date": number,
  "affiliations": [string]
}

export class DocumentHandler {
  public Document: mongoose.Schema;
  public Key : mongoose.Schema;
  documentid : number;

  constructor(documentid:number){
    var documentid = documentid;
    return new DocumentHandler(documentid);
  }

  public documentproperty(jsonkey:string){
    var document = start.RunningServer.db.readproperty(this.documentid);
  }

  public documentkey(jsonkey:string){
    var key = start.RunningServer.db.readkey(this.documentid);

  }


  read(documentid:number) {
    //mongoose code to grab data and read into object
    return;
  }
}
