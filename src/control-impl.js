function () {
	var control = {};
	var SVGView = (function(def) { return def(); })(
#		include "viewer-svg-impl.js"
	);
	control['SVGView'] = SVGView;
	return control;
}
