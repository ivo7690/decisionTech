import angular from 'angular';

//service
angular.module('app').service('home.service', homeService)

function homeService($http) {
    return {
        getDeals: () => {
            return $http.get('/assets/deals.json').then(result => result.data.deals)
        }
    }
}

homeService.$inject = ['$http']

//filter
angular.module('app').filter('broadbandFilter', function() {
    return function(items, filters) {
        if (!filters.broadband && !filters.tv && !filters.mobile)
            return items;

        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (filters.broadband && item.productTypes.includes("Broadband"))
                filtered.push(item);
            if (!filters.broadband && !item.productTypes.includes("Broadband"))
                filtered.push(item);

        }
        return filtered;
    };
});
angular.module('app').filter('tvFilter', function() {
    return function(items, filters) {
        if (!filters.broadband && !filters.tv && !filters.mobile)
            return items;

        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (filters.tv && item.productTypes.includes("TV"))
                filtered.push(item);
            if (!filters.tv && !item.productTypes.includes("TV"))
                filtered.push(item);

        }
        return filtered;
    };
});

angular.module('app').filter('mobileFilter', function() {
    return function(items, filters) {
        if (!filters.broadband && !filters.tv && !filters.mobile)
            return items;

        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (filters.mobile && item.productTypes.includes("Mobile"))
                filtered.push(item);
            if (!filters.mobile && !item.productTypes.includes("Mobile"))
                filtered.push(item);

        }
        return filtered;
    };
});

angular.module('app').filter('speedFilter', function() {
    return function(items, filters) {
        var filtered = [];

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (filters.speed != "") {

                if (item.speed.label == filters.speed) {
                    filtered.push(item);
                }

            } else {
                filtered.push(item);
            }
        }
        return filtered;
    };
});


//controller
angular.module('app').controller('homeController', homeController);
homeController.$inject = [
    '$scope',
    '$controller',
    'home.service'
];

function homeController($scope, $controller, homeService) {
    $scope.deals = [];
    homeService.getDeals().then(
        deals => $scope.deals = deals
    );
    $scope.filters = {
        broadband: false,
        tv: false,
        mobile: false,
        speed: ""
    };
}