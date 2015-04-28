(function ($){
	function log (k, v) {
		if (window.console && console.log) {
			v ? console.log(k, v) : console.log(k);
		}
	}
	$.fn.slidable = function (options){
		var opts = $.extend({}, $.fn.defaults, options);
		var context = $(opts.slider);
		var movedItem = context.find(opts.movedItemClass);
		var items = movedItem.children();
		var itemList  = [];
		this.each(function (i, cont){
			var Slider = {
				prevBtn : null,
				nextBtn : null,
				width   : 480,
				height  : 120,
				timer   : null,
				currentIndex : 1, 
				totalPages : 1,
				init : function (){
					var sld = this;
					sld.prevBtn = $(opts.previousButton);
					sld.nextBtn = $(opts.nextButton);
					sld.width = movedItem.width();
					sld.height = movedItem.height();

					$.each(items, function (){
						itemList.push(this);
					})

					sld.totalPages = Math.ceil(itemList.length / opts.itemsPerPage);
					this.bindEvent();
				}, 
				bindEvent : function (){
					var sld = this;
					sld.prevBtn.on('click', function (){
						sld.currentIndex--;
						if (sld.currentIndex <= 0){
							sld.currentIndex = sld.totalPages;
						}
						sld.refresh();
					});
					sld.nextBtn.on('click', function (){
						sld.currentIndex++;
						if (sld.currentIndex > sld.totalPages){
							sld.currentIndex = 1;
						}
						sld.refresh();
					});

					if (opts.autoPlay) {
						sld.autoPlay();
					}
				},
				autoPlay : function (){
					var sld = this;
					sld.timer = setInterval(function (){
						sld.nextBtn.trigger('click');
					}, opts.interval);
				},
				stop : function (){
					var sld = this;
					clearInterval(sld.timer);
					sld.timer = null;
				},
				refresh : function (){
					var sld = this;
					var target = -(sld.currentIndex-1) * sld.width;
					movedItem.animate({
						left : target + 'px'
					}, 1000, 'swing');
				}
			};
			Slider.init();
		});
		return this;
	};

	$.fn.defaults = {
		slider         : '#slider',
		movedItemClass : '.list',
		previousButton : '.prev',
		nextButton 	   : '.next',
		itemsPerPage   : 5,
		autoPlay 	   : true,
		interval 	   : 3000
	};
})(jQuery);