export const Trans = {};

/**
 * A number of transition methods
 * 
 * @param {Number} t Current time
 * @param {Number} b Start value
 * @param {Number} c Change in value
 * @param {Number} d Duration
 */

Trans.linearTween = (t, b, c, d) => {
	return c*t/d + b;
};

Trans.easeInQuad = (t, b, c, d) => {
	t /= d;
	return c*t*t + b;
};

Trans.easeOutQuad = (t, b, c, d) => {
	t /= d;
	return -c * t*(t-2) + b;
};

Trans.easeInOutQuad = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Trans.easeInCubic = (t, b, c, d) => {
	t /= d;
	return c*t*t*t + b;
};

Trans.easeOutCubic = (t, b, c, d) => {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

Trans.easeInOutCubic = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

Trans.easeInQuart = (t, b, c, d) => {
	t /= d;
	return c*t*t*t*t + b;
};

Trans.easeOutQuart = (t, b, c, d) => {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Trans.easeInOutQuart = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Trans.easeInQuint = (t, b, c, d) => {
	t /= d;
	return c*t*t*t*t*t + b;
};

Trans.easeOutQuint = (t, b, c, d) => {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
};

Trans.easeInOutQuint = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
};

Trans.easeInSine = (t, b, c, d) => {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};

Trans.easeOutSine = (t, b, c, d) => {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};

Trans.easeInOutSine = (t, b, c, d) => {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};

Trans.easeInExpo = (t, b, c, d) => {
	return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};

Trans.easeOutExpo = (t, b, c, d) => {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};

Trans.easeInOutExpo = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};

Trans.easeInCirc = (t, b, c, d) => {
	t /= d;
	return -c * (Math.sqrt(1 - t*t) - 1) + b;
};

Trans.easeOutCirc = (t, b, c, d) => {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
};  

Trans.easeInOutCirc = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
};