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

	var promotion =
	[["FU", "TO"]
	,["KY", "NY"]
	,["KE", "NK"]
	,["GI", "NG"]
	,["KA", "UM"]
	,["HI", "RY"]
	];

	var alist2map = function(alist) {
		var res = {};
		for (var i = 0; i < alist.length; ++i) {
			var k = alist[i][0];
			var v = alist[i][1];
			res[k] = v;
		}
		return res;
	};
	var alist2rmap = function(alist) {
		var res = {};
		for (var i = 0; i < alist.length; ++i) {
			var k = alist[i][0];
			var v = alist[i][1];
			res[v] = k;
		}
		return res;
	};
	var map = function(cb, list) {
		var res = [];
		for (var i = 0; i < list.length; ++i) {
			res[i] = cb(list[i]);
		}
		return res;
	};

	var promotion_map = alist2map(promotion);
	var promotion_rmap = alist2rmap(promotion);

	var find_from_pcs = function(pcs, x, y) {
		for (var i = 0; i < pcs.length(); ++i) {
			var pc = pcs[i];
			if (pc[1] == x && pc[2] == y) {
				return i;
			}
		}
		return null;
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

	var histogram_copy = function(a) {
		var b = {};
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

	var opponent = function(player) {
		return 1 - player;
	};

	board.prototype.move = function(hand) {
		var b = this;

		if (hand["TYPE"] == "MOVE") {
			// TODO: player
			var player = hand["PLAYER"];
			var piece = hand["PIECE"];
			var mvsrc = hand["MVSRC"];
			var mvdst = hand["MVDST"];
			var promote = hand["PROMOTE"];
			var move_sub = function(pcs0, pcs1, ps0, ps1) {
				var srcx = mvsrc["x"];
				var srcy = mvsrc["y"];
				var dstx = mvdst["x"];
				var dsty = mvdst["y"];
				if (srcx == 0 && srcy == 0) {
					--ps0[piece];
					pcs0.push([piece, dstx, dsty]);
				} else {
					var srci = find_from_pcs(pcs0, srcx, srcy);
					if (srci === null) {
						return false;
					}
					pcs0[srci] =
					[ promote ? promotion_map[piece] : piece
					, dstx
					, dsty
					];

					var dsti = find_from_pcs(pcs1, dstx, dsty);
					if (dsti === null) {
						// moving to empty space
					} else {
						var tohand = pcs1.splice(dsti, 1);
						var piece_tohand = tohand[0][0];
						piece_tohand
						=  promotion_rmap[piece_tohand]
						||                piece_tohand
						;
						if (piece_tohand in ps0) {
							++ps0[piece_tohand];
						} else {
							ps0[piece_tohand] = 1;
						}
					}
				}
				return true;
			};
			if (player == 0 && move_sub(b["pcs0"],b["pcs1"],b["ps0"],b["ps1"])) {
				// TODO: impl
			} else if (player == 1 && move_sub(b["pcs1"],b["pcs0"],b["ps1"],b["ps0"])) {
				// TODO: impl
			} else {
				// TODO: just ignore?
			}
		} else {
			// do nothing
			return;
		}

		b["history"].push(hand);
	};

	return board;
}
