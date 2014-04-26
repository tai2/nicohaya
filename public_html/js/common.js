// Function.prototype.bindが実装されていないブラウザ対策
// 参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis? this: oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

(function() {
	var Nico_SearchSubmitController = (function() {
		var searchSubmit = function(type, text) {
			if(!type || !text) return;
			location.href = Nico_getBaseUrl() + type + '/' + encodeURIComponent(text);
		};
		
		return {
			'initialize':function() {
				var search_button_list = jQuery('.jsSearchButton');
				var hash = {};
				
				search_button_list.each(function(index, element) {
					var input_selector = '#' + jQuery(element).data('searchInputId');
					var $input = jQuery(input_selector);
					
					jQuery(element).click(function() {
						var type = jQuery(element).data('searchType');
						var text = $input.val();
						searchSubmit(type, text);
					});
					
					if (!hash[input_selector]) {
						hash[input_selector] = true;

						$input.keydown(function(event) {
							if (event.keyCode === 13) {
								searchSubmit('search', $input.val());
							}
						})
					}
				});
			}
		}
	})();

	$(function() {
		Nico_SearchSubmitController.initialize();
	});
})();

var Nico_getBaseUrl = function() {
	var base_url_dom, base_url = '/';
	base_url_dom = document.getElementById('jsBaseUrl');
	if (base_url_dom) {
		base_url = base_url_dom.value;
	}

	return base_url;
};