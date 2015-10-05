var Relooper = require('./build/relooper');

function generateFibonacciFn() {
  Relooper.init();
  var b1 = Relooper.addBlock("// setup");
  Relooper.setBlockCode(b1, "var a = 1, b = 0, i = 1;");
  var b2 = Relooper.addBlock("// check if we found n's number");
  var b3 = Relooper.addBlock("// iterate");
  Relooper.setBlockCode(b3, "var t = a + b;\nb = a;\na = t;\ni++;");
  var b4 = Relooper.addBlock("// return result");
  Relooper.setBlockCode(b4, "return a;");

  Relooper.addBranch(b1, b2);
  Relooper.addBranch(b2, b3, "i < n");
  Relooper.addBranch(b2, b4);
  Relooper.addBranch(b3, b2);

  var s = Relooper.render(b1);
  Relooper.cleanup();

  return s;
}

// Generate a function
var code = generateFibonacciFn();
console.log('Code: %s', code);
var fn = new Function("n", "var label;\n" + code);

// Running some tests
for (var i = 1; i < 10; i++) {
  console.log("%s = %s" , i, fn(i));
}
