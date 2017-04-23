function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:44.977753, lng:-93.265011},
        zoom: 3
     });
     var markerlist = {};
     $.getJSON("/apip/none",function(data){
        $.each(data, function(key, value){
            for (var i=0; i<value.length; i++){
 /*               { var z = i; console.log(z); console.log(value[z]["Document"].length);

                        });
                    }
        }*/
                if(value[i]["Location"] != null && value[i]["Location"] != undefined){
                    var uniquedocid = (value[i]["Location"][0] * value[i]["Location"][1]).toString();
                    markerlist[uniquedocid] = new google.maps.Marker({
                        position: {lat:value[i]["Location"][0], lng:value[i]["Location"][1]},
                        map: map
                    });
                    console.log(value[i]["Document"]);
                    addListeners(map,markerlist[uniquedocid],value[i]["Document"]);
                }
/*                        if(data["properties"]["machinelocation"] != undefined){
                            markerlist[data["_id"]] = new google.maps.Marker({
                                
                            });
                        console.log(markerlist[data["_id"]]);
                        */
            }
        });
    });
}

function addListeners(map,mostrecentmarker,documentids){
    var document = fetchdata(documentids);
    mostrecentmarker.addListener('click',function(){
        map.setCenter(mostrecentmarker.getPosition());
        //htmltoaddbuffer = "<div class='container'>";
        htmltoaddbuffer = "";
        for (var i = 0; i < document.length; i++){
            htmltoaddbuffer += "<div class='panel panel-default'><div class='panel-heading'>";
            if (validatefield(document[i]["callnumber"])){
                htmltoaddbuffer += ("<h1 class='panel-title'><a href='http://archives.lib.umn.edu/repositories/6?&q="+ document[i]["callnumber"] +"' class='btn-block'>" + document[i]["callnumber"] + "</a></h1>");
            }
            htmltoaddbuffer += "</div>"
            htmltoaddbuffer += "<div class='panel-body'>";
            htmltoaddbuffer += "<div class='row'><div class='col-xs-6'>";
            //first column building

            if (validatefield(document[i]["properties"]["institutionname"])){
                htmltoaddbuffer += ("<h2>" + document[i]["properties"]["institutionname"] + "</h2><br />");
            }
            if (validatefield(document[i]["properties"]["location"])){
                htmltoaddbuffer += ("<p>" + document[i]["properties"]["location"] +"</p><br />")
            }
            //if (validatefield(document[i]["properties"][""]))
            htmltoaddbuffer += "</div>"
            //second column building
            htmltoaddbuffer += "<div class='col-xs-6'>"
            if (validatefield(document[i]["properties"]["details"])){
                htmltoaddbuffer += ("<p>" + document[i]["properties"]["details"] + "</p>");
            }
            if (validatefield(document[i]["properties"]["etc"])){
                htmltoaddbuffer += ("<p>" + document[i]["properties"]["etc"] + "</p>")
            }
            htmltoaddbuffer += "</div></div>";
            htmltoaddbuffer += "</div></div></div>";
        }
        //htmltoaddbuffer += "</div>";
        console.log(htmltoaddbuffer);
        $(".documentview").html(htmltoaddbuffer);
    });
}

function fetchdata(documentids){
    var dataarray = [];
    for (var i=0; i < documentids.length; i++){
        $.getJSON("/apid/"+documentids[i],function(data){
            dataarray.push(data);
        });
    }
    return dataarray;
}

function validatefield(field){
    if (field != undefined && field != null){
        return true;
    } else{
        return false;
    }
}

