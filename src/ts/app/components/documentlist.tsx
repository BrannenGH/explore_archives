#!/usr/bin/env node
"use strict";

import * as React from "react";
import * as start from "./start";


class DocumentView extends React.Component{
  props: any[];
  page: number;
  constructor(){
    super();
    if(isNaN(this.props.page)){
      var page = page;
      page = 1;
    }
  }
  componentWillMount(){
      var domcomponents = '';
      var documents = start.RunningServer.db.documentlist(this.page);
      for (var i=0; i < documents.length; i++){
        domcomponents += this.documentbasic(documents[i]);
    }
  }

  render() {
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
}
