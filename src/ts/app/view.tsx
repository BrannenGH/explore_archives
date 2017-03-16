#!/usr/bin/env node
"use strict";

import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as documenthandler from './document';

class DocumentList extends React.Component{
  documentid: number;

  render(documentids:any[]) {
    var documents = "";
    var i;
    for (i = 0; i < documentids.length; i++){
      documents += this.documentbasic(documentids[i]);
    }
    return(
      <section>
        <container>
          <row>
            <div class="col-md-12">
              <ul class="list-group">
                {}
              </ul>
            </div>
          </row>
        </container>
      </section>
    )
  }
  documentbasic(documentid: number){
    var document = new documenthandler.DocumentHandler(documentid);

    return (
      <div class="col-md-6 col-xs-12 list-group-item">
        <div class ="container">
          <div class="row">
            <div class="col-xs-2">
              <h1> {document.documentkey("callnumber")} </h1>
            </div>
            <div class="col-xs-10">
              <h1> {document.documentproperty("title")} </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
