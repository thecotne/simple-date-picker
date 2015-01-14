/*global jQuery:false */
(function ($) {
	function Plugin(element, options) {
		this.wrapper = $(element);
		this.opts = $.extend({
			maxAge: 120,
			minAge: 1,
			year: (new Date()).getFullYear()
		}, options);
		this.init();
	}
	Plugin.prototype.init = function () {
		this.date = $(this.wrapper).find('[date]');
		this.year = $(this.wrapper).find('[year]');
		this.month = $(this.wrapper).find('[month]');
		this.day = $(this.wrapper).find('[day]');
		this.populateYearOptions();
		this.year.on('change', $.proxy(this.change, this));
		this.month.on('change', $.proxy(this.change, this));
		this.day.on('change', $.proxy(this.change, this));
	};
	Plugin.prototype.parseFromDateInput = function () {
		var valArr = this.date.val().split('-');
		if (valArr.length == 3) {
			valArr = $.map(valArr, function (val) {
				val = parseInt(val);
				return val > 0 ? val : -1;
			});
		} else {
			valArr = [-1, -1, -1];
			this.date.val('');
		}
		this.year.val(valArr[0]);
		this.year.val(valArr[1]);
		this.year.val(valArr[2]);
	};
	Plugin.prototype.change = function () {
		if (parseInt(this.year.val()) > 0) {
			this.month.removeAttr('disabled');
		} else {
			this.month.val(-1);
			this.month.attr('disabled', 'disabled');
		}
		if (parseInt(this.month.val()) > 0) {
			this.day.removeAttr('disabled');
			if (this.day.val() == -1) {
				this.populateDayOptions();
			}
		} else {
			this.day.val(-1);
			this.day.attr('disabled', 'disabled');
		}
		if (parseInt(this.day.val()) > 0) {
			this.date.val(this.formatedDate());
		} else {
			this.date.val('');
		}
	};
	Plugin.prototype.formatedDate = function () {
		return this.pad(this.year.val(), 4) + '-' + this.pad(this.month.val(), 2) + '-' + this.pad(this.day.val(), 2);
	};
	Plugin.prototype.populateDayOptions = function () {
		var days = this.daysInMonth(this.year.val(), this.month.val());
		this.day.find('option:not([value="-1"])').remove();
		$(this.day).append($.map(this.arrayRange(days), function (val) {
			return $('<option />').val(val).text(val);
		}));
	};
	Plugin.prototype.populateYearOptions = function () {
		var from = this.opts.year - this.opts.minAge;
		var to = from - this.opts.maxAge;
		$(this.year).append($.map(this.arrayRange(to, from).reverse(), function (val) {
			return $('<option />').val(val).text(val);
		}));
	};
	Plugin.prototype.arrayRange = function (start, edge, step) {
		if (arguments.length == 1) {
			edge = start;
			start = 0;
		}
		edge = edge || 0;
		step = step || 1;
		for (var ret = []; (edge - start) * step > 0; start += step) {
			ret.push(start);
		}
		return ret;
	};
	Plugin.prototype.daysInMonth = function (year, month) {
		return new Date(year, month, 0).getDate();
	};
	Plugin.prototype.pad = function (num, size) {
		var s = '000000000' + num;
		return s.substr(s.length - size);
	};
	$.fn.simpleDatePicker = function (options) {
		return $(this).each(function () {
			$.data(this, 'simpleDatePicker', new Plugin(this, options));
		});
	};
})(jQuery);
