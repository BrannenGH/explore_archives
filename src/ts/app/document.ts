#!/usr/bin/env node
"use strict";

import * as mongoose from "mongoose";
import * as server from "./server";

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
    return new DocumentHandler(documentid);
  }

  public documentproperty(jsonkey:string){
    Server.db.
  }

  public documentkey(jsonkey:string){

  }


  read(documentid:number) {
    //mongoose code to grab data and read into object
    return;
  }
}
