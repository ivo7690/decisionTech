describe('<home/>', () => {
    var $componentController;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module(function($provide) {
        $provide.value('home.service', {
            getDeals: () => {
                return { then: (callback) => callback([{ name: 'x' }]) }
            }
        })
    }));


    beforeEach(angular.mock.inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    it('should expose a `hero` object', function() {

        const ctrl = $componentController('home', null, {});

        expect(ctrl.deals).toBeDefined();
        expect(ctrl.deals[0].title).toBe('Unlimited Broadband & Weekend Calls');
    });

});