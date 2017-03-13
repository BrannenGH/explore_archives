#!/usr/bin/env node
"use strict";

import * as mongoose from "mongoose";

export module DocumentStructure{
  export interface Key{
    archivelocation: string;
    number:number;
    callnumber:string;
    keyword:any[];
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
  constructor(key:DocumentStructure.Key){
    this.readfromdb(key);
  }

  readfromdb(key:DocumentStructure.Key): DocumentStructure.Institution | DocumentStructure.Memoir {
    //mongoose code to grab data and read into object
    return;
  }
}
