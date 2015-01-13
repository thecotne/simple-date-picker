global.$ = global.jQuery = require('jquery')(require("jsdom").jsdom().parentWindow);

require('../simple-date-picker');

describe("plugin", function() {
	it("does not explode", function() {
		expect($('<div />').simpleDatePicker).not.toThrow();
	});
});
