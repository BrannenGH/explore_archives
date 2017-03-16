#!/usr/bin/env node
"use strict";

import * as mongoose from "mongoose";
import * as server from "./server";

export module DocumentStructure{
  export interface Key{
    archivelocation: string;
    number: number;
    callnumber: string;
    keyword: any[];
  }

  interface document {
    title: string;
    key: Key;
    feature: string;
    description:string;
    documentdate:string;
  }

  export interface Institution extends document {
    dateestablished:number;
    purpose:string;
    head: string;
  }
  export interface Memoir extends document{
    firstname:string;
    lastname:string;
  }
};

class DocumentHandler {
  public Document: mongoose.Schema;
  public Key : mongoose.Schema;

  constructor(key:DocumentStructure.Key){
    var Key = new mongoose.Schema({
      archivelocation: String,
      number: Number,
      callnumber: String,
      keyword: Array
    });
    var Document = new mongoose.Schema({
      title: String,
      key: mongoose.Schema,
      feature: String,
      description: String,
      documentdate: String,
      //fill with JSON object will all optional parameters
      other: Object
    });
    this.read(key);
  }

  read(key: mongoose.Schema | DocumentStructure.Key) {
    //mongoose code to grab data and read into object
    return;
  }
}
