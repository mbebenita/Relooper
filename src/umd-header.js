(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.Relooper = {}));
  }
}(this, function (Module) {
var RELOOPER_BUFFER_SIZE = 1024 * 64;


