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
	var cesdecode = (function(def) { return def(); })(
#		include "cesdecodecp932-impl.js"
	);
	control['SVGView'] = SVGView;
	control['Parser'] = Parser;
	control['BoardModel'] = BoardModel;

	var FromKifSource = function(target, text) {
		var lines = text.split(/\r\n|\r|\n/);
		for (var i = 0; i < lines.length; ++i) {
			var line = lines[i];
			var matchres = Parser.parse_line(line);
			// TODO: dispatch
		}
	};

	var FromKifBinary = function(target, bin) {
		var text = cesdecode.fromcp932(bin);
		return FromKifSource(target, text);
	};

	var FromKifFile = function(target, fileobj) {
		var filereader = new FileReader();
		var filecontent = new Uint8Array(filereader.readAsArrayBuffer(fileobj));
		return FromKifBinary(target, filecontent);
	};

	var FromKifHTTP = function(target, uri) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (	req.readyState == 4 &&
					req.status == 200
			   ) {
				var response_data = new Uint8Array(req.response);
				FromKifBinary(target, response_data);
			}
		};
		req.open('GET', uri);
		req.responseType = 'arraybuffer';
		req.send();

	};

	control['FromKifFile'] = FromKifFile;
	control['FromKifHTTP'] = FromKifHTTP;

	return control;
}
