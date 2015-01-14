global.$ = global.jQuery = require('jquery')(require("jsdom").jsdom().parentWindow);

require('../simple-date-picker');

describe("plugin", function() {
	it("does not explode", function() {
		expect($('<div />').simpleDatePicker).not.toThrow();
	});
});
describe("method pad", function() {
	var pad = $('<div />').simpleDatePicker().data('simpleDatePicker').pad;
	it("does not explode", function() {
		expect(pad).not.toThrow();
	});
	it("3 with length of 3 to be 003", function() {
		expect(pad(3,3)).toBe('003');
	});
	it("133 with length of 3 to be 133", function() {
		expect(pad(133,3)).toBe('133');
	});
	it("1 with length of 2 to be 01", function() {
		expect(pad(1,2)).toBe('01');
	});
	it("11 with length of 5 to be 00011", function() {
		expect(pad(11,5)).toBe('00011');
	});
});
