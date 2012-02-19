var escape = require('../src/template/template').escape;

describe('escape.xhtml_escape', function() {
    it('call escape.xhtml_escape', function(){
        var tests = [
            [["<foo>"], "&lt;foo&gt;"],
            [["<foo>"], "&lt;foo&gt;"],
            [["<>&\""], "&lt;&gt;&amp;&quot;"],
            [["&amp;"], "&amp;amp;"]
        ];

        var i = 0;
        var length = tests.length;
        for (; i < length; ++i) {
            var args = tests[i][0];
            var expectation = tests[i][1];
            var result = escape.xhtml_escape.apply(this, args);
            expect(result).toEqual(expectation);
        }
    });
});
