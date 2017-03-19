#!/usr/bin/env node
"use strict";

import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as start from "./start";
import * as documenthandler from './document';

class DocumentView extends React.Component{
  page = 1;
  render() {
    var domcomponents = '';
    var documents = start.RunningServer.db.documentlist(this.page);
    for (var i=0; i < documents.length; i++){
      domcomponents += this.documentbasic(documents[i]);
    }
    return(
      <section>
        <container>
          <row>
            <div class="col-md-12">
              <ul class="list-group">
              {domcomponents}
              </ul>
            </div>
          </row>
        </container>
      </section>
    )
  }
  documentbasic(document:documenthandler.DocumentHandler){
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
