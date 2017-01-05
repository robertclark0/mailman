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