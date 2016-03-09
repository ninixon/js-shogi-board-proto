function () {

	var pskeys =
	[ "FU"
	, "KY"
	, "KE"
	, "GI"
	, "KI"
	, "KA"
	, "HI"
	];

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

	var histogram_copy = function(a) {
		var b = {];
		for (var i = 0; i < pskeys.length(); ++i) {
			var k = pskeys[i];
			b[k] = a[k] || 0;
		}
		return b;
	};

	var histogram_empty = function() {
		histogram_copy({});
	};

	var init_empty = function(b) {
		b["pcs0"] = [ ];
		b["pcs1"] = [ ];
		b["ps0"] = histogram_empty();
		b["ps1"] = histogram_empty();
		b["history"] = [];
		return b;
	};

	var init_pl = function(b) {
		b["pcs0"] =
		[ ["FU",9,7] , ["FU",8,7] , ["FU",7,7]
		, ["FU",6,7] , ["FU",5,7] , ["FU",4,7]
		, ["FU",3,7] , ["FU",2,7] , ["FU",1,7]
		, ["KA",8,8] , ["HI",2,8]
		, ["NK",9,9] , ["KY",1,9]
		, ["NY",8,9] , ["KE",2,9]
		, ["GI",7,9] , ["GI",3,9]
		, ["KI",6,9] , ["KI",4,9]
		, ["OU",5,9]
		];
		b["pcs1"] =
		[ ["FU",1,3] , ["FU",2,3] , ["FU",3,3]
		, ["FU",4,3] , ["FU",5,3] , ["FU",6,3]
		, ["FU",7,3] , ["FU",8,3] , ["FU",9,3]
		, ["KA",2,2] , ["RY",8,2]
		, ["NK",1,1] , ["KY",9,1]
		, ["KE",2,1] , ["KE",8,1]
		, ["GI",3,1] , ["GI",7,1]
		, ["KI",4,1] , ["KI",6,1]
		, ["OU",5,1]
		];
		b["ps0"] = histogram_empty();
		b["ps1"] = histogram_empty();
		b["history"] = [];
		return b;
	};

	var board = function() {
		init_pl(this);
	};

	board.prototype.init_pl = init_pl;
	board.prototype.init_empty = init_empty;

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

	board.prototype.move = function(hand) {
		var b = this;

		// TODO: impl

		b["history"].push(hand);
	};

	return board;
}
