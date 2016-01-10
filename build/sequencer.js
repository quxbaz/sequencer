/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.exports = undefined;
	
	var _sequencer = __webpack_require__(1);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _channel = __webpack_require__(3);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _blip = __webpack_require__(4);
	
	var _blip2 = _interopRequireDefault(_blip);
	
	var _audioservice = __webpack_require__(7);
	
	var _audioservice2 = _interopRequireDefault(_audioservice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _exports = { Sequencer: _sequencer2.default, Channel: _channel2.default, Blip: _blip2.default, AudioService: _audioservice2.default };
	exports.exports = _exports;
	exports.default = _exports;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       sequencer.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <Usage>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       let sequencer = new Sequencer();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       sequencer.play();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       <TODO>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Move this file to /lib.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Create file called index.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - export this, audioservice, blip, and channel from index.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stateful = __webpack_require__(2);
	
	var _stateful2 = _interopRequireDefault(_stateful);
	
	var _channel = __webpack_require__(3);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _timer = __webpack_require__(5);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	var _dispatcher = __webpack_require__(6);
	
	var _dispatcher2 = _interopRequireDefault(_dispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function defaultState() {
	  return {
	    playing: false,
	    currentBeat: 0,
	    beatDuration: 200,
	    channels: []
	  };
	}
	
	var Sequencer = function () {
	  function Sequencer(state) {
	    var _this = this;
	
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Sequencer);
	
	    this.state = Object.assign(defaultState(), state);
	    this.props = props;
	    this.timer = new _timer2.default({ tickInterval: this.state.beatDuration });
	    this.timer.on('tick', function () {
	      if (_this.state.playing) _this.tick();
	    });
	    this.timerStarted = false;
	  }
	
	  _createClass(Sequencer, [{
	    key: 'play',
	    value: function play() {
	      this.state.playing = true;
	      if (!this.timerStarted) {
	        this.timer.start();
	        this.timerStarted = true;
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.state.playing = false;
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      /*
	        Plays a beat and moves onto the next one.
	      */
	      this.playCurrentBeat();
	      this.advanceBeat();
	    }
	  }, {
	    key: 'playCurrentBeat',
	    value: function playCurrentBeat() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.state.channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var channel = _step.value;
	
	          channel.playBeat(this.state.currentBeat);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'advanceBeat',
	    value: function advanceBeat() {
	      this.state.currentBeat = (this.state.currentBeat + 1) % 16;
	    }
	  }, {
	    key: 'addChannel',
	    value: function addChannel() {
	      var _this2 = this;
	
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      this.state.channels.push(new _channel2.default(state, {
	        onPlay: function onPlay(blipState) {
	          return _this2.publish('play-blip', blipState);
	        }
	      }));
	    }
	  }]);
	
	  return Sequencer;
	}();
	
	exports.default = Sequencer;
	
	var dispatcher = new _dispatcher2.default();
	Object.assign(Sequencer.prototype, _stateful2.default.mixin, {
	  subscribe: dispatcher.subscribe.bind(dispatcher),
	  publish: dispatcher.publish.bind(dispatcher)
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	  stateful.js
	
	  Mixin for stateful objects.
	
	  <TODO>
	  This needs to trigger a state change event whenever the state
	  changes.
	*/
	
	var mixin = exports.mixin = {
	  setState: function setState(state) {
	    if (this.state === undefined) this.state = {};
	    Object.assign(this.state, state);
	  }
	};
	
	exports.default = {
	  mixin: mixin
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       channel.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stateful = __webpack_require__(2);
	
	var _stateful2 = _interopRequireDefault(_stateful);
	
	var _blip = __webpack_require__(4);
	
	var _blip2 = _interopRequireDefault(_blip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function defaultState() {
	  var blips = [];
	  for (var i = 0; i < 16; i++) {
	    blips.push(new _blip2.default());
	  }return {
	    sampleName: '',
	    blips: blips
	  };
	}
	
	var Channel = function () {
	  function Channel(state) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Channel);
	
	    this.state = Object.assign(defaultState(), state);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = this.state.blips[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var blip = _step.value;
	
	        blip.props.onPlay = props.onPlay;
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    this.props = props;
	  }
	
	  _createClass(Channel, [{
	    key: 'playBeat',
	    value: function playBeat(beat) {
	      this.state.blips[beat].play();
	    }
	  }]);
	
	  return Channel;
	}();
	
	exports.default = Channel;
	
	Object.assign(Channel.prototype, _stateful2.default.mixin);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       blip.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stateful = __webpack_require__(2);
	
	var _stateful2 = _interopRequireDefault(_stateful);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function defaultState() {
	  return {
	    sampleName: '',
	    mute: false,
	    duration: 200,
	    offset: 0,
	    gain: 1,
	    playbackRate: 1
	  };
	}
	
	var Blip = function () {
	  function Blip(state) {
	    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Blip);
	
	    this.state = Object.assign(defaultState(), state);
	    this.props = props;
	  }
	
	  _createClass(Blip, [{
	    key: 'play',
	    value: function play() {
	      this.props.onPlay(this.state);
	    }
	  }]);
	
	  return Blip;
	}();
	
	exports.default = Blip;
	
	Object.assign(Blip.prototype, _stateful2.default.mixin);

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
	  timer.js
	
	  <Usage>
	
	   // Creates a timer that ticks every 100ms.
	  var t = new timer.Timer({tickInterval: 100});
	
	  // The timer will stop after ticking 10 times.
	  t.on('tick', function() {
	    console.log(t.elapsed);
	    if (t.tickCount == 10)
	      t.stop();
	  });
	
	*/
	
	
	function has(obj, key) {
	  return obj.hasOwnProperty(key);
	}
	
	function each(coll, fn, context) {
	  if (Array.isArray(coll)) {
	    for (var i=0; i < coll.length; i++)
	      fn.call(context, coll[i], i);
	  }
	  else {
	    for (var k in coll) {
	      if (coll.hasOwnProperty(k))
	        fn.call(context, coll[k], k);
	    }
	  }
	}
	
	function now() {
	  return performance.now();
	};
	
	/*
	  This is webworker code that should be treated as if it were on
	  another page/url. It should not reference any other
	  code/variables/functions except what is declared within itself.
	*/
	var workerJs = function(tickInterval) {
	
	  /*
	    This worker posts only one kind of message (via postMessage), a
	    data object consisting of various time properties.
	  */
	
	  var running = false;
	
	  function tick() {
	    if (!running)
	      return;
	    setTimeout(function() {
	      postMessage('');
	      tick();
	    }, tickInterval);
	  };
	
	  self.addEventListener('message', function(event) {
	    if (event.data.message == 'stop')
	      running = false;
	    else if (event.data.message == 'start') {
	      running = true;
	      tick();
	    } else if (event.data.message == 'setTickInterval')
	      tickInterval = event.data.tickInterval;
	  });
	
	};
	/****/
	
	var Timer = function(opts) {
	  this.checkBrowserSupport();
	  if (typeof opts == 'undefined')
	    opts = {};
	  this.events = {
	    'tick': []
	  };
	  this.tickInterval = opts.tickInterval || 25;
	  this.tickCount = 0;
	  this.elapsed = 0;
	  // Make sure this is called only after tickInterval have been set.
	  this.worker = this.createWorker();
	  this.on('tick', this.update.bind(this));
	};
	
	var fn = Timer.prototype;
	
	fn.checkBrowserSupport = function() {
	  var features = ['Blob', 'Worker', 'URL', 'performance'];
	  each(features, function(feature) {
	    if (typeof self[feature] == 'undefined')
	      throw new Error(feature + ' is not supported in this browser environment.');
	  });
	};
	
	fn.createWorker = function() {
	  var blobUrl = URL.createObjectURL(
	    new Blob(['(', workerJs.toString(), ')(' + this.tickInterval + ')'], {type: 'application/javascript'})
	  );
	  var worker = new Worker(blobUrl);
	  URL.revokeObjectURL(blobUrl);
	  worker.addEventListener('message', function(event) {
	    this.trigger('tick', event.data);
	  }.bind(this));
	  return worker;
	};
	
	fn.checkValidEvent = function(eventName) {
	  if (!has(this.events, eventName))
	    throw new Error('Event "' + eventName + '" not a valid event.');
	}
	
	fn.update = function() {
	  this.dt = now() - (this.startTime + this.elapsed);
	  this.elapsed += this.dt;
	  this.tickCount++;
	};
	
	fn.start = function() {
	  /*
	    <Warning> This method is asynchronous. See Timer.stop
	  */
	  this.startTime = now();
	  this.worker.postMessage({message: 'start'});
	  return this;
	};
	
	fn.stop = function() {
	  /*
	    <Warning>: This method is asynchronous. A timer does not stop
	    immediately when this function is called. It stops when the
	    message is passed to the worker, which takes a few milliseconds in
	    most cases.
	  */
	  this.worker.postMessage({message: 'stop'});
	  return this;
	};
	
	fn.on = function(eventName, callback) {
	  this.checkValidEvent(eventName);
	  this.events[eventName].push(callback);
	  return this;
	};
	
	fn.trigger = function(eventName, eventArgs) {
	  this.checkValidEvent(eventName);
	  var eventArgs = Array.prototype.slice.call(arguments, 1);
	  each(this.events[eventName], function(callback) {
	    callback.apply(this, eventArgs);
	  }, this);
	  return this;
	};
	
	fn.setTickInterval = function(tickInterval) {
	  this.tickInterval = tickInterval;
	  this.worker.postMessage({
	    message: 'setTickInterval',
	    tickInterval: tickInterval
	  });
	};
	
	module.exports = Timer;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	  dispatcher.js
	
	  <Usage>
	
	  var d = new Dispatcher();
	
	  d.subscribe('click', function(event, counter) {
	     ...
	  });
	
	  d.dispatch('click', clickEvent, clicks + 1);
	
	*/
	
	function Dispatcher() {
	  this.handlers = {};
	}
	
	var fn = Dispatcher.prototype;
	
	fn.subscribe = function(event, handler) {
	  if (!this.handlers.hasOwnProperty(event))
	    this.handlers[event] = [];
	  this.handlers[event].push(handler);
	};
	
	fn.publish = function(event) {
	  if (!this.handlers.hasOwnProperty(event))
	    return;
	  var rest = Array.prototype.slice.call(arguments, 1);
	  this.handlers[event].forEach(function(handler) {
	    handler.apply(null, rest);
	  });
	};
	
	module.exports = Dispatcher;


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	  audioservice.js
	
	  <Usage>
	  let sequencer = new Sequencer();
	  let audioService = new AudioService();
	  sequencer.subscribe('play-blip', blipState => {
	    audioService.playBlip(blipState);
	  });
	*/
	
	var defaultGainValue = function () {
	  var val = undefined;
	  return function (audioContext) {
	    if (val) return val;
	    val = audioContext.createGain().gain.value;
	    return val;
	  };
	}();
	
	var AudioService = function () {
	  function AudioService(audioContext) {
	    var sampleMap = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, AudioService);
	
	    if (audioContext === undefined) throw Error('You must provide an AudioContext object.');
	    this.audioContext = audioContext;
	    this.sampleMap = sampleMap;
	  }
	
	  _createClass(AudioService, [{
	    key: 'playBlip',
	    value: function playBlip(blipState) {
	      if (blipState.mute || !blipState.sampleName) return;
	      var source = this.audioContext.createBufferSource();
	      source.buffer = this.sampleMap[blipState.sampleName];
	      this.linkModifiers(blipState, source);
	      source.connect(this.audioContext.destination);
	      source.start(this.audioContext.currentTime + blipState.offset / 1000);
	    }
	  }, {
	    key: 'linkModifiers',
	    value: function linkModifiers(blipState, source) {
	      // Links modifier nodes to a buffer source.
	      source.playbackRate.value = blipState.playbackRate;
	      if (blipState.gain != defaultGainValue(this.audioContext)) {
	        var gainNode = this.audioContext.createGain();
	        gainNode.gain.value = blipState.gain;
	        source.connect(gainNode);
	        gainNode.connect(this.audioContext.destination);
	      }
	    }
	  }]);
	
	  return AudioService;
	}();
	
	exports.default = AudioService;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDFiY2NkZWJkZDQyNzkxZjQ5YTciLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NlcXVlbmNlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3RhdGVmdWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JsaXAuanMiLCJ3ZWJwYWNrOi8vLy4vYm93ZXJfY29tcG9uZW50cy90aW1lci5qcy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ib3dlcl9jb21wb25lbnRzL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXVkaW9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDTyxLQUFJLFFBQU8sR0FBRyxFQUFDLFNBQVMsdUJBQUUsT0FBTyxxQkFBRSxJQUFJLGtCQUFFLFlBQVksMEJBQUMsQ0FBQzs7bUJBQy9DLFFBQU8sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2F0QixVQUFTLFlBQVksR0FBRztBQUN0QixVQUFPO0FBQ0wsWUFBTyxFQUFFLEtBQUs7QUFDZCxnQkFBVyxFQUFFLENBQUM7QUFDZCxpQkFBWSxFQUFFLEdBQUc7QUFDakIsYUFBUSxFQUFFLEVBQUU7SUFDYixDQUFDO0VBQ0g7O0tBRW9CLFNBQVM7QUFFNUIsWUFGbUIsU0FBUyxDQUVoQixLQUFLLEVBQVk7OztTQUFWLEtBQUsseURB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U3RCLFNBQVMsRUFBRTtBQUNsQixXQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUN6QyxPQUFPO0FBQ1QsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3BELGFBQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckQsV0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEMsYUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlDLGFBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztNQUN2RTs7O21DQUVhLFNBQVMsRUFBRSxNQUFNLEVBQUU7O0FBRS9CLGFBQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFDbkQsV0FBSSxTQUFTLENBQUMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUN6RCxhQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzlDLGlCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ3JDLGVBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekIsaUJBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRDtNQUNGOzs7VUE1QmtCLFlBQVk7OzttQkFBWixZQUFZLEMiLCJmaWxlIjoic2VxdWVuY2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0cy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQxYmNjZGViZGQ0Mjc5MWY0OWE3XG4gKiovIiwiaW1wb3J0IFNlcXVlbmNlciBmcm9tICcuL2xpYi9zZXF1ZW5jZXInO1xuaW1wb3J0IENoYW5uZWwgZnJvbSAnLi9saWIvY2hhbm5lbCc7XG5pbXBvcnQgQmxpcCBmcm9tICcuL2xpYi9ibGlwJztcbmltcG9ydCBBdWRpb1NlcnZpY2UgZnJvbSAnLi9saWIvYXVkaW9zZXJ2aWNlJztcblxuZXhwb3J0IGxldCBleHBvcnRzID0ge1NlcXVlbmNlciwgQ2hhbm5lbCwgQmxpcCwgQXVkaW9TZXJ2aWNlfTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2luZGV4LmpzXG4gKiovIiwiLypcbiAgc2VxdWVuY2VyLmpzXG5cbiAgPFVzYWdlPlxuXG4gIGxldCBzZXF1ZW5jZXIgPSBuZXcgU2VxdWVuY2VyKCk7XG4gIHNlcXVlbmNlci5wbGF5KCk7XG5cbiAgPFRPRE8+XG4gIC0gTW92ZSB0aGlzIGZpbGUgdG8gL2xpYi5cbiAgLSBDcmVhdGUgZmlsZSBjYWxsZWQgaW5kZXguXG4gIC0gZXhwb3J0IHRoaXMsIGF1ZGlvc2VydmljZSwgYmxpcCwgYW5kIGNoYW5uZWwgZnJvbSBpbmRleC5cbiovXG5cbmltcG9ydCBzdGF0ZWZ1bCBmcm9tICcuL3N0YXRlZnVsJztcbmltcG9ydCBDaGFubmVsIGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgVGltZXIgZnJvbSAnYm93ZXJfY29tcG9uZW50cy90aW1lci5qcy90aW1lcic7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICdib3dlcl9jb21wb25lbnRzL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlcic7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBwbGF5aW5nOiBmYWxzZSxcbiAgICBjdXJyZW50QmVhdDogMCxcbiAgICBiZWF0RHVyYXRpb246IDIwMCxcbiAgICBjaGFubmVsczogW11cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VxdWVuY2VyIHtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZSwgcHJvcHM9e30pIHtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0U3RhdGUoKSwgc3RhdGUpO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKHt0aWNrSW50ZXJ2YWw6IHRoaXMuc3RhdGUuYmVhdER1cmF0aW9ufSk7XG4gICAgdGhpcy50aW1lci5vbigndGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnBsYXlpbmcpXG4gICAgICAgIHRoaXMudGljaygpO1xuICAgIH0pO1xuICAgIHRoaXMudGltZXJTdGFydGVkID0gZmFsc2U7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuc3RhdGUucGxheWluZyA9IHRydWU7XG4gICAgaWYgKCF0aGlzLnRpbWVyU3RhcnRlZCkge1xuICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgdGhpcy50aW1lclN0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIHRoaXMuc3RhdGUucGxheWluZyA9IGZhbHNlO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICAvKlxuICAgICAgUGxheXMgYSBiZWF0IGFuZCBtb3ZlcyBvbnRvIHRoZSBuZXh0IG9uZS5cbiAgICAqL1xuICAgIHRoaXMucGxheUN1cnJlbnRCZWF0KCk7XG4gICAgdGhpcy5hZHZhbmNlQmVhdCgpO1xuICB9XG5cbiAgcGxheUN1cnJlbnRCZWF0KCkge1xuICAgIGZvciAobGV0IGNoYW5uZWwgb2YgdGhpcy5zdGF0ZS5jaGFubmVscylcbiAgICAgIGNoYW5uZWwucGxheUJlYXQodGhpcy5zdGF0ZS5jdXJyZW50QmVhdCk7XG4gIH1cblxuICBhZHZhbmNlQmVhdCgpIHtcbiAgICB0aGlzLnN0YXRlLmN1cnJlbnRCZWF0ID0gKHRoaXMuc3RhdGUuY3VycmVudEJlYXQgKyAxKSAlIDE2O1xuICB9XG5cbiAgYWRkQ2hhbm5lbChzdGF0ZT17fSkge1xuICAgIHRoaXMuc3RhdGUuY2hhbm5lbHMucHVzaChcbiAgICAgIG5ldyBDaGFubmVsKHN0YXRlLCB7XG4gICAgICAgIG9uUGxheTogYmxpcFN0YXRlID0+IHRoaXMucHVibGlzaCgncGxheS1ibGlwJywgYmxpcFN0YXRlKVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cblxubGV0IGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuT2JqZWN0LmFzc2lnbihTZXF1ZW5jZXIucHJvdG90eXBlLCBzdGF0ZWZ1bC5taXhpbiwge1xuICBzdWJzY3JpYmUgOiBkaXNwYXRjaGVyLnN1YnNjcmliZS5iaW5kKGRpc3BhdGNoZXIpLFxuICBwdWJsaXNoICAgOiBkaXNwYXRjaGVyLnB1Ymxpc2guYmluZChkaXNwYXRjaGVyKVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9zZXF1ZW5jZXIuanNcbiAqKi8iLCIvKlxuICBzdGF0ZWZ1bC5qc1xuXG4gIE1peGluIGZvciBzdGF0ZWZ1bCBvYmplY3RzLlxuXG4gIDxUT0RPPlxuICBUaGlzIG5lZWRzIHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UgZXZlbnQgd2hlbmV2ZXIgdGhlIHN0YXRlXG4gIGNoYW5nZXMuXG4qL1xuXG5leHBvcnQgbGV0IG1peGluID0ge1xuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLCBzdGF0ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWl4aW5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9zdGF0ZWZ1bC5qc1xuICoqLyIsIi8qXG4gIGNoYW5uZWwuanNcbiovXG5cbmltcG9ydCBzdGF0ZWZ1bCBmcm9tICcuL3N0YXRlZnVsJztcbmltcG9ydCBCbGlwIGZyb20gJy4vYmxpcCc7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZSgpIHtcbiAgbGV0IGJsaXBzID0gW107XG4gIGZvciAodmFyIGk9MDsgaSA8IDE2OyBpKyspXG4gICAgYmxpcHMucHVzaChuZXcgQmxpcCgpKTtcbiAgcmV0dXJuIHtcbiAgICBzYW1wbGVOYW1lOiAnJyxcbiAgICBibGlwc1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZSwgcHJvcHM9e30pIHtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0U3RhdGUoKSwgc3RhdGUpO1xuICAgIGZvciAobGV0IGJsaXAgb2YgdGhpcy5zdGF0ZS5ibGlwcylcbiAgICAgIGJsaXAucHJvcHMub25QbGF5ID0gcHJvcHMub25QbGF5O1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgfVxuXG4gIHBsYXlCZWF0KGJlYXQpIHtcbiAgICB0aGlzLnN0YXRlLmJsaXBzW2JlYXRdLnBsYXkoKTtcbiAgfVxuXG59XG5cbk9iamVjdC5hc3NpZ24oQ2hhbm5lbC5wcm90b3R5cGUsIHN0YXRlZnVsLm1peGluKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2NoYW5uZWwuanNcbiAqKi8iLCIvKlxuICBibGlwLmpzXG4qL1xuXG5pbXBvcnQgc3RhdGVmdWwgZnJvbSAnLi9zdGF0ZWZ1bCc7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBzYW1wbGVOYW1lICAgOiAnJyxcbiAgICBtdXRlICAgICAgICAgOiBmYWxzZSxcbiAgICBkdXJhdGlvbiAgICAgOiAyMDAsXG4gICAgb2Zmc2V0ICAgICAgIDogMCxcbiAgICBnYWluICAgICAgICAgOiAxLFxuICAgIHBsYXliYWNrUmF0ZSA6IDFcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxpcCB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHByb3BzPXt9KSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdFN0YXRlKCksIHN0YXRlKTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMucHJvcHMub25QbGF5KHRoaXMuc3RhdGUpO1xuICB9XG5cbn1cblxuT2JqZWN0LmFzc2lnbihCbGlwLnByb3RvdHlwZSwgc3RhdGVmdWwubWl4aW4pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYmxpcC5qc1xuICoqLyIsIi8qXG4gIHRpbWVyLmpzXG5cbiAgPFVzYWdlPlxuXG4gICAvLyBDcmVhdGVzIGEgdGltZXIgdGhhdCB0aWNrcyBldmVyeSAxMDBtcy5cbiAgdmFyIHQgPSBuZXcgdGltZXIuVGltZXIoe3RpY2tJbnRlcnZhbDogMTAwfSk7XG5cbiAgLy8gVGhlIHRpbWVyIHdpbGwgc3RvcCBhZnRlciB0aWNraW5nIDEwIHRpbWVzLlxuICB0Lm9uKCd0aWNrJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codC5lbGFwc2VkKTtcbiAgICBpZiAodC50aWNrQ291bnQgPT0gMTApXG4gICAgICB0LnN0b3AoKTtcbiAgfSk7XG5cbiovXG5cblxuZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoa2V5KTtcbn1cblxuZnVuY3Rpb24gZWFjaChjb2xsLCBmbiwgY29udGV4dCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShjb2xsKSkge1xuICAgIGZvciAodmFyIGk9MDsgaSA8IGNvbGwubGVuZ3RoOyBpKyspXG4gICAgICBmbi5jYWxsKGNvbnRleHQsIGNvbGxbaV0sIGkpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAodmFyIGsgaW4gY29sbCkge1xuICAgICAgaWYgKGNvbGwuaGFzT3duUHJvcGVydHkoaykpXG4gICAgICAgIGZuLmNhbGwoY29udGV4dCwgY29sbFtrXSwgayk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xufTtcblxuLypcbiAgVGhpcyBpcyB3ZWJ3b3JrZXIgY29kZSB0aGF0IHNob3VsZCBiZSB0cmVhdGVkIGFzIGlmIGl0IHdlcmUgb25cbiAgYW5vdGhlciBwYWdlL3VybC4gSXQgc2hvdWxkIG5vdCByZWZlcmVuY2UgYW55IG90aGVyXG4gIGNvZGUvdmFyaWFibGVzL2Z1bmN0aW9ucyBleGNlcHQgd2hhdCBpcyBkZWNsYXJlZCB3aXRoaW4gaXRzZWxmLlxuKi9cbnZhciB3b3JrZXJKcyA9IGZ1bmN0aW9uKHRpY2tJbnRlcnZhbCkge1xuXG4gIC8qXG4gICAgVGhpcyB3b3JrZXIgcG9zdHMgb25seSBvbmUga2luZCBvZiBtZXNzYWdlICh2aWEgcG9zdE1lc3NhZ2UpLCBhXG4gICAgZGF0YSBvYmplY3QgY29uc2lzdGluZyBvZiB2YXJpb3VzIHRpbWUgcHJvcGVydGllcy5cbiAgKi9cblxuICB2YXIgcnVubmluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgaWYgKCFydW5uaW5nKVxuICAgICAgcmV0dXJuO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBwb3N0TWVzc2FnZSgnJyk7XG4gICAgICB0aWNrKCk7XG4gICAgfSwgdGlja0ludGVydmFsKTtcbiAgfTtcblxuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC5kYXRhLm1lc3NhZ2UgPT0gJ3N0b3AnKVxuICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIGVsc2UgaWYgKGV2ZW50LmRhdGEubWVzc2FnZSA9PSAnc3RhcnQnKSB7XG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIHRpY2soKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEubWVzc2FnZSA9PSAnc2V0VGlja0ludGVydmFsJylcbiAgICAgIHRpY2tJbnRlcnZhbCA9IGV2ZW50LmRhdGEudGlja0ludGVydmFsO1xuICB9KTtcblxufTtcbi8qKioqL1xuXG52YXIgVGltZXIgPSBmdW5jdGlvbihvcHRzKSB7XG4gIHRoaXMuY2hlY2tCcm93c2VyU3VwcG9ydCgpO1xuICBpZiAodHlwZW9mIG9wdHMgPT0gJ3VuZGVmaW5lZCcpXG4gICAgb3B0cyA9IHt9O1xuICB0aGlzLmV2ZW50cyA9IHtcbiAgICAndGljayc6IFtdXG4gIH07XG4gIHRoaXMudGlja0ludGVydmFsID0gb3B0cy50aWNrSW50ZXJ2YWwgfHwgMjU7XG4gIHRoaXMudGlja0NvdW50ID0gMDtcbiAgdGhpcy5lbGFwc2VkID0gMDtcbiAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgY2FsbGVkIG9ubHkgYWZ0ZXIgdGlja0ludGVydmFsIGhhdmUgYmVlbiBzZXQuXG4gIHRoaXMud29ya2VyID0gdGhpcy5jcmVhdGVXb3JrZXIoKTtcbiAgdGhpcy5vbigndGljaycsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xufTtcblxudmFyIGZuID0gVGltZXIucHJvdG90eXBlO1xuXG5mbi5jaGVja0Jyb3dzZXJTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmZWF0dXJlcyA9IFsnQmxvYicsICdXb3JrZXInLCAnVVJMJywgJ3BlcmZvcm1hbmNlJ107XG4gIGVhY2goZmVhdHVyZXMsIGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICBpZiAodHlwZW9mIHNlbGZbZmVhdHVyZV0gPT0gJ3VuZGVmaW5lZCcpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZmVhdHVyZSArICcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXIgZW52aXJvbm1lbnQuJyk7XG4gIH0pO1xufTtcblxuZm4uY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBibG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICBuZXcgQmxvYihbJygnLCB3b3JrZXJKcy50b1N0cmluZygpLCAnKSgnICsgdGhpcy50aWNrSW50ZXJ2YWwgKyAnKSddLCB7dHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnfSlcbiAgKTtcbiAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoYmxvYlVybCk7XG4gIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVybCk7XG4gIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLnRyaWdnZXIoJ3RpY2snLCBldmVudC5kYXRhKTtcbiAgfS5iaW5kKHRoaXMpKTtcbiAgcmV0dXJuIHdvcmtlcjtcbn07XG5cbmZuLmNoZWNrVmFsaWRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICBpZiAoIWhhcyh0aGlzLmV2ZW50cywgZXZlbnROYW1lKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IFwiJyArIGV2ZW50TmFtZSArICdcIiBub3QgYSB2YWxpZCBldmVudC4nKTtcbn1cblxuZm4udXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZHQgPSBub3coKSAtICh0aGlzLnN0YXJ0VGltZSArIHRoaXMuZWxhcHNlZCk7XG4gIHRoaXMuZWxhcHNlZCArPSB0aGlzLmR0O1xuICB0aGlzLnRpY2tDb3VudCsrO1xufTtcblxuZm4uc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgLypcbiAgICA8V2FybmluZz4gVGhpcyBtZXRob2QgaXMgYXN5bmNocm9ub3VzLiBTZWUgVGltZXIuc3RvcFxuICAqL1xuICB0aGlzLnN0YXJ0VGltZSA9IG5vdygpO1xuICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7bWVzc2FnZTogJ3N0YXJ0J30pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgLypcbiAgICA8V2FybmluZz46IFRoaXMgbWV0aG9kIGlzIGFzeW5jaHJvbm91cy4gQSB0aW1lciBkb2VzIG5vdCBzdG9wXG4gICAgaW1tZWRpYXRlbHkgd2hlbiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZC4gSXQgc3RvcHMgd2hlbiB0aGVcbiAgICBtZXNzYWdlIGlzIHBhc3NlZCB0byB0aGUgd29ya2VyLCB3aGljaCB0YWtlcyBhIGZldyBtaWxsaXNlY29uZHMgaW5cbiAgICBtb3N0IGNhc2VzLlxuICAqL1xuICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7bWVzc2FnZTogJ3N0b3AnfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ub24gPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHRoaXMuY2hlY2tWYWxpZEV2ZW50KGV2ZW50TmFtZSk7XG4gIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4udHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gIHRoaXMuY2hlY2tWYWxpZEV2ZW50KGV2ZW50TmFtZSk7XG4gIHZhciBldmVudEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBlYWNoKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0sIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgZXZlbnRBcmdzKTtcbiAgfSwgdGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4uc2V0VGlja0ludGVydmFsID0gZnVuY3Rpb24odGlja0ludGVydmFsKSB7XG4gIHRoaXMudGlja0ludGVydmFsID0gdGlja0ludGVydmFsO1xuICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgbWVzc2FnZTogJ3NldFRpY2tJbnRlcnZhbCcsXG4gICAgdGlja0ludGVydmFsOiB0aWNrSW50ZXJ2YWxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Jvd2VyX2NvbXBvbmVudHMvdGltZXIuanMvdGltZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxuICBkaXNwYXRjaGVyLmpzXG5cbiAgPFVzYWdlPlxuXG4gIHZhciBkID0gbmV3IERpc3BhdGNoZXIoKTtcblxuICBkLnN1YnNjcmliZSgnY2xpY2snLCBmdW5jdGlvbihldmVudCwgY291bnRlcikge1xuICAgICAuLi5cbiAgfSk7XG5cbiAgZC5kaXNwYXRjaCgnY2xpY2snLCBjbGlja0V2ZW50LCBjbGlja3MgKyAxKTtcblxuKi9cblxuZnVuY3Rpb24gRGlzcGF0Y2hlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IHt9O1xufVxuXG52YXIgZm4gPSBEaXNwYXRjaGVyLnByb3RvdHlwZTtcblxuZm4uc3Vic2NyaWJlID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgaWYgKCF0aGlzLmhhbmRsZXJzLmhhc093blByb3BlcnR5KGV2ZW50KSlcbiAgICB0aGlzLmhhbmRsZXJzW2V2ZW50XSA9IFtdO1xuICB0aGlzLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xufTtcblxuZm4ucHVibGlzaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmICghdGhpcy5oYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShldmVudCkpXG4gICAgcmV0dXJuO1xuICB2YXIgcmVzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHRoaXMuaGFuZGxlcnNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgIGhhbmRsZXIuYXBwbHkobnVsbCwgcmVzdCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Jvd2VyX2NvbXBvbmVudHMvZGlzcGF0Y2hlci9kaXNwYXRjaGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbiAgYXVkaW9zZXJ2aWNlLmpzXG5cbiAgPFVzYWdlPlxuICBsZXQgc2VxdWVuY2VyID0gbmV3IFNlcXVlbmNlcigpO1xuICBsZXQgYXVkaW9TZXJ2aWNlID0gbmV3IEF1ZGlvU2VydmljZSgpO1xuICBzZXF1ZW5jZXIuc3Vic2NyaWJlKCdwbGF5LWJsaXAnLCBibGlwU3RhdGUgPT4ge1xuICAgIGF1ZGlvU2VydmljZS5wbGF5QmxpcChibGlwU3RhdGUpO1xuICB9KTtcbiovXG5cbmxldCBkZWZhdWx0R2FpblZhbHVlID0gKCgpID0+IHtcbiAgbGV0IHZhbDtcbiAgcmV0dXJuIGF1ZGlvQ29udGV4dCA9PiB7XG4gICAgaWYgKHZhbClcbiAgICAgIHJldHVybiB2YWw7XG4gICAgdmFsID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKS5nYWluLnZhbHVlO1xuICAgIHJldHVybiB2YWw7XG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGF1ZGlvQ29udGV4dCwgc2FtcGxlTWFwPXt9KSB7XG4gICAgaWYgKGF1ZGlvQ29udGV4dCA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYW4gQXVkaW9Db250ZXh0IG9iamVjdC4nKTtcbiAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IGF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLnNhbXBsZU1hcCA9IHNhbXBsZU1hcDtcbiAgfVxuXG4gIHBsYXlCbGlwKGJsaXBTdGF0ZSkge1xuICAgIGlmIChibGlwU3RhdGUubXV0ZSB8fCAhYmxpcFN0YXRlLnNhbXBsZU5hbWUpXG4gICAgICByZXR1cm47XG4gICAgbGV0IHNvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHNvdXJjZS5idWZmZXIgPSB0aGlzLnNhbXBsZU1hcFtibGlwU3RhdGUuc2FtcGxlTmFtZV07XG4gICAgdGhpcy5saW5rTW9kaWZpZXJzKGJsaXBTdGF0ZSwgc291cmNlKTtcbiAgICBzb3VyY2UuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgc291cmNlLnN0YXJ0KHRoaXMuYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgYmxpcFN0YXRlLm9mZnNldCAvIDEwMDApO1xuICB9XG5cbiAgbGlua01vZGlmaWVycyhibGlwU3RhdGUsIHNvdXJjZSkge1xuICAgIC8vIExpbmtzIG1vZGlmaWVyIG5vZGVzIHRvIGEgYnVmZmVyIHNvdXJjZS5cbiAgICBzb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlID0gYmxpcFN0YXRlLnBsYXliYWNrUmF0ZTtcbiAgICBpZiAoYmxpcFN0YXRlLmdhaW4gIT0gZGVmYXVsdEdhaW5WYWx1ZSh0aGlzLmF1ZGlvQ29udGV4dCkpIHtcbiAgICAgIGxldCBnYWluTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgIGdhaW5Ob2RlLmdhaW4udmFsdWUgPSBibGlwU3RhdGUuZ2FpbjtcbiAgICAgIHNvdXJjZS5jb25uZWN0KGdhaW5Ob2RlKTtcbiAgICAgIGdhaW5Ob2RlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIH1cbiAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hdWRpb3NlcnZpY2UuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9