$(function(){
var directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
var directionsService = new google.maps.DirectionsService();
var map;

$(window).load(function() {
    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: new google.maps.LatLng(35.270, -80.837)
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directions"));
    
    $("#routeMode").on("change", function() { calcRoute(); });
    $("#routeGo").on("click", function() { calcRoute(); });
    $("#routeClear").on("click", function() { directionsDisplay.setDirections({ routes: [] }); });
    
});


function calcRoute() {
    var request = {
        origin: $("#routeTo").val(),
        destination: $("#routeFrom").val(),
        travelMode: google.maps.TravelMode[$("#routeMode").val()]
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}
});