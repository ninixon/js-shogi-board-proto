function () {
	var control = {};
	var SVGView = (function(def) { return def(); })(
#		include "viewer-svg-impl.js"
	);
	var BoardModel = (function(def) { return def(); })({
#		include "board-impl.js"
	);
	control['SVGView'] = SVGView;
	return control;
}
