#!/usr/bin/env node
"use strict";

import * as React from "react";
import * as start from "../start";
import * as documenthandler from '../document';

class SingleDocument extends React.Component(){


  render(){
    return(
      <div class="col-md-6 col-xs-12 list-group-item">
        <div class ="container">
          <div class="row">
            <div class="col-xs-2">
              <h1> {this.props.document.documentkey("callnumber")} </h1>
            </div>
            <div class="col-xs-10">
              <h1> {this.props.document.documentproperty("title")} </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
