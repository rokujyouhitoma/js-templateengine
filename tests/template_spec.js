var Template = require('../src/template/template').Template;
//var Template = require('../build/compiled').Template; //compiled code
var DictLoader = require('../src/template/template').DictLoader;

describe('Template', function() {

    //Be based on template_test.py

    it('test_simple', function() {
        var template = new Template('Hello {{ name}}!');
        expect(template.generate({name:'Ben'})).toEqual('Hello Ben!');
    });

    it('test_expressions', function() {
        var template = new Template('2 + 2 = {{ 2 + 2 }}');
        expect(template.generate()).toEqual('2 + 2 = 4');
    });

    it('test_expressions', function() {
        var template = new Template('2 + 2 = {{ 2 * 2 }}');
        expect(template.generate()).toEqual('2 + 2 = 4');
    });

    it('test_expressions', function() {
        var template = new Template('2 + 2 = {{ 2 / 2 }}');
        expect(template.generate()).toEqual('2 + 2 = 1');
    });

    it('test_expressions', function() {
        var template = new Template('2 + 2 = {{ 2 / 2 + 2 }}');
        expect(template.generate()).toEqual('2 + 2 = 3');
    });

    it('test_include', function() {
        var loader = new DictLoader({
            "index.html": '{% include "header.html" %}\nbody text',
            "header.html": "header text"
        });
        expect(loader.load('index.html').generate()
              ).toEqual('header text\nbody text');
    });

    it('test_extends', function() {
        var loader = new DictLoader({
            "base.html": '<title>{% block title %}default title{% end %}</title>\n' +
                '<body>{% block body %}default body{% end %}</body>',
            "page.html": '{% extends "base.html" %}' +
                '{% block title %}page title{% end %}' +
                '{% block body %}page body{% end %}'
        });
        expect(loader.load('page.html').generate()
              ).toEqual("<title>page title</title>\n<body>page body</body>");
    });

    // original test codes.
    it('relative_load', function() {
        var loader = new DictLoader({
            "a/1.html": "{% include 'a/2.html' %}",
            "a/2.html": "{% include 'b/3.html' %}",
            "b/3.html": "ok"
        });
        expect(loader.load("a/1.html").generate()
              ).toEqual("ok");
    });

    it('test_relative_load', function() {
        var loader = new DictLoader({
            "a/1.html": "{% include 'a/2.html' %}",
            "a/2.html": "{% include 'b/3.html' %}",
            "b/3.html": "ok"
        });
        expect(loader.load("a/1.html").generate()
              ).toEqual("ok");
    });

    it('test_escaping', function() {
        var isParseError = function(template) {
            try {
                new Template(template);
            } catch (x) {
                if (x.name === 'ParseError') {
                    return true;
                }
            }
            return false;
        };

        expect(isParseError('{{')).toBeTruthy();
        expect(isParseError('{%')).toBeTruthy();
        expect(new Template('{{!').generate()).toEqual('{{');
        expect(new Template('{%!').generate()).toEqual('{%');

        //TODO: xxx
        //expect(new Template("{{ 'expr' }} {{ !jquery expr }}").generate()
        //      ).toEqual("expr {{jquery expr}}");
    });

    it('test_unicode_template', function() {
        //TODO: xxx
    });

    it('test_unicode_literal_expression', function() {
        //TODO: xxx
    });

    it('test_custom_namespace', function() {
        //TODO: xxx
    });

    it('test_apply', function() {
        //TODO: xxx
    });

    it('test_if', function() {
        var template = new Template("{% if (x > 4) %}yes{% else %}no{% end %}");
        expect(template.generate({x:5})).toEqual("yes");
        expect(template.generate({x:3})).toEqual("no");
    });

    it('test_comment', function() {
        //TODO: xxx
    });

    /*
     * my test code.
     */

    it('test_variable', function() {
        var loader = new DictLoader({
            "base.html": ""
        });
    });

    it('test_...?', function() {
        var loader = new DictLoader({
            "base.html": ''
                + '<html>'
                + '<head>'
                + '<title>{% block title %}Default title{% end %}</title>'
                + '</head>'
                + '<body>'
                + '<ul>'
                + '{% for (key in students) %}'
                + '{% block student %}'
                + '<li>{{ escape(students[key].name) }}</li>'
                + '{% end %}'
                + '{% end %}'
                + '</ul>'
                + '</body>'
                + '</html>'
                + '',
            "bold.html": ''
                + '{% extends "base.html" %}'
                + '{% block title %}A bolder title{% end %}'
                + '{% block student %}'
                + '<li><span style="bold">{{ escape(students[key].name) }}</span></li>'
                + '{% end %}'
        });

        var students = [{name: 'Ben'}, {name: 'Armin'}];

        expect(loader.load('bold.html').generate({students:students})
              ).toEqual(''
                + '<html>'
                + '<head>'
                + '<title>A bolder title</title>'
                + '</head>'
                + '<body>'
                + '<ul>'
                + '<li><span style="bold">Ben</span></li>'
                + '<li><span style="bold">Armin</span></li>'
                + '</ul>'
                + '</body>'
                + '</html>'
                + '');
    });

    it('test_for and duble quote', function() {
        var loader = new DictLoader({
            "base.html": ''
                + '{% for (key in students) %}'
                + '{% block student %}'
                + '<bold style="">{{ students[key].name }}'
                + '{% end %}'
                + '{% end %}'
                + '',
            "bold.html": ''
                + '{% extends "base.html" %}'
                + '{% block student %}'
                + '  <bold>{{ students[key].name }}</bold>'
                + '{% end %}'
        });

        var students = [{name: 'Ben'}, {name: 'Armin'}];

        expect(loader.load('bold.html').generate({students:students})
              ).toEqual(''
                + ' <bold>Ben</bold>'
                + ' <bold>Armin</bold>'
                + '');
    });

    it('test_for', function() {
        var loader = new DictLoader({
            "base.html": ''
                + '{% for (key in students) %}'
                + '{% block student %}'
                + '{{ students[key].name }}'
                + '{% end %}'
                + '{% end %}'
                + '',
            "bold.html": ''
                + '{% extends "base.html" %}'
                + '{% block student %}'
                + '  <bold>{{ students[key].name }}</bold>'
                + '{% end %}'
        });

        var students = [{name: 'Ben'}, {name: 'Armin'}];

        expect(loader.load('bold.html').generate({students:students})
              ).toEqual(''
                + ' <bold>Ben</bold>'
                + ' <bold>Armin</bold>'
                + '');
    });

    it('test generate', function() {
        var template = new Template('{{ add(1, 2) }}');

        /**
         * @param {number} x .
         * @param {number} y .
         * @return {string} .
         */
        function add(x, y) {
            return String(x + y);
        }
        expect(template.generate({add:add})).toEqual('3');
    });

    it('Expression.', function() {
        var template = new Template('<html>{{ myvalue }}</html>');
        expect(template.generate({myvalue:'xxx'})).toEqual('<html>xxx</html>');
    });

    it('Block.', function() {
        var template = new Template('{% block title %}Default title{% end %}');
        expect(template.generate()).toEqual('Default title');
    });
});
