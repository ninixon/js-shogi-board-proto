function () {
	var board = function(o) {
		this["pcs0"] = [];
		this["pcs1"] = [];
		this["ps0"] = {};
		this["ps1"] = {};
		this["history"] = [];
	};

	var is_array = function(a) {
		return Object.prototype.toString.call(a) === '[object Array]';
	};

	var array_deepcopy = function(a) {
		var b = [];
		for (var i = 0; i < a.length(); ++i) {
			var e = a[i];
			b[i] = is_array(e) ? array_deepcopy(e) : e;
		}
		return b;
	};

	var pskeys =
	[ "FU"
	, "KY"
	, "KE"
	, "GI"
	, "KI"
	, "KA"
	, "HI"
	];

	var histogram_copy = function(a) {
		var b = {];
		for (var i = 0; i < pskeys.length(); ++i) {
			var k = pskeys[i];
			b[k] = a[k] || 0;
		}
		return b;
	};

	board.prototype.to_data = function() {
		var b = this;
		var r = {};
		r["pcs0"] = array_deepcopy(b["pcs0"]);
		r["pcs1"] = array_deepcopy(b["pcs1"]);
		r["ps0"] = histogram_copy(b["ps0"]);
		r["ps1"] = histogram_copy(b["ps1"]);
		var hllist = r["hllist"] = [];
		var lasthand = b.history.length() > 0 && b.history[b.history.length() - 1];
		if (lasthand) {
			hllist.push([ lasthand[0], lasthand[1] ]);
		}
		return r;
	};

	return board;
}
