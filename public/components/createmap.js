function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:44.977753, lng:-93.265011},
        zoom: 3
     });
     var markerlist = {};
     $.getJSON("/apip/1"+"/location/",function(data){
        $.each(data, function(key, value){
            for (var i=0; i<10; i++){
                $.getJSON("/apid/"+value[i],function(data){
                    if(data["properties"]["machinelocation"] != undefined){
                        markerlist[data["_id"]] = new google.maps.Marker({
                            position: {lat:data["properties"]["machinelocation"][0], lng:data["properties"]["machinelocation"][1]},
                            map: map
                        });
                    console.log(markerlist[data["_id"]]);
                    addListeners(map,markerlist[data["_id"]],data);
                    }
                });
            }
        });
    });
}

function addListeners(map,mostrecentmarker,document){
    //var document = $.getJSON("/apid/")
    mostrecentmarker.addListener('click',function(){
        map.setCenter(mostrecentmarker.getPosition());
        $(".documentview").html("<div class='col-xs-6'><h1>"+document["properties"]["location"]+"</h1></div><div class='col-xs-6'><h3>"+document["properties"]["etc"]+"</h3></div>");
    });
}