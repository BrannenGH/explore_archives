//import * as React from "react";
//import * as start from "../start";
//import * as documentholder from "./document";
//import * as axios from "axios";


class DocumentView extends React.Component{
  page :number;
  documentstoload: number;

  constructor(){
    super();
    var page = 1;
    }
  componentWillMount(page){
    $.getJSON("http://localhost/api/"+ page,function(result){
        console.log("API WAS CALLED %s", documents);
        var documentstoload = result[documents];
    });
  }

  htmlgenerate(loadingdocuments){
    for (var i=0; i<loadingdocuments.length; i++){
      return this.htmlgenerateindividual(loadingdocuments[i]);
    }
  }
  htmlgenerateindividual(documentid){
    return "<div #documentplace documentid='" + documentid + "' />"
  }

  render() {
    return(
      <section>
        <container>
          <row>
            <div class="col-md-12">
              <ul class="list-group">
              {this.htmlgenerate(this.documentstoload)}
              </ul>
            </div>
          </row>
        </container>
      </section>
    )
  }
}


ReactDOM.render(<DocumentView/>, document.querySelector("#documentview"));
