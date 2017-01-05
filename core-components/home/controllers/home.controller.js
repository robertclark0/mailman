mailman.controller('Home', ['$scope', function ($scope) {

    $scope.api = { text: null };

    $scope.shortcut = function (value) {
        $scope.api.text = value;
    };
	
}]);