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

	var Board = function(target) {
		this['ui-target'] = target;
	};
	control['Board'] = Board;

	Board.prototype.FromKifSource = function(text) {
		var b = this;
		var lines = text.split(/\r\n|\r|\n/);
		for (var i = 0; i < lines.length; ++i) {
			var line = lines[i];
			var matchres = Parser.parse_line(line);
			// TODO: dispatch
		}
	};

	Board.prototype.FromKifBinary = function(bin) {
		var b = this;
		var text = cesdecode.fromcp932(bin);
		return b.FromKifSource(text);
	};

	Board.prototype.FromKifFile = function(fileobj) {
		var b = this;
		var filereader = new FileReader();
		var filecontent = new Uint8Array(filereader.readAsArrayBuffer(fileobj));
		return b.FromKifBinary(filecontent);
	};

	Board.prototype.FromKifHTTP = function(uri) {
		var b = this;
		var req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (	req.readyState == 4 &&
					req.status == 200
			   ) {
				var response_data = new Uint8Array(req.response);
				b.FromKifBinary(response_data);
			}
		};
		req.open('GET', uri);
		req.responseType = 'arraybuffer';
		req.send();

	};

	return control;
}
