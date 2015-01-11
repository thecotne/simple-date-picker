(function($) {
	$.fn.simpleDatePicker = function(opts) {
		var simpleDatePicker = {
			wrapper: null,
			init: function(wrapper, opts){
				this.wrapper = wrapper;
				this.opts = $.extend({
					maxAge: 120,
					minAge: 1,
					year: (new Date()).getFullYear()
				},opts);

				this.date = $(this.wrapper).find('[date]');
				this.year = $(this.wrapper).find('[year]');
				this.month = $(this.wrapper).find('[month]');
				this.day = $(this.wrapper).find('[day]');

				this.populateYearOptions();

				this.year.on("change", $.proxy(this.change, this));
				this.month.on("change", $.proxy(this.change, this));
				this.day.on("change", $.proxy(this.change, this));
			},
			parseFromDateInput: function(){
				var valArr = date.val().split('-');
				if (valArr.length == 3) {
					valArr = $.map(valArr, function(val, i){
						var val = parseInt(val);
						return val > 0 ? val : -1;
					});
				} else {
					valArr = [-1,-1,-1];
					date.val('');
				}
				this.year.val(valArr[0]);
				this.year.val(valArr[1]);
				this.year.val(valArr[2]);
			},
			change: function(e){
				if (parseInt(this.year.val()) > 0) {
					this.month.removeAttr("disabled");
				}else{
					this.month.val(-1);
					this.month.attr("disabled","disabled");
				}
				if (parseInt(this.month.val()) > 0) {
					this.day.removeAttr("disabled");
					if (this.day.val() == -1) {
						this.populateDayOptions();
					};
				}else{
					this.day.val(-1);
					this.day.attr("disabled","disabled");
				}
				// debugger;
				if (parseInt(this.day.val()) > 0) {
					this.date.val(this.formatedDate());
				} else {
					this.date.val('');
				}
			},
			formatedDate: function(){
				return ''+this.pad(this.year.val(), 4)
				'-'+this.pad(this.month.val(), 2)
				'-'+this.pad(this.day.val(), 2);
			},
			populateDayOptions: function(){
				var days = this.daysInMonth(this.year.val(), this.month.val());
				this.day.find('option:not([value="-1"])').remove();
				$(this.day).append($.map(this.arrayRange(days), function(val, i){
					return $('<option />').val(val).text(val);
				}));
			},
			populateYearOptions: function(){
				var from = this.opts.year - this.opts.minAge;
				var to = from - this.opts.maxAge;
				$(this.year).append($.map(this.arrayRange(to, from).reverse(), function(val, i){
					return $('<option />').val(val).text(val);
				}));
			},
			arrayRange: function (start, edge, step) {
			  // If only one number was passed in make it the edge and 0 the start.
			  if (arguments.length == 1) {
			    edge = start;
			    start = 0;
			  }

			  // Validate the edge and step numbers.
			  edge = edge || 0;
			  step = step || 1;

			  // Create the array of numbers, stopping befor the edge.
			  for (var ret = []; (edge - start) * step > 0; start += step) {
			    ret.push(start);
			  }
			  return ret;
			},
			daysInMonth: function (year,month) {
				return new Date(year, month, 0).getDate();
			},
			pad: function (num, size) {
				var s = "000000000" + num;
				return s.substr(s.length-size);
			}
		};
		if (this.length>1) {
			var objects = [];
			$(this).each(function(){
				var instance = Object.create(simpleDatePicker);
				instance.init(this,opts);
				objects.push(instance);
			});
			return objects;
		} else {
			var instance = Object.create(simpleDatePicker);
			instance.init(this,opts);
			return instance;
		}
	}
})(jQuery);
