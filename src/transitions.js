const Trans = {};

/**
 * A number of transition methods
 * 
 * @param {Number} t Current time
 * @param {Number} b Start value
 * @param {Number} c Change in value
 * @param {Number} d Duration
 */

Trans.linearTween = function (t, b, c, d) {
	return c*t/d + b;
};

Trans.easeInQuad = function (t, b, c, d) {
	t /= d;
	return c*t*t + b;
};

Trans.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};

Trans.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Trans.easeInCubic = function (t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
};

Trans.easeOutCubic = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

Trans.easeInOutCubic = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

Trans.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Trans.easeOutQuart = function (t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Trans.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Trans.easeInQuint = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
};

Trans.easeOutQuint = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
};

Trans.easeInOutQuint = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
};

Trans.easeInSine = function (t, b, c, d) {
	return -c * Trans.cos(t/d * (Trans.PI/2)) + c + b;
};

Trans.easeOutSine = function (t, b, c, d) {
	return c * Trans.sin(t/d * (Trans.PI/2)) + b;
};

Trans.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Trans.cos(Trans.PI*t/d) - 1) + b;
};

Trans.easeInExpo = function (t, b, c, d) {
	return c * Trans.pow( 2, 10 * (t/d - 1) ) + b;
};

Trans.easeOutExpo = function (t, b, c, d) {
	return c * ( -Trans.pow( 2, -10 * t/d ) + 1 ) + b;
};

Trans.easeInOutExpo = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Trans.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Trans.pow( 2, -10 * t) + 2 ) + b;
};

Trans.easeInCirc = function (t, b, c, d) {
	t /= d;
	return -c * (Trans.sqrt(1 - t*t) - 1) + b;
};

Trans.easeOutCirc = function (t, b, c, d) {
	t /= d;
	t--;
	return c * Trans.sqrt(1 - t*t) + b;
};  

Trans.easeInOutCirc = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Trans.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Trans.sqrt(1 - t*t) + 1) + b;
};

export default Trans;