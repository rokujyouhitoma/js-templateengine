var string = require('../src/template/template').string;

describe('string.contains', function() {
    //TODO: xxx
});

describe('string.count', function() {
    it('call string.count', function(){
        //TODO: xxx

        //Be based on /2.7/test/string_test.py
        var tests = [
            [3, 'aaa', 'a'],
            [0, 'aaa', 'b'],
            [3, 'aaa', 'a'],
            [0, 'aaa', 'b'],
            [3, 'aaa', 'a'],
            [0, 'aaa', 'b'],
            [0, 'aaa', 'b'],
            [2, 'aaa', 'a', 1],
            [0, 'aaa', 'a', 10]//,
            //[1, 'aaa', 'a', -1],
            //[3, 'aaa', 'a', -10],
            //[1, 'aaa', 'a', 0, 1],
            //[3, 'aaa', 'a', 0, 10],
            //[2, 'aaa', 'a', 0, -1],
            //[0, 'aaa', 'a', 0, -10],
            //[3, 'aaa', '', 1],
            //[1, 'aaa', '', 3],
            //[0, 'aaa', '', 10],
            //[2, 'aaa', '', -1],
            //[4, 'aaa', '', -10]
        ];

        var i = 0;
        var length = length;
        for (; i < length; ++i) { 
            var estimate = tests[i][0];
            var args = Array.prototype.slice.call(tests[i], 1);
            var result = string.count.apply({}, args);
            expect(result).toEqual(estimate);
        }
    });
});

describe('string.endswith', function() {
    it('call', function(){
        expect(string.endswith('this is test', 'test')).toEqual(true);
        expect(string.endswith('this is test', 'this')).toEqual(false);
    });
});

describe('string.find', function() {
    it('call string.find', function(){
        var tests = [
            [['abc', 'a'], 0],
            [['abc', 'b'], 1],
            [['abc', 'c'], 2],
            [['abc', 'ab'], 0],
            [['abc', 'bc'], 1],
            [['abc', 'abc'], 0],
            [['abc', 'd'], -1],
            [['abc', 'a', 0], 0],
            [['abc', 'a', 1], -1],
            [['abc', 'b', 1], 1],
            [['abc', 'bc', 1], 1],
            [['abc', 'c', 1], 2],
            [['abc', 'd', 1], -1]
        ];

        var i = 0;
        var length = tests.length;
        for (; i < length; ++i) {
            var args = tests[i][0];
            var expectation = tests[i][1];
            var result = string.find.apply(this, args);
            expect(result).toEqual(expectation);
        }
    });
});

describe('string.strip', function() {
    //TODO: xxx
});

describe('string.startwith', function() {
    //TODO: xxx
});
