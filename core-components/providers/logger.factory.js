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