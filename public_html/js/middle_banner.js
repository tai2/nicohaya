var Nico_MiddleBanner = (function() {
	var MiddleBannerView = {
		'getMiddleBannerZoneId': function() {
			return parseInt(jQuery('#jsMiddleBannerZoneId').val(), 10);
		}
	};
	
	var MiddleBannerController = (function() {
		var is_initialized = false,
			middle_banner_zone_id = 0,
			preinit_request_queue = [];
		return {
			'initialize': function() {
				var i = 0, l = preinit_request_queue.length;
				middle_banner_zone_id = MiddleBannerView.getMiddleBannerZoneId();
				is_initialized = true;
				for (; i < l; i++) {
					MiddleBannerController.loadMiddleBanner(preinit_request_queue[i]);
				}
				preinit_request_queue.length = 0;
			},
			'loadMiddleBanner': function(element_id) {
				if (!is_initialized) {
					// initialize実行前に呼ばれたらキューにためる
					preinit_request_queue.push(element_id);
					return;
				}
				if (middle_banner_zone_id) {
					new adsSimple.Advertisement({
						'zone': middle_banner_zone_id
					}).set(element_id);
				}
			}
		};
	})();
	
	return MiddleBannerController;
})();

jQuery(function () {
	Nico_MiddleBanner.initialize();
});
