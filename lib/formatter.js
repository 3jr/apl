// Generated by CoffeeScript 1.4.0
var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./helpers'], function(helpers) {
  var BTM, BTMLFT, BTMRGT, ColouredRect, LFT, RGT, Rect, TOP, TOPLFT, TOPRGT, blue, borderColour, colourId, cyan, decode, encode, format, format0, functionColour, green, grey, hpad, isSimple, makeColour, numberColour, prod, purple, red, repeat, shapeOf, specialColour, stringColour, sum, vpad, yellow, _ref, _ref1;
  isSimple = helpers.isSimple, shapeOf = helpers.shapeOf, sum = helpers.sum, prod = helpers.prod, repeat = helpers.repeat;
  makeColour = process.stdout.isTTY ? function(code) {
    return function(s) {
      return "\x1b[1;" + code + "m" + s + "\x1b[m";
    };
  } : function() {
    return function(s) {
      return s;
    };
  };
  _ref = (function() {
    var _i, _results;
    _results = [];
    for (colourId = _i = 30; _i <= 36; colourId = ++_i) {
      _results.push(makeColour(colourId));
    }
    return _results;
  })(), grey = _ref[0], red = _ref[1], green = _ref[2], yellow = _ref[3], blue = _ref[4], purple = _ref[5], cyan = _ref[6];
  borderColour = grey;
  numberColour = cyan;
  stringColour = purple;
  functionColour = green;
  specialColour = red;
  _ref1 = "──││╭╮╰╯", TOP = _ref1[0], BTM = _ref1[1], LFT = _ref1[2], RGT = _ref1[3], TOPLFT = _ref1[4], TOPRGT = _ref1[5], BTMLFT = _ref1[6], BTMRGT = _ref1[7];
  Rect = function(width, height, strings) {
    return {
      width: width,
      height: height,
      strings: strings
    };
  };
  ColouredRect = function(s, colour) {
    return Rect(s.length, 1, [colour ? colour(s) : s]);
  };
  encode = function(a, x) {
    var m, r, _i, _len, _results;
    if (a.length === 0) {
      return [];
    }
    _results = [];
    for (_i = 0, _len = a.length; _i < _len; _i++) {
      m = a[_i];
      r = x % m;
      x = Math.floor(x / m);
      _results.push(r);
    }
    return _results;
  };
  decode = function(a, b) {
    var ai, i, r, _i, _len;
    r = 0;
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      ai = a[i];
      r = r * ai + b[i];
    }
    return r;
  };
  format = function(a) {
    return format0(a).strings.join('\n');
  };
  format0 = function(a) {
    var b, box, c, cb, colDimIndices, colDims, d, grid, h, i, j, m, mm, nCols, nRows, nsa, r, rb, rowDimIndices, rowDims, s, sa, strings, totalHeight, totalWidth, w, _i, _j, _k, _l, _len, _len1, _m, _n, _ref2;
    if (typeof a === 'undefined') {
      return ColouredRect('undefined', specialColour);
    } else if (a === null) {
      return ColouredRect('null', specialColour);
    } else if (typeof a === 'string') {
      return ColouredRect(a, stringColour);
    } else if (typeof a === 'number') {
      return ColouredRect(('' + a).replace(/-|Infinity/g, '¯'), numberColour);
    } else if (typeof a === 'function') {
      s = a.isPrefixOperator || a.isInfixOperator || a.isPostfixOperator ? 'operator' : 'function';
      if (a.aplName) {
        s += ' ' + a.aplName;
      }
      return ColouredRect(s, functionColour);
    } else if (isSimple(a)) {
      return ColouredRect('' + a);
    } else if (a.length === 0) {
      return Rect(3, 3, [borderColour(TOPLFT + TOP + TOPRGT), borderColour(LFT + ' ' + RGT), borderColour(BTMLFT + BTM + BTMRGT)]);
    } else {
      sa = shapeOf(a);
      nsa = sa.length;
      rowDimIndices = (function() {
        var _i, _ref2, _results;
        _results = [];
        for (i = _i = _ref2 = nsa - 2; _i >= 0; i = _i += -2) {
          _results.push(i);
        }
        return _results;
      })();
      colDimIndices = (function() {
        var _i, _ref2, _results;
        _results = [];
        for (i = _i = _ref2 = nsa - 1; _i >= 0; i = _i += -2) {
          _results.push(i);
        }
        return _results;
      })();
      rowDims = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = rowDimIndices.length; _i < _len; _i++) {
          d = rowDimIndices[_i];
          _results.push(sa[d]);
        }
        return _results;
      })();
      colDims = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = colDimIndices.length; _i < _len; _i++) {
          d = colDimIndices[_i];
          _results.push(sa[d]);
        }
        return _results;
      })();
      nRows = prod(rowDims);
      nCols = prod(colDims);
      h = (function() {
        var _i, _results;
        _results = [];
        for (_i = 0; 0 <= nRows ? _i < nRows : _i > nRows; 0 <= nRows ? _i++ : _i--) {
          _results.push(0);
        }
        return _results;
      })();
      w = (function() {
        var _i, _results;
        _results = [];
        for (_i = 0; 0 <= nCols ? _i < nCols : _i > nCols; 0 <= nCols ? _i++ : _i--) {
          _results.push(0);
        }
        return _results;
      })();
      grid = (function() {
        var _i, _results;
        _results = [];
        for (r = _i = 0; 0 <= nRows ? _i < nRows : _i > nRows; r = 0 <= nRows ? ++_i : --_i) {
          _results.push((function() {
            var _j, _k, _l, _len, _len1, _results1;
            _results1 = [];
            for (c = _j = 0; 0 <= nCols ? _j < nCols : _j > nCols; c = 0 <= nCols ? ++_j : --_j) {
              rb = encode(rowDims, r);
              cb = encode(colDims, c);
              b = (function() {
                var _k, _results2;
                _results2 = [];
                for (_k = 0; 0 <= nsa ? _k < nsa : _k > nsa; 0 <= nsa ? _k++ : _k--) {
                  _results2.push(0);
                }
                return _results2;
              })();
              for (j = _k = 0, _len = rowDimIndices.length; _k < _len; j = ++_k) {
                i = rowDimIndices[j];
                b[i] = rb[j];
              }
              for (j = _l = 0, _len1 = colDimIndices.length; _l < _len1; j = ++_l) {
                i = colDimIndices[j];
                b[i] = cb[j];
              }
              box = format0(a[decode(sa, b)]);
              h[r] = Math.max(h[r], box.height);
              w[c] = Math.max(w[c], box.width);
              _results1.push(box);
            }
            return _results1;
          })());
        }
        return _results;
      })();
      mm = 1;
      totalWidth = 2 + sum(w) - colDims.length + sum((function() {
        var _i, _ref2, _results;
        _results = [];
        for (i = _i = _ref2 = colDims.length - 1; _ref2 <= 0 ? _i <= 0 : _i >= 0; i = _ref2 <= 0 ? ++_i : --_i) {
          _results.push(mm *= colDims[i]);
        }
        return _results;
      })());
      totalHeight = 2 + sum(h);
      if (rowDims.length) {
        mm = 1;
        totalHeight += 1 - rowDims.length + sum((function() {
          var _i, _ref2, _results;
          _results = [];
          for (i = _i = _ref2 = rowDims.length - 1; _i >= 1; i = _i += -1) {
            _results.push(mm *= rowDims[i]);
          }
          return _results;
        })());
      }
      strings = [borderColour(TOPLFT + repeat(TOP, totalWidth - 2) + TOPRGT)];
      for (r = _i = 0; 0 <= nRows ? _i < nRows : _i > nRows; r = 0 <= nRows ? ++_i : --_i) {
        for (c = _j = 0; 0 <= nCols ? _j < nCols : _j > nCols; c = 0 <= nCols ? ++_j : --_j) {
          grid[r][c] = vpad(grid[r][c], h[r]);
          grid[r][c] = hpad(grid[r][c], w[c]);
        }
        if (r) {
          mm = 1;
          for (_k = 0, _len = rowDims.length; _k < _len; _k++) {
            m = rowDims[_k];
            if (r % (mm *= m)) {
              break;
            }
            strings.push(borderColour(LFT) + repeat(' ', totalWidth - 2) + borderColour(RGT));
          }
        }
        for (i = _l = 0, _ref2 = h[r]; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; i = 0 <= _ref2 ? ++_l : --_l) {
          s = '';
          for (c = _m = 0; 0 <= nCols ? _m < nCols : _m > nCols; c = 0 <= nCols ? ++_m : --_m) {
            if (c) {
              s += ' ';
              mm = 1;
              for (_n = 0, _len1 = colDims.length; _n < _len1; _n++) {
                m = colDims[_n];
                if (c % (mm *= m)) {
                  break;
                }
                s += ' ';
              }
            }
            s += grid[r][c].strings[i];
          }
          strings.push(borderColour(LFT) + s + borderColour(RGT));
        }
      }
      strings.push(borderColour(BTMLFT + repeat(BTM, totalWidth - 2) + BTMRGT));
      return Rect(totalWidth, totalHeight, strings);
    }
  };
  hpad = function(rect, width) {
    var line, padding;
    if (rect.width >= width) {
      return rect;
    } else {
      padding = repeat(' ', width - rect.width);
      return Rect(width, rect.height, (function() {
        var _i, _len, _ref2, _results;
        _ref2 = rect.strings;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          line = _ref2[_i];
          _results.push(line + padding);
        }
        return _results;
      })());
    }
  };
  vpad = function(rect, height) {
    var padding;
    if (rect.height >= height) {
      return rect;
    } else {
      padding = repeat(' ', rect.width);
      return Rect(rect.width, height, rect.strings.concat((function() {
        var _i, _ref2, _results;
        _results = [];
        for (_i = _ref2 = rect.height; _ref2 <= height ? _i < height : _i > height; _ref2 <= height ? _i++ : _i--) {
          _results.push(padding);
        }
        return _results;
      })()));
    }
  };
  return {
    format: format
  };
});