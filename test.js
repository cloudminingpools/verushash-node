var reverseBuffer = function (buff) {
    var reversed = Buffer.alloc(buff.length);
    for (var i = buff.length - 1; i >= 0; i--)
        reversed[buff.length - i - 1] = buff[i];
    return reversed;
};
var reverseHex = function (hex) {
    return reverseBuffer(Buffer.from(hex, 'hex')).toString('hex');
};

var vh = require('bindings')('verushash.node');

var output = vh.hash(Buffer.from('Test1234','utf8'));
console.log('-- vh.hash(Buffer.from("Test1234","utf8")) --');
console.log('Output', reverseHex(output.toString('hex')), '\n');

console.log('-- vh.init().update(Buffer.from("Test","utf8")).update(Buffer.from("123","utf8")).update(Buffer.from("4","utf8")).digest(); --');
output = vh.init().update(Buffer.from('Test','utf8')).update(Buffer.from('123','utf8')).update(Buffer.from('4','utf8')).digest();
console.log('Output', reverseHex(output.toString('hex')), '\n');

output = vh.hash(Buffer.from('Test','utf8'));
console.log('-- vh.hash(Buffer.from("Test","utf8")) --');
console.log('Output', reverseHex(output.toString('hex')), '\n');

console.log('-- vh.reset().update(Buffer.from("Test","utf8")).digest() --');
output = vh.reset().update(Buffer.from('Test','utf8')).digest();
console.log('Output', reverseHex(output.toString('hex')), '\n');

console.log('-- vh.reset().update(Buffer.from("Test1234","utf8")).digest() --');
output = vh.reset().update(Buffer.from('Test1234','utf8')).digest();
console.log('Output', reverseHex(output.toString('hex')), '\n');

// benchmark
var toHash = 1000000;
var dateNow = Date.now();
for (var i=0; i < toHash; i++) {
    vh.reset().update(Buffer.from('Test1234','utf8')).digest();
}
console.log("Benchmark "+toHash.toString()+" Hashes took: "+(Date.now()-dateNow)+"msec");
