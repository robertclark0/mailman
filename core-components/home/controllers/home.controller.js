mailman.controller('Home', ['$scope', '$resource', 'logger', function ($scope, $resource, logger) {

    $scope.api = { text: null };
    $scope.protocol = { type: 'get' };

    $scope.shortcut = function (value) {
        $scope.api.text = value;
    };

    $scope.sentObject = { value: {}};
    $scope.receivedObject = { value: {}};

    $scope.options = {
        sent: { mode: 'tree' },
        received: { mode: 'tree' }
    };

    $scope.go = function () {

        if ($scope.api.text) {
            var resource = $resource($scope.api.text);

            switch ($scope.protocol.type) {
                case 'get':

                    try {
                        resource.get($scope.sentObject.value, function (response, header) {
                            //good code
                            console.log(response);
                            console.log(header());

                        }, function (response) {
                            //bad code
                            console.log(response);

                        }).$promise.then(function (response) {
                            //promise
                            console.log(response);
                            $scope.options.received.mode = 'code';
                            $scope.receivedObject.value = response;
                        });
                    }
                    catch (e) {
                        logger.toast.error("Bad query", e);
                    }


                    break;
                case 'post':

                    try{
                        resource.save($scope.sentObject.value, function (response, header) {
                            //good code
                            console.log(response);
                            console.log(header());

                        }, function (response) {
                            //bad code
                            console.log(response);

                        }).$promise.then(function (response) {
                            //promise
                            console.log(response);
                            $scope.options.received.mode = 'code';
                            $scope.receivedObject.value = response;
                        });
                    }
                    catch (e) {
                        logger.toast.error("Bad query", e);
                    }

                    break;
            }
        }
        else {
            logger.toast.warning("You must enter an api endpoint!");
        }


    };

}]);