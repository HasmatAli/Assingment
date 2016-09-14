w3App.controller("viewDataController", function ($scope, $http, $routeParams, $window) {
    var markers = [];
    var itemName = $routeParams.menuName;
    $scope.imageNum =1;
    var city=angular.element('#city').val();
    if(city.length<1)
    {
        city='london'
    }
    $scope.fetchData = [];
    $http({
        method: 'GET',
        url: '/search?location='+city+'&term=' + itemName + ''
    }).then(function successCallback(response) {
        var data = response.data.businesses;
         for (var i = 0; i < data.length; i++) {
            $scope.fetchData.push(
                {
                    id: data[i].id,
                    name: data[i].name,
                    phone: data[i].phone,
                    rating: data[i].rating,
                    image: data[i].image_url,
                    coordinates: data[i].location.coordinate,
                    url: data[i].url
                }
            )
        }

        loadGoogleMarkers();
    }, function errorCallback(response) {
        console.log('search data error', response);
    });

    $scope.goToMarker = function (event) {
        var id = event.currentTarget.id;

        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (marker.id === id) {
                $(marker).click();
            }
        }
    };

    $scope.goToBusiness = function (url) {
        console.log('item', url);
        $window.open(url, '_blank');
    };

    function loadGoogleMarkers() {
        var locations = $scope.fetchData;
        console.log('locations', locations);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infoWindow = new google.maps.InfoWindow(),
            bounds = new google.maps.LatLngBounds(),
            marker, i;
     var icon='../../images/map-marker.png';
        for (i = 0; i < locations.length; i++) {
            var coordinates = locations[i].coordinates;
            //console.log('coordinates', coordinates.latitude);
            marker = new google.maps.Marker({
                id: locations[i].id,
                position: new google.maps.LatLng(coordinates.latitude, coordinates.longitude),
                map: map,
                icon:icon
            });


            markers.push(marker);

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infoWindow.setContent(locations[i].name);
                    infoWindow.open(map, marker);
                    $('.grid').css('background-color', '');
                    $('#' + marker.id).css('background-color', "#ccc");

                    $('.right-div').animate({
                        scrollTop: $('#' + marker.id).offset().top - 400
                    }, 2000);
                }
            })(marker, i));
        }
        map.fitBounds(bounds);
    }
});
