/*
 * @see pypy-1.7/lib-python/2.7/test/test_StringIO.py
 */
var StopIteration = require('../src/template/template').StopIteration;
var StringIO = require('../src/template/template').StringIO;

describe('TestGenericStringIO', function() {
  var _line = '';
  var _lines = '';
  var _fp;

  beforeEach(function(){
    _line = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!';
    for (var i = 0; i < 5; ++i) {
      _lines += _line + '\n';
    }
    _fp = new StringIO(_lines);
  });

  afterEach(function(){
    _line = '';
    _lines = '';
    _fp = null;
  });

  it('test_reads', function(){
    //expect(f.seek()).toThrow();
    expect(_fp.read(10)).toEqual(_line.slice(0, 10));
    expect(_fp.readline()).toEqual(_line.slice(10) + '\n');
    expect(_fp.readlines(60).length).toEqual(2);
    _fp.seek(0);
    expect(_fp.readline(-1)).toEqual(_line + '\n');
  });

  it('test_writes', function(){
    var f = new StringIO();
    //expect(f.seek()).toThrow();
    f.write(_line.slice(0, 6));
    f.seek(3);
    f.write(_line.slice(20, 26));
    f.write(_line[52]);
    expect(f.getvalue()).toEqual('abcuvwxyz!');
  });

  it('test_writelines', function(){
    var f = new StringIO();
    f.writelines([_line[0], _line[1], _line[2]]);
    f.seek(0);
    expect(f.getvalue()).toEqual('abc');
  });

  it('test_truncate', function(){
    var f = new StringIO();
    expect(f.closed).toBeFalsy();
    f.close();
    expect(f.closed).toBeTruthy();
    f = new StringIO('abc');
    expect(f.closed).toBeFalsy();
    f.close();
    expect(f.closed).toBeTruthy();
  });

  if('test_isatty', function(){
    var f = new StringIO();
    expect(f.isatty()).toBeFalsy();
    f.close();
  });

  it('test_iterator', function(){
    expect('__iter__' in _fp).toBeTruthy();
    expect('next' in _fp).toBeTruthy();
    var i = 0;
    var line;
    while (true) {
        try {
            line = _fp.next();
        } catch (e) {
            if (e instanceof StopIteration){
                break;
            }
        }
        i += 1;
    }
    expect(i).toEqual(5);
    _fp.close();
  });

});
