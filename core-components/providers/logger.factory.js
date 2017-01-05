﻿mailman.factory('logger', ['$mdToast', function ($mdToast) {

        toast: {
            success: function (message) {
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('success-toast'));
                console.log(message);
            },
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('error-toast'));
                    console.log(error);
                }
            },
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right').theme('warning-toast'));
                console.log(message);
            },
                $mdToast.show($mdToast.simple().textContent(message).position('bottom right'));
                console.log(message);
            }
        }
    };
}]);