"use strict";

require("babel-core/register");
require("babel-polyfill");

var g = regeneratorRuntime.mark(function g() {
    var res1;
    return regeneratorRuntime.wrap(function g$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return '1';

                case 2:
                    res1 = _context.sent;

                    console.log(res1);

                case 4:
                case "end":
                    return _context.stop();
            }
        }
    }, g, this);
});
var i = g();
i.next();
i.next('aaa', 'ddf', '3434', 4);
