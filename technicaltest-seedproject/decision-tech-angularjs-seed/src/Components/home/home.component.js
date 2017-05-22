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

//component
angular.module('app').component('home', {
    template: `
    <header>
    <div class="container">
        <a href="/" id="logo"></a>
        <div id="menu" ng-click="$ctrl.toggleMenu()">
            <svg height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
        </div>
    </div>
</header>
<div class="container text-center main">
    <div id="filterContainer" class="text-left" ng-class="$ctrl.showMenu ? 'filterShow' : ''">
        <h2>Filter</h2>
        <ul>
            <li>
                <input type="checkbox" name="broadband" ng-model="$ctrl.filters.broadband" ng-change="filterChange('Broadband')" /> Broadband
            </li>
            <li>
                <input type="checkbox" name="tv" ng-model="$ctrl.filters.tv" ng-change="filterChange('TV')" /> TV
            </li>
            <li>
                <input type="checkbox" name="mobile" ng-model="$ctrl.filters.mobile" ng-change="filterChange('Mobile')" /> Mobile
            </li>
        </ul>
        <label>Speed</label>
        <select name="speed" ng-model="$ctrl.filters.speed">
                <option value="">Any</option>
                <option value="17">17MB</option>
                <option value="52">52MB</option>
                <option value="76">76MB</option>
            </select>
    </div>
    <div id="bodyContainer">
        <table>
            <thead>
                <tr>
                    <th>
                        About
                    </th>
                    <th>
                        Contract Length
                    </th>
                    <th>
                        Speed/Usage
                    </th>
                    <th>
                        Offer
                    </th>
                    <th>
                        TV
                    </th>
                    <th>
                        Mobile
                    </th>
                    <th>
                        Cost
                    </th>
                </tr>
            </thead>
            <tr ng-repeat="deal in $ctrl.deals | broadbandFilter:$ctrl.filters |tvFilter:$ctrl.filters |mobileFilter:$ctrl.filters |speedFilter:$ctrl.filters">
                <td>{{deal.title}}</td>
                <td>{{deal.contractLength}} Months</td>
                <td>{{deal.speed.label}}MB<br>{{deal.usage.label}}</td>
                <td><img ng-src="{{deal.offer.smallLogo}}" alt="{{deal.offer.title}}" /> </td>
                <td>
                    <div ng-show="!deal.popularChannels || deal.popularChannels.length == 0">n/a</div>
                    <div ng-repeat="channel in deal.popularChannels">
                        <img ng-src="{{channel.logo}}" alt="{{channel.name}}" />
                    </div>
                </td>
                <td>
                    <div ng-show="!deal.mobile">n/a</div>
                    <div ng-show="deal.mobile">
                        <p>Data: {{deal.mobile.data.label}}</p>
                        <p>Minutes: {{deal.mobile.minutes.label}}</p>
                        <p>Texts: {{deal.mobile.texts.label}}</p>
                        <p>Connection: {{deal.mobile.connectionType.label}}</p>
                    </div>
                </td>
                <td>
                    £{{deal.prices[0].totalContractCost}}
                </td>
            </tr>
        </table>
    </div>
</div>
    `,
    controller: homeComponentController
})

function homeComponentController(homeService) {
    this.deals = [];
    this.filters = {
        broadband: false,
        tv: false,
        mobile: false,
        speed: ""
    };
    homeService.getDeals().then(deals => this.deals = deals);

    this.showMenu = true;
    this.toggleMenu = function() {
        this.showMenu = !this.showMenu;
    };
}
homeComponentController.$inject = ['home.service']