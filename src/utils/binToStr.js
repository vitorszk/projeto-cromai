"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binToStr = void 0;
var binToStr = function (sequence) {
    var text = '';
    for (var i = 0; i < sequence.length; i += 8) {
        text += String.fromCharCode(parseInt(sequence.substring(i, i + 8), 2));
    }
    return text;
};
exports.binToStr = binToStr;
