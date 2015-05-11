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
				ready : true,
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
						if (!sld.ready)return;
						sld.currentIndex--;
						if (sld.currentIndex <= 0){
							sld.currentIndex = sld.totalPages;
						}
						sld.refresh();
					});
					sld.nextBtn.on('click', function (){
						if (!sld.ready)return;
						sld.currentIndex++;
						if (sld.currentIndex > sld.totalPages){
							sld.currentIndex = 1;
						}
						sld.refresh();
					});

					opts.autoPlay && sld.autoPlay();
				},
				autoPlay : function (){
					var sld = this;
					sld.timer = setInterval(function (){
						sld.nextBtn.trigger('click');
					}, opts.interval);

					movedItem.on('mouseover', function (){
						clearInterval(sld.timer);
					}).on('mouseout', function (){
						sld.timer = setInterval(function (){
							sld.nextBtn.trigger('click');
						}, opts.interval);
					});
				},
				stop : function (){
					var sld = this;
					clearInterval(sld.timer);
					sld.timer = null;
				},
				refresh : function (){
					var sld = this;
					var target = -(sld.currentIndex-1) * sld.width;
					sld.ready = false;
					movedItem.animate({
						left : target + 'px'
					}, 2000, 'swing', function (){
						sld.ready = true;
					});
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
		autoPlay 	   : 1,
		interval 	   : 3000
	};
})(jQuery);