(function () {

// concatenate two functions.
function chain(head, tail) {
	return head ? function () {
			head && head.apply(this, arguments);
			tail && tail.apply(this, arguments);
	} : tail;
}


var NicoAPI = window.NicoAPI = {
	"post": function (api, params, dataType) {
		return NicoAPI.call(api, params, dataType, "POST");
	},
	"get": function (api, params, dataType) {
		return NicoAPI.call(api, params, dataType, "GET");
	},
	"call": function (api, params, dataType, method) {
		params = params || {};
		dataType = dataType || "text";
		var responder = new NicoAPI.Responder;
		responder.xhr = jQuery.ajax({
			"type":		method,
			"url":		api,
			"data":		params,
			"dataType":	dataType,
			"success":	function (data) { responder.onSuccess(data); },
			"error":	function (data) { responder.onError(data); }
		});
		return responder;
	}
};

NicoAPI.Responder = function () {};
NicoAPI.Responder.prototype = {
	"success": function (cb) {
		this.onSuccess = chain(this.onSuccess, cb);
		return this;
	},
	"error":function (cb) {
		this.onError = chain(this.onError, cb);
		return this;
	},
	"onSuccess":null,
	"onError":null
}

})();

(function () {
	NicoAPI.searchKeyword = function (keyword, sort, order, page, detail_search, callback) {
		NicoAPI.get(
			Nico_getBaseUrl() + "api/search/" + encodeURIComponent(keyword),
			{
				"sort": sort,
				"order": order,
				"page": page,
				"f_range": detail_search.f_range,
				"l_range" : detail_search.l_range,
				"opt_md": detail_search.music_downloadable
			},
			"html"
		).success(function (result) {
			callback && callback(keyword, sort, order, page, detail_search, result);
		});
	};
	
	NicoAPI.searchTag = function (tag, sort, order, page, detail_search, callback) {
		NicoAPI.get(
			Nico_getBaseUrl() + "api/tag/" + encodeURIComponent(tag),
			{
				"sort": sort,
				"order": order,
				"page": page,
				"f_range": detail_search.f_range,
				"l_range" : detail_search.l_range,
				"opt_md": detail_search.music_downloadable
			},
			"html"
		).success(function (result) {
			callback && callback(tag, sort, order, page, detail_search, result);
		});
	};

	NicoAPI.counter = function (path, callback) {
		NicoAPI.get(
			Nico_getBaseUrl() + "api/counter/" + path,
			{}
		).success(function (result) {
			callback && callback(path, result);
		});
	}
})();
