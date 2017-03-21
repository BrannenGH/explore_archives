//iport * as React from "react";
//import * as axios from "axios";



class SingleDocument extends React.Component(){


  documentproperty(type,documentid,value){
    var response;
    $.getJSON('http://localhost/api/' + documentid + '/' + type, function(serversent){
      if (type == "property"){
        response = serversent.property[value];
      } else{
        response = serversent[value];
      }
    });
    return response
  }
  render(){
    return(
      <div class="col-md-6 col-xs-12 list-group-item">
        <div class ="container">
          <div class="row">
            <div class="col-xs-2">
              <h1> {this.documentproperty("key",this.props.documentid,"callnumber")} </h1>
            </div>
            <div class="col-xs-10">
              <h1> {this.documentproperty("property",this.props.documentid,"title")} </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<SingleDocument/>, document.querySelector("#documentplace"));
