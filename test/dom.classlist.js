/*BUILT Sat Feb 16 2013 16:44:36 GMT+0100 (CET)*/
require.register('util.polyfill/index', function(module, exports, require) {
  /**
   * Array.indexOf()
   */
  if (!Array.prototype.indexOf) {
  	Array.prototype.indexOf = function(item) {
  		for (var i = i = 0, n = this.length; i < n; i++) {
  			if (item === this[i]) {
  				return i;
  			}
  		}
  		return -1;
  	};
  }
  
  /**
   * window.requestAnimationFrame()
   */
  var vendors = ['ms', 'moz', 'webkit', 'o']
  	, lastFrameTime = null;
  
  for (var i = 0, n = vendors.length; i < n; i++) {
  	vendor = vendors[i];
  	if (!window.requestAnimationFrame) {
  		window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
  		window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
  	}
  }
  
  if (!window.requestAnimationFrame) {
  	window.requestAnimationFrame = function(callback, element) {
  		var currFrameTime = +(new Date)
  			, id, interval, lastTime;
  		if (lastFrameTime == null) {
  			lastFrameTime = currFrameTime;
  		}
  		interval = Math.max(0, 16 - (currFrameTime - lastFrameTime));
  		id = window.setTimeout((function() {
  			// Call with elapsed frame time
  			callback(currFrameTime + interval);
  		}), interval);
  		lastTime = currFrameTime + interval;
  		return id;
  	};
  }
  
  if (!window.cancelAnimationFrame) {
  	window.cancelAnimationFrame = function(id) {
  		clearTimeout(id);
  	};
  }
  
});
require.register('dom.classlist', function(module, exports, require) {
  require('util.polyfill');
  
  var RE_TRIM = /^\s+|\s+$/g;
  
  /**
   * Check if 'element' has class 'clas'
   * @param {Element} element
   * @param {String} clas
   * @return {Boolean}
   */
  exports.hasClass = function(element, clas) {
  	if (element.classList != null) {
  		return element.classList.contains(clas);
  	} else {
  		var classes = element.className.replace(RE_TRIM, '').split(' ');
  		return classes.indexOf(clas) >= 0;
  	}
  };
  
  /**
   * Check if 'element' has a class matching 'pattern'
   * @param {Element} element
   * @param {String} pattern
   * @return {String}
   */
  exports.matchClass = function(element, pattern) {
  	var classes = element.className.replace(RE_TRIM, '').split(' ')
  		, clas;
  	for (var i = 0, n = classes.length; i < n; i++) {
  		clas = classes[i];
  		if (clas.indexOf(pattern) !== -1) {
  			return clas;
  		}
  	}
  	return '';
  };
  
  /**
   * Add class 'clas' to 'element'
   * @param {Element} element
   * @param {String} clas
   */
  exports.addClass = function(element, clas) {
  	if (element.classList != null) {
  		element.classList.add(clas);
  	} else {
  		element.className += ' ' + clas;
  	}
  };
  
  /**
   * Remove class 'clas' from 'element'
   * @param {Element} element
   * @param {String} clas
   */
  exports.removeClass = function(element, clas) {
  	var c, classes;
  	if (clas) {
  		if (element.classList != null) {
  			element.classList.remove(clas);
  		} else {
  			var classes = element.className.replace(RE_TRIM, '').split(' ')
  				, results = [];
  			for (var i = 0, n = classes.length; i < n; i++) {
  				if (classes[i] !== clas) results.push(classes[i]);
  			}
  			element.className = results.join(' ');
  		}
  	}
  };
  
  /**
   * Toggle class 'clas' on 'element'
   * @param {Element} element
   * @param {String} clas
   */
  exports.toggleClass = function(element, clas) {
  	if (exports.hasClass(element, clas)) {
  		exports.removeClass(element, clas);
  	} else {
  		exports.addClass(element, clas);
  	}
  };
  
  /**
   * Replace class 'clasOld' with 'clasNew' on 'element'
   * @param {Element} element
   * @param {String} clas
   */
  exports.replaceClass = function(element, clasOld, clasNew) {
  	if (clasOld) {
  		if (clasNew) {
  			element.className = element.className.replace(clasOld, clasNew);
  		} else {
  			exports.removeClass(element, clasOld);
  		}
  	} else if (clasNew) {
  		exports.addClass(element, clasNew);
  	}
  };
  
  /**
   * Add class 'clas' to 'element', and remove after 'duration' milliseconds
   * @param {Element} element
   * @param {String} clas
   * @param {Number} duration
   */
  exports.addTemporaryClass = function(element, clas, duration) {
  	exports.addClass(element, clas);
  	setTimeout((function() {
  		exports.removeClass(element, clas);
  	}), duration);
  };
  
});