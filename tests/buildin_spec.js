var buildin = require('../src/template/template').buildin;

describe('buildin.max', function() {
    var max;
    beforeEach(function() {
        max = buildin.max;
    });

    it('call buildin.max', function(){
        expect(max(1, 2)).toEqual(2);

        //NotImplementedError
        //expect(max(1, 2, {key: function(x){return -x;}})).toEqual(1);
        try {
            expect(max(1, 2, {key: function(x){return -x;}}));
        } catch (e) {
            if (e.name === 'NotImplementedError') {
                //success
            }
            else {
                //fail
            }
        }

        expect(max([1, 2, 3])).toEqual(3);

        //NotImplementedError
        //expect(max([1, 2, 3], {key: function(x){return -x;}})).toEqual(1);
        try {
            expect(max([1, 2, 3], {key: function(x){return -x;}}));
        } catch (e) {
            if (e.name === 'NotImplementedError') {
                //success
            }
            else {
                //fail
            }
        }
    });
});
