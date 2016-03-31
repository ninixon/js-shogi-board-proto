function () {
	var control = {};
	var SVGView = (function(def) { return def(); })(
#		include "viewer-svg-impl.js"
	);
	var BoardModel = (function(def) { return def(); })(
#		include "board-impl.js"
	);
	var Parser = (function(def) { return def(); })(
#		include "parser-kif-impl.js"
	);
	var cps932decoder = (function(def) { return def(); })(
#		include "cesdecodecp932-impl.js"
	);
	control['SVGView'] = SVGView;
	control['Parser'] = Parser;
	control['BoardModel'] = BoardModel;

	var FromKifSource = function(target, txt) {
		// TODO: impl
	};

	var FromKifBinary = function(target, bin) {
		// TODO: impl
	};

	var FromKifHTTP = function(target, uri) {
		// TODO: XHR
	};

	control['FromKifHTTP'] = FromKifHTTP;

	return control;
}
