var w3App = angular.module("wwwApp", ['ngRoute']);
w3App.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/default-view.html'
        }).when('/:menuName', {
            templateUrl: 'templates/view-data.html',
            controller: 'viewDataController'
        })
        .otherwise({redirectTo: '/'});
}]);

w3App.controller("w3MainCtrl", function ($scope, $location) {
    $scope.searcher = function () {
        $scope.menuNames = [{name: "Top Pics"}, {name: "Food"}, {name: "Coffee"}, {name: "Shopping"}];
    }
    $scope.menuNames = [{name: "Top Pics"}, {name: "Food"}, {name: "Coffee"}, {name: "Shopping"}, {name: 'Bars'}];
    $scope.data = {
        model: null,
        availableOptions: [
            {id: '0', name: 'Search item'},
            {id: '1', name: 'Top Pics'},
            {id: '2', name: 'Food'},
            {id: '3', name: 'Coffee'},
            {id: '4', name: 'Shopping'}
        ]
    };

    $scope.update = function () {
        $scope.data.model = angular.element('#Search').val();
        if ($scope.data.model != "Search item" && $scope.data.model != '') {
            $location.path('/' + $scope.data.model);
        }
    }
});
