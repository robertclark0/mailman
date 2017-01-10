var mailman = angular.module('mailman', [
    'ngMaterial',
    'angular-loading-bar',
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'angularCSS'
]);
mailman.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        //  Module
        //  Platform Home
        .state("Home", {
            url: "/home",
            templateUrl: "core-components/home/templates/view.html",
            controller: "Home"
            //css: "assets/css/dist.Home.css", //added through angular css module and gulp 
        });
});

mailman.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('amber')
      .accentPalette('orange');
    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('error-toast');
    $mdThemingProvider.theme('warning-toast');
});
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

            //resent received window
            $scope.receivedObject.value = {};

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
mailman.directive('ngJsoneditor', ['$timeout', function ($timeout) {
    var defaults = {};

    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: { 'options': '=', 'ngJsoneditor': '=', 'preferText': '=' },
        link: function ($scope, element, attrs, ngModel) {
            var debounceTo, debounceFrom;
            var editor;
            var internalTrigger = false;

            if (!angular.isDefined(window.JSONEditor)) {
                throw new Error("Please add the jsoneditor.js script first!");
            }

            function _createEditor(options) {
                var settings = angular.extend({}, defaults, options);
                var theOptions = angular.extend({}, settings, {
                    change: function () {
                        if (typeof debounceTo !== 'undefined') {
                            $timeout.cancel(debounceTo);
                        }

                        debounceTo = $timeout(function () {
                            if (editor) {
                                internalTrigger = true;
                                var error = undefined;
                                try {
                                    ngModel.$setViewValue($scope.preferText === true ? editor.getText() : editor.get());
                                } catch (err) {
                                    error = err;
                                }

                                if (settings && settings.hasOwnProperty('change')) {
                                    settings.change(error);
                                }
                            }
                        }, settings.timeout || 100);
                    }
                });

                element.html('');

                var instance = new JSONEditor(element[0], theOptions);

                if ($scope.ngJsoneditor instanceof Function) {
                    $timeout(function () { $scope.ngJsoneditor(instance); });
                }

                return instance;
            }

            $scope.$watch('options', function (newValue, oldValue) {
                for (var k in newValue) {
                    if (newValue.hasOwnProperty(k)) {
                        var v = newValue[k];

                        if (newValue[k] !== oldValue[k]) {
                            if (k === 'mode') {
                                editor.setMode(v);
                            } else if (k === 'name') {
                                editor.setName(v);
                            } else { //other settings cannot be changed without re-creating the JsonEditor
                                editor = _createEditor(newValue);
                                $scope.updateJsonEditor();
                                return;
                            }
                        }
                    }
                }
            }, true);

            $scope.$on('$destroy', function () {
                //remove jsoneditor?
            });

            $scope.updateJsonEditor = function (newValue) {
                if (internalTrigger) {
                    //ignore if called by $setViewValue (after debounceTo)
                    internalTrigger = false;
                    return;
                }

                if (typeof debounceFrom !== 'undefined') {
                    $timeout.cancel(debounceFrom);
                }

                debounceFrom = $timeout(function () {
                    if (($scope.preferText === true) && !angular.isObject(ngModel.$viewValue)) {
                        editor.setText(ngModel.$viewValue || '{}');
                    } else {
                        editor.set(ngModel.$viewValue || {});
                    }
                }, $scope.options.timeout || 100);
            };

            editor = _createEditor($scope.options);

            if ($scope.options.hasOwnProperty('expanded')) {
                $timeout($scope.options.expanded ? function () { editor.expandAll() } : function () { editor.collapseAll() }, ($scope.options.timeout || 100) + 100);
            }

            ngModel.$render = $scope.updateJsonEditor;
            $scope.$watch(function () { return ngModel.$modelValue; }, $scope.updateJsonEditor, true); //if someone changes ng-model from outside
        }
    };
}]);
mailman.factory('logger', ['$mdToast', function ($mdToast) {
    var logger = {
        toast: {
            success: function (message) {
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('success-toast'));
                console.log(message);
            },            error: function (message, error) {
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('error-toast'));                if (error) {
                    console.log(error);
                }
            },            warning: function (message) {
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('warning-toast'));
                console.log(message);
            },            primary: function (message) {
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right'));
                console.log(message);
            }
        }
    };    return logger;
}]);