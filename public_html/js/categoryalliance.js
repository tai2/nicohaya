// jQuery 依存

window.Nico_CategoryAllianceController = (function () {
	var ads_base_url;
	
	var AdsApiModel = (function () {
		var path = 'api/OxBannerService/getAdvertisementsAndLogImpression.jsonp?callback=?';
		
		var fetchByZoneId = function (zone_id, callback) {
			jQuery.getJSON(
				ads_base_url + path,
				{
					'zone': zone_id
				},
				callback
			);
		};
		
		return {
			'fetchByZoneId' : fetchByZoneId
		};
	})();
	
	var AdsApiCallbackController = (function(){
		return {
			'fetchAdsListCallback' : function (response) {
				if (!response.data) {
					return ;
				}
				AdsAreaView.setAdsData(response.data);
			},
			'fetchTopAdCallback' : function (response) {
				if (!response.data || response.data.length !== 1) {
					return ;
				}
				AdsAreaView.setTopAd(response.data[0]);
			}
		};
	})();
	
	var AdsAreaView = (function () {
		var has_ads_list = false, has_top_ad = false, $area_dom, ads_area_list, top_ad;
		
		var getClickUrl = function (ads_data) {
			return ads_base_url + 'click?bannerid=' + encodeURIComponent(ads_data.bannerid)
							+ '&zoneid=' + encodeURIComponent(ads_data.zoneid);
		};
		var getIconUrl = function (ads_data) {
			return ads_base_url + 'assets/images/' + ads_data.filename;
		};
		var applyAdsData = function (ads_data, $ads_dom) {
			$ads_dom.find('a').attr('href', getClickUrl(ads_data));
			
			var $img_dom = $ads_dom.find('img');
			if ($img_dom.size() > 0) {
				$img_dom.attr('src', getIconUrl(ads_data));
				$img_dom.attr('alt', ads_data.bannertext);
			}
			$ads_dom.find('span').text(ads_data.bannertext);
			$ads_dom.show();
		};
		return {
			'setCategoryAllianceArea' : function (_area_selector) {
				$area_dom = jQuery(_area_selector);
				ads_area_list = $area_dom.find('li');
				top_ad = $area_dom.find('.jsCategoryAllianceTopAd');
				if (ads_area_list.size() > 0) {
					has_ads_list = true;
				}
				if (top_ad.size() > 0) {
					has_top_ad = true;
				}
			},
			'hasAdsList' : function () {
				return has_ads_list;
			},
			'hasTopAd' : function () {
				return has_top_ad;
			},
			'setAdsData' : function (ads_list) {
				var ads_exists = false;
				jQuery(ads_area_list).each(function (index) {
					if (ads_list[index]) {
						applyAdsData(ads_list[index], jQuery(this));
						ads_exists = true;
					}
				});
				if (ads_exists) {
					$area_dom.show();
				}
			},
			'setTopAd' : function (ad) {
				applyAdsData(ad, top_ad);
			}
		};
	})();
	
	return {
		'setAdsBaseUrl': function (_ads_base_url) {
			ads_base_url = _ads_base_url;
		},
		'setCategoryAllianceArea' : function (_area_selector) {
			AdsAreaView.setCategoryAllianceArea(_area_selector);
		},
		'fetchAdsList': function (zone_id_list) {
			if (!AdsAreaView.hasAdsList()) {
				return ;
			}
			AdsApiModel.fetchByZoneId(zone_id_list.join(','), AdsApiCallbackController.fetchAdsListCallback);
		},
		'fetchTopAd': function (zone_id) {
			if (!AdsAreaView.hasTopAd()) {
				return ;
			}
			AdsApiModel.fetchByZoneId(zone_id, AdsApiCallbackController.fetchTopAdCallback);
		}
	};
})();


