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
	exports.AudioService = exports.Blip = exports.Channel = exports.Sequencer = undefined;
	
	var _sequencer = __webpack_require__(1);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _channel = __webpack_require__(3);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _blip = __webpack_require__(4);
	
	var _blip2 = _interopRequireDefault(_blip);
	
	var _audioservice = __webpack_require__(7);
	
	var _audioservice2 = _interopRequireDefault(_audioservice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Sequencer = _sequencer2.default;
	exports.Channel = _channel2.default;
	exports.Blip = _blip2.default;
	exports.AudioService = _audioservice2.default;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzkzN2NiOWE1N2M5YmRiODdiNTMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NlcXVlbmNlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3RhdGVmdWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2JsaXAuanMiLCJ3ZWJwYWNrOi8vLy4vYm93ZXJfY29tcG9uZW50cy90aW1lci5qcy90aW1lci5qcyIsIndlYnBhY2s6Ly8vLi9ib3dlcl9jb21wb25lbnRzL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXVkaW9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQ2hDRSxTQUFTO1NBQ1QsT0FBTztTQUNQLElBQUk7U0FDSixZQUFZLDBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVWQsVUFBUyxZQUFZLEdBQUc7QUFDdEIsVUFBTztBQUNMLFlBQU8sRUFBRSxLQUFLO0FBQ2QsZ0JBQVcsRUFBRSxDQUFDO0FBQ2QsaUJBQVksRUFBRSxHQUFHO0FBQ2pCLGFBQVEsRUFBRSxFQUFFO0lBQ2IsQ0FBQztFQUNIOztLQUVvQixTQUFTO0FBRTVCLFlBRm1CLFNBQVMsQ0FFaEIsS0FBSyxFQUFZOzs7U0FBVixLQUFLLHlEQUFDLEVBQUU7OzJCQUZSLFNBQVM7O0FBRzFCLFNBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNsRCxTQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixTQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFVLEVBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztBQUNoRSxTQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBTTtBQUMxQixXQUFJLE1BQUssS0FBSyxDQUFDLE9BQU8sRUFDcEIsTUFBSyxJQUFJLEVBQUUsQ0FBQztNQUNmLENBQUMsQ0FBQztBQUNILFNBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzNCOztnQkFYa0IsU0FBUzs7NEJBYXJCO0FBQ0wsV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFdBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3RCLGFBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbkIsYUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDMUI7TUFDRjs7OzZCQUVPO0FBQ04sV0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO01BQzVCOzs7NEJBRU07Ozs7QUFJTCxXQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDdkIsV0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BQ3BCOzs7dUNBRWlCOzs7Ozs7QUFDaEIsOEJBQW9CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtlQUE5QixPQUFPOztBQUNkLGtCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7VUFBQTs7Ozs7Ozs7Ozs7Ozs7O01BQzVDOzs7bUNBRWE7QUFDWixXQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7TUFDNUQ7OztrQ0FFb0I7OztXQUFWLEtBQUsseURBQUMsRUFBRTs7QUFDakIsV0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN0QixzQkFBWSxLQUFLLEVBQUU7QUFDakIsZUFBTSxFQUFFLHlCQUFTO2tCQUFJLE9BQUssT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7VUFBQTtRQUMxRCxDQUFDLENBQ0gsQ0FBQztNQUNIOzs7VUFoRGtCLFNBQVM7OzttQkFBVCxTQUFTOztBQW9EOUIsS0FBSSxVQUFVLEdBQUcsMEJBQWdCLENBQUM7QUFDbEMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLG1CQUFTLEtBQUssRUFBRTtBQUNqRCxZQUFTLEVBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2pELFVBQU8sRUFBSyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7RUFDaEQsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUssS0FBSSxLQUFLLFdBQUwsS0FBSyxHQUFHO0FBQ2pCLFdBQVEsb0JBQUMsS0FBSyxFQUFFO0FBQ2QsU0FBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbEIsV0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xDO0VBQ0YsQ0FBQzs7bUJBRWE7QUFDYixRQUFLLEVBQUwsS0FBSztFQUNOLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRCxVQUFTLFlBQVksR0FBRztBQUN0QixPQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN2QixVQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsQ0FBQztJQUN6QixPQUFPO0FBQ0wsZUFBVSxFQUFFLEVBQUU7QUFDZCxVQUFLLEVBQUwsS0FBSztJQUNOLENBQUM7RUFDSDs7S0FFb0IsT0FBTztBQUUxQixZQUZtQixPQUFPLENBRWQsS0FBSyxFQUFZO1NBQVYsS0FBSyx5REFBQyxFQUFFOzsyQkFGUixPQUFPOztBQUd4QixTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7OztBQUNsRCw0QkFBaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO2FBQXhCLElBQUk7O0FBQ1gsYUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ25DLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCOztnQkFQa0IsT0FBTzs7OEJBU2pCLElBQUksRUFBRTtBQUNiLFdBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO01BQy9COzs7VUFYa0IsT0FBTzs7O21CQUFQLE9BQU87O0FBZTVCLE9BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxtQkFBUyxLQUFLLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJoRCxVQUFTLFlBQVksR0FBRztBQUN0QixVQUFPO0FBQ0wsZUFBVSxFQUFLLEVBQUU7QUFDakIsU0FBSSxFQUFXLEtBQUs7QUFDcEIsYUFBUSxFQUFPLEdBQUc7QUFDbEIsV0FBTSxFQUFTLENBQUM7QUFDaEIsU0FBSSxFQUFXLENBQUM7QUFDaEIsaUJBQVksRUFBRyxDQUFDO0lBQ2pCLENBQUM7RUFDSDs7S0FFb0IsSUFBSTtBQUV2QixZQUZtQixJQUFJLENBRVgsS0FBSyxFQUFZO1NBQVYsS0FBSyx5REFBQyxFQUFFOzsyQkFGUixJQUFJOztBQUdyQixTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbEQsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEI7O2dCQUxrQixJQUFJOzs0QkFPaEI7QUFDTCxXQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDL0I7OztVQVRrQixJQUFJOzs7bUJBQUosSUFBSTs7QUFhekIsT0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG1CQUFTLEtBQUssQ0FBQyxDOzs7Ozs7QUM5QjdDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBMkIsa0JBQWtCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSwyRUFBMEUsK0JBQStCO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTs7Ozs7OztBQ3RLQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQSxLQUFJLGdCQUFnQixHQUFJLFlBQU07QUFDNUIsT0FBSSxHQUFHLGFBQUM7QUFDUixVQUFPLHNCQUFZLEVBQUk7QUFDckIsU0FBSSxHQUFHLEVBQ0wsT0FBTyxHQUFHLENBQUM7QUFDYixRQUFHLEdBQUcsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDM0MsWUFBTyxHQUFHLENBQUM7SUFDWixDQUFDO0VBQ0gsRUFBRyxDQUFDOztLQUVnQixZQUFZO0FBRS9CLFlBRm1CLFlBQVksQ0FFbkIsWUFBWSxFQUFnQjtTQUFkLFNBQVMseURBQUMsRUFBRTs7MkJBRm5CLFlBQVk7O0FBRzdCLFNBQUksWUFBWSxLQUFLLFNBQVMsRUFDNUIsTUFBTSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUMxRCxTQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNqQyxTQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1Qjs7Z0JBUGtCLFlBQVk7OzhCQVN0QixTQUFTLEVBQUU7QUFDbEIsV0FBSSxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDekMsT0FBTztBQUNULFdBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUNwRCxhQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JELFdBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLGFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5QyxhQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7TUFDdkU7OzttQ0FFYSxTQUFTLEVBQUUsTUFBTSxFQUFFOztBQUUvQixhQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQ25ELFdBQUksU0FBUyxDQUFDLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDekQsYUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM5QyxpQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUNyQyxlQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLGlCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQ7TUFDRjs7O1VBNUJrQixZQUFZOzs7bUJBQVosWUFBWSxDIiwiZmlsZSI6InNlcXVlbmNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjOTM3Y2I5YTU3YzliZGI4N2I1M1xuICoqLyIsImltcG9ydCBTZXF1ZW5jZXIgZnJvbSAnLi9saWIvc2VxdWVuY2VyJztcbmltcG9ydCBDaGFubmVsIGZyb20gJy4vbGliL2NoYW5uZWwnO1xuaW1wb3J0IEJsaXAgZnJvbSAnLi9saWIvYmxpcCc7XG5pbXBvcnQgQXVkaW9TZXJ2aWNlIGZyb20gJy4vbGliL2F1ZGlvc2VydmljZSc7XG5cbmV4cG9ydCB7XG4gIFNlcXVlbmNlcixcbiAgQ2hhbm5lbCxcbiAgQmxpcCxcbiAgQXVkaW9TZXJ2aWNlXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsIi8qXG4gIHNlcXVlbmNlci5qc1xuXG4gIDxVc2FnZT5cblxuICBsZXQgc2VxdWVuY2VyID0gbmV3IFNlcXVlbmNlcigpO1xuICBzZXF1ZW5jZXIucGxheSgpO1xuXG4gIDxUT0RPPlxuICAtIE1vdmUgdGhpcyBmaWxlIHRvIC9saWIuXG4gIC0gQ3JlYXRlIGZpbGUgY2FsbGVkIGluZGV4LlxuICAtIGV4cG9ydCB0aGlzLCBhdWRpb3NlcnZpY2UsIGJsaXAsIGFuZCBjaGFubmVsIGZyb20gaW5kZXguXG4qL1xuXG5pbXBvcnQgc3RhdGVmdWwgZnJvbSAnLi9zdGF0ZWZ1bCc7XG5pbXBvcnQgQ2hhbm5lbCBmcm9tICcuL2NoYW5uZWwnO1xuaW1wb3J0IFRpbWVyIGZyb20gJ3RpbWVyJztcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJ2Rpc3BhdGNoZXInO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgcGxheWluZzogZmFsc2UsXG4gICAgY3VycmVudEJlYXQ6IDAsXG4gICAgYmVhdER1cmF0aW9uOiAyMDAsXG4gICAgY2hhbm5lbHM6IFtdXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcXVlbmNlciB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHByb3BzPXt9KSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdFN0YXRlKCksIHN0YXRlKTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcih7dGlja0ludGVydmFsOiB0aGlzLnN0YXRlLmJlYXREdXJhdGlvbn0pO1xuICAgIHRoaXMudGltZXIub24oJ3RpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5wbGF5aW5nKVxuICAgICAgICB0aGlzLnRpY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLnRpbWVyU3RhcnRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnN0YXRlLnBsYXlpbmcgPSB0cnVlO1xuICAgIGlmICghdGhpcy50aW1lclN0YXJ0ZWQpIHtcbiAgICAgIHRoaXMudGltZXIuc3RhcnQoKTtcbiAgICAgIHRoaXMudGltZXJTdGFydGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICB0aGlzLnN0YXRlLnBsYXlpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgLypcbiAgICAgIFBsYXlzIGEgYmVhdCBhbmQgbW92ZXMgb250byB0aGUgbmV4dCBvbmUuXG4gICAgKi9cbiAgICB0aGlzLnBsYXlDdXJyZW50QmVhdCgpO1xuICAgIHRoaXMuYWR2YW5jZUJlYXQoKTtcbiAgfVxuXG4gIHBsYXlDdXJyZW50QmVhdCgpIHtcbiAgICBmb3IgKGxldCBjaGFubmVsIG9mIHRoaXMuc3RhdGUuY2hhbm5lbHMpXG4gICAgICBjaGFubmVsLnBsYXlCZWF0KHRoaXMuc3RhdGUuY3VycmVudEJlYXQpO1xuICB9XG5cbiAgYWR2YW5jZUJlYXQoKSB7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50QmVhdCA9ICh0aGlzLnN0YXRlLmN1cnJlbnRCZWF0ICsgMSkgJSAxNjtcbiAgfVxuXG4gIGFkZENoYW5uZWwoc3RhdGU9e30pIHtcbiAgICB0aGlzLnN0YXRlLmNoYW5uZWxzLnB1c2goXG4gICAgICBuZXcgQ2hhbm5lbChzdGF0ZSwge1xuICAgICAgICBvblBsYXk6IGJsaXBTdGF0ZSA9PiB0aGlzLnB1Ymxpc2goJ3BsYXktYmxpcCcsIGJsaXBTdGF0ZSlcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG5cbmxldCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcbk9iamVjdC5hc3NpZ24oU2VxdWVuY2VyLnByb3RvdHlwZSwgc3RhdGVmdWwubWl4aW4sIHtcbiAgc3Vic2NyaWJlIDogZGlzcGF0Y2hlci5zdWJzY3JpYmUuYmluZChkaXNwYXRjaGVyKSxcbiAgcHVibGlzaCAgIDogZGlzcGF0Y2hlci5wdWJsaXNoLmJpbmQoZGlzcGF0Y2hlcilcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvc2VxdWVuY2VyLmpzXG4gKiovIiwiLypcbiAgc3RhdGVmdWwuanNcblxuICBNaXhpbiBmb3Igc3RhdGVmdWwgb2JqZWN0cy5cblxuICA8VE9ETz5cbiAgVGhpcyBuZWVkcyB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlIGV2ZW50IHdoZW5ldmVyIHRoZSBzdGF0ZVxuICBjaGFuZ2VzLlxuKi9cblxuZXhwb3J0IGxldCBtaXhpbiA9IHtcbiAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgc3RhdGUpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1peGluXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvc3RhdGVmdWwuanNcbiAqKi8iLCIvKlxuICBjaGFubmVsLmpzXG4qL1xuXG5pbXBvcnQgc3RhdGVmdWwgZnJvbSAnLi9zdGF0ZWZ1bCc7XG5pbXBvcnQgQmxpcCBmcm9tICcuL2JsaXAnO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGUoKSB7XG4gIGxldCBibGlwcyA9IFtdO1xuICBmb3IgKHZhciBpPTA7IGkgPCAxNjsgaSsrKVxuICAgIGJsaXBzLnB1c2gobmV3IEJsaXAoKSk7XG4gIHJldHVybiB7XG4gICAgc2FtcGxlTmFtZTogJycsXG4gICAgYmxpcHNcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbm5lbCB7XG5cbiAgY29uc3RydWN0b3Ioc3RhdGUsIHByb3BzPXt9KSB7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdFN0YXRlKCksIHN0YXRlKTtcbiAgICBmb3IgKGxldCBibGlwIG9mIHRoaXMuc3RhdGUuYmxpcHMpXG4gICAgICBibGlwLnByb3BzLm9uUGxheSA9IHByb3BzLm9uUGxheTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIH1cblxuICBwbGF5QmVhdChiZWF0KSB7XG4gICAgdGhpcy5zdGF0ZS5ibGlwc1tiZWF0XS5wbGF5KCk7XG4gIH1cblxufVxuXG5PYmplY3QuYXNzaWduKENoYW5uZWwucHJvdG90eXBlLCBzdGF0ZWZ1bC5taXhpbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9jaGFubmVsLmpzXG4gKiovIiwiLypcbiAgYmxpcC5qc1xuKi9cblxuaW1wb3J0IHN0YXRlZnVsIGZyb20gJy4vc3RhdGVmdWwnO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGUoKSB7XG4gIHJldHVybiB7XG4gICAgc2FtcGxlTmFtZSAgIDogJycsXG4gICAgbXV0ZSAgICAgICAgIDogZmFsc2UsXG4gICAgZHVyYXRpb24gICAgIDogMjAwLFxuICAgIG9mZnNldCAgICAgICA6IDAsXG4gICAgZ2FpbiAgICAgICAgIDogMSxcbiAgICBwbGF5YmFja1JhdGUgOiAxXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsaXAge1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlLCBwcm9wcz17fSkge1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRTdGF0ZSgpLCBzdGF0ZSk7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLnByb3BzLm9uUGxheSh0aGlzLnN0YXRlKTtcbiAgfVxuXG59XG5cbk9iamVjdC5hc3NpZ24oQmxpcC5wcm90b3R5cGUsIHN0YXRlZnVsLm1peGluKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2JsaXAuanNcbiAqKi8iLCIvKlxuICB0aW1lci5qc1xuXG4gIDxVc2FnZT5cblxuICAgLy8gQ3JlYXRlcyBhIHRpbWVyIHRoYXQgdGlja3MgZXZlcnkgMTAwbXMuXG4gIHZhciB0ID0gbmV3IHRpbWVyLlRpbWVyKHt0aWNrSW50ZXJ2YWw6IDEwMH0pO1xuXG4gIC8vIFRoZSB0aW1lciB3aWxsIHN0b3AgYWZ0ZXIgdGlja2luZyAxMCB0aW1lcy5cbiAgdC5vbigndGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHQuZWxhcHNlZCk7XG4gICAgaWYgKHQudGlja0NvdW50ID09IDEwKVxuICAgICAgdC5zdG9wKCk7XG4gIH0pO1xuXG4qL1xuXG5cbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KGtleSk7XG59XG5cbmZ1bmN0aW9uIGVhY2goY29sbCwgZm4sIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY29sbCkpIHtcbiAgICBmb3IgKHZhciBpPTA7IGkgPCBjb2xsLmxlbmd0aDsgaSsrKVxuICAgICAgZm4uY2FsbChjb250ZXh0LCBjb2xsW2ldLCBpKTtcbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKHZhciBrIGluIGNvbGwpIHtcbiAgICAgIGlmIChjb2xsLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICBmbi5jYWxsKGNvbnRleHQsIGNvbGxba10sIGspO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbn07XG5cbi8qXG4gIFRoaXMgaXMgd2Vid29ya2VyIGNvZGUgdGhhdCBzaG91bGQgYmUgdHJlYXRlZCBhcyBpZiBpdCB3ZXJlIG9uXG4gIGFub3RoZXIgcGFnZS91cmwuIEl0IHNob3VsZCBub3QgcmVmZXJlbmNlIGFueSBvdGhlclxuICBjb2RlL3ZhcmlhYmxlcy9mdW5jdGlvbnMgZXhjZXB0IHdoYXQgaXMgZGVjbGFyZWQgd2l0aGluIGl0c2VsZi5cbiovXG52YXIgd29ya2VySnMgPSBmdW5jdGlvbih0aWNrSW50ZXJ2YWwpIHtcblxuICAvKlxuICAgIFRoaXMgd29ya2VyIHBvc3RzIG9ubHkgb25lIGtpbmQgb2YgbWVzc2FnZSAodmlhIHBvc3RNZXNzYWdlKSwgYVxuICAgIGRhdGEgb2JqZWN0IGNvbnNpc3Rpbmcgb2YgdmFyaW91cyB0aW1lIHByb3BlcnRpZXMuXG4gICovXG5cbiAgdmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIGlmICghcnVubmluZylcbiAgICAgIHJldHVybjtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcG9zdE1lc3NhZ2UoJycpO1xuICAgICAgdGljaygpO1xuICAgIH0sIHRpY2tJbnRlcnZhbCk7XG4gIH07XG5cbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YS5tZXNzYWdlID09ICdzdG9wJylcbiAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBlbHNlIGlmIChldmVudC5kYXRhLm1lc3NhZ2UgPT0gJ3N0YXJ0Jykge1xuICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICB0aWNrKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kYXRhLm1lc3NhZ2UgPT0gJ3NldFRpY2tJbnRlcnZhbCcpXG4gICAgICB0aWNrSW50ZXJ2YWwgPSBldmVudC5kYXRhLnRpY2tJbnRlcnZhbDtcbiAgfSk7XG5cbn07XG4vKioqKi9cblxudmFyIFRpbWVyID0gZnVuY3Rpb24ob3B0cykge1xuICB0aGlzLmNoZWNrQnJvd3NlclN1cHBvcnQoKTtcbiAgaWYgKHR5cGVvZiBvcHRzID09ICd1bmRlZmluZWQnKVxuICAgIG9wdHMgPSB7fTtcbiAgdGhpcy5ldmVudHMgPSB7XG4gICAgJ3RpY2snOiBbXVxuICB9O1xuICB0aGlzLnRpY2tJbnRlcnZhbCA9IG9wdHMudGlja0ludGVydmFsIHx8IDI1O1xuICB0aGlzLnRpY2tDb3VudCA9IDA7XG4gIHRoaXMuZWxhcHNlZCA9IDA7XG4gIC8vIE1ha2Ugc3VyZSB0aGlzIGlzIGNhbGxlZCBvbmx5IGFmdGVyIHRpY2tJbnRlcnZhbCBoYXZlIGJlZW4gc2V0LlxuICB0aGlzLndvcmtlciA9IHRoaXMuY3JlYXRlV29ya2VyKCk7XG4gIHRoaXMub24oJ3RpY2snLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbn07XG5cbnZhciBmbiA9IFRpbWVyLnByb3RvdHlwZTtcblxuZm4uY2hlY2tCcm93c2VyU3VwcG9ydCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZmVhdHVyZXMgPSBbJ0Jsb2InLCAnV29ya2VyJywgJ1VSTCcsICdwZXJmb3JtYW5jZSddO1xuICBlYWNoKGZlYXR1cmVzLCBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmW2ZlYXR1cmVdID09ICd1bmRlZmluZWQnKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGZlYXR1cmUgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyIGVudmlyb25tZW50LicpO1xuICB9KTtcbn07XG5cbmZuLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYmxvYlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoXG4gICAgbmV3IEJsb2IoWycoJywgd29ya2VySnMudG9TdHJpbmcoKSwgJykoJyArIHRoaXMudGlja0ludGVydmFsICsgJyknXSwge3R5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0J30pXG4gICk7XG4gIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKGJsb2JVcmwpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy50cmlnZ2VyKCd0aWNrJywgZXZlbnQuZGF0YSk7XG4gIH0uYmluZCh0aGlzKSk7XG4gIHJldHVybiB3b3JrZXI7XG59O1xuXG5mbi5jaGVja1ZhbGlkRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgaWYgKCFoYXModGhpcy5ldmVudHMsIGV2ZW50TmFtZSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCBcIicgKyBldmVudE5hbWUgKyAnXCIgbm90IGEgdmFsaWQgZXZlbnQuJyk7XG59XG5cbmZuLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmR0ID0gbm93KCkgLSAodGhpcy5zdGFydFRpbWUgKyB0aGlzLmVsYXBzZWQpO1xuICB0aGlzLmVsYXBzZWQgKz0gdGhpcy5kdDtcbiAgdGhpcy50aWNrQ291bnQrKztcbn07XG5cbmZuLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIC8qXG4gICAgPFdhcm5pbmc+IFRoaXMgbWV0aG9kIGlzIGFzeW5jaHJvbm91cy4gU2VlIFRpbWVyLnN0b3BcbiAgKi9cbiAgdGhpcy5zdGFydFRpbWUgPSBub3coKTtcbiAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe21lc3NhZ2U6ICdzdGFydCd9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIC8qXG4gICAgPFdhcm5pbmc+OiBUaGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMuIEEgdGltZXIgZG9lcyBub3Qgc3RvcFxuICAgIGltbWVkaWF0ZWx5IHdoZW4gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQuIEl0IHN0b3BzIHdoZW4gdGhlXG4gICAgbWVzc2FnZSBpcyBwYXNzZWQgdG8gdGhlIHdvcmtlciwgd2hpY2ggdGFrZXMgYSBmZXcgbWlsbGlzZWNvbmRzIGluXG4gICAgbW9zdCBjYXNlcy5cbiAgKi9cbiAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe21lc3NhZ2U6ICdzdG9wJ30pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLm9uID0gZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB0aGlzLmNoZWNrVmFsaWRFdmVudChldmVudE5hbWUpO1xuICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudE5hbWUsIGV2ZW50QXJncykge1xuICB0aGlzLmNoZWNrVmFsaWRFdmVudChldmVudE5hbWUpO1xuICB2YXIgZXZlbnRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgZWFjaCh0aGlzLmV2ZW50c1tldmVudE5hbWVdLCBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGV2ZW50QXJncyk7XG4gIH0sIHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnNldFRpY2tJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpY2tJbnRlcnZhbCkge1xuICB0aGlzLnRpY2tJbnRlcnZhbCA9IHRpY2tJbnRlcnZhbDtcbiAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgIG1lc3NhZ2U6ICdzZXRUaWNrSW50ZXJ2YWwnLFxuICAgIHRpY2tJbnRlcnZhbDogdGlja0ludGVydmFsXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ib3dlcl9jb21wb25lbnRzL3RpbWVyLmpzL3RpbWVyLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcbiAgZGlzcGF0Y2hlci5qc1xuXG4gIDxVc2FnZT5cblxuICB2YXIgZCA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbiAgZC5zdWJzY3JpYmUoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQsIGNvdW50ZXIpIHtcbiAgICAgLi4uXG4gIH0pO1xuXG4gIGQuZGlzcGF0Y2goJ2NsaWNrJywgY2xpY2tFdmVudCwgY2xpY2tzICsgMSk7XG5cbiovXG5cbmZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSB7fTtcbn1cblxudmFyIGZuID0gRGlzcGF0Y2hlci5wcm90b3R5cGU7XG5cbmZuLnN1YnNjcmliZSA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gIGlmICghdGhpcy5oYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShldmVudCkpXG4gICAgdGhpcy5oYW5kbGVyc1tldmVudF0gPSBbXTtcbiAgdGhpcy5oYW5kbGVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbn07XG5cbmZuLnB1Ymxpc2ggPSBmdW5jdGlvbihldmVudCkge1xuICBpZiAoIXRoaXMuaGFuZGxlcnMuaGFzT3duUHJvcGVydHkoZXZlbnQpKVxuICAgIHJldHVybjtcbiAgdmFyIHJlc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB0aGlzLmhhbmRsZXJzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICBoYW5kbGVyLmFwcGx5KG51bGwsIHJlc3QpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ib3dlcl9jb21wb25lbnRzL2Rpc3BhdGNoZXIvZGlzcGF0Y2hlci5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXG4gIGF1ZGlvc2VydmljZS5qc1xuXG4gIDxVc2FnZT5cbiAgbGV0IHNlcXVlbmNlciA9IG5ldyBTZXF1ZW5jZXIoKTtcbiAgbGV0IGF1ZGlvU2VydmljZSA9IG5ldyBBdWRpb1NlcnZpY2UoKTtcbiAgc2VxdWVuY2VyLnN1YnNjcmliZSgncGxheS1ibGlwJywgYmxpcFN0YXRlID0+IHtcbiAgICBhdWRpb1NlcnZpY2UucGxheUJsaXAoYmxpcFN0YXRlKTtcbiAgfSk7XG4qL1xuXG5sZXQgZGVmYXVsdEdhaW5WYWx1ZSA9ICgoKSA9PiB7XG4gIGxldCB2YWw7XG4gIHJldHVybiBhdWRpb0NvbnRleHQgPT4ge1xuICAgIGlmICh2YWwpXG4gICAgICByZXR1cm4gdmFsO1xuICAgIHZhbCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCkuZ2Fpbi52YWx1ZTtcbiAgICByZXR1cm4gdmFsO1xuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihhdWRpb0NvbnRleHQsIHNhbXBsZU1hcD17fSkge1xuICAgIGlmIChhdWRpb0NvbnRleHQgPT09IHVuZGVmaW5lZClcbiAgICAgIHRocm93IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGFuIEF1ZGlvQ29udGV4dCBvYmplY3QuJyk7XG4gICAgdGhpcy5hdWRpb0NvbnRleHQgPSBhdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5zYW1wbGVNYXAgPSBzYW1wbGVNYXA7XG4gIH1cblxuICBwbGF5QmxpcChibGlwU3RhdGUpIHtcbiAgICBpZiAoYmxpcFN0YXRlLm11dGUgfHwgIWJsaXBTdGF0ZS5zYW1wbGVOYW1lKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCBzb3VyY2UgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzb3VyY2UuYnVmZmVyID0gdGhpcy5zYW1wbGVNYXBbYmxpcFN0YXRlLnNhbXBsZU5hbWVdO1xuICAgIHRoaXMubGlua01vZGlmaWVycyhibGlwU3RhdGUsIHNvdXJjZSk7XG4gICAgc291cmNlLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNvdXJjZS5zdGFydCh0aGlzLmF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGJsaXBTdGF0ZS5vZmZzZXQgLyAxMDAwKTtcbiAgfVxuXG4gIGxpbmtNb2RpZmllcnMoYmxpcFN0YXRlLCBzb3VyY2UpIHtcbiAgICAvLyBMaW5rcyBtb2RpZmllciBub2RlcyB0byBhIGJ1ZmZlciBzb3VyY2UuXG4gICAgc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IGJsaXBTdGF0ZS5wbGF5YmFja1JhdGU7XG4gICAgaWYgKGJsaXBTdGF0ZS5nYWluICE9IGRlZmF1bHRHYWluVmFsdWUodGhpcy5hdWRpb0NvbnRleHQpKSB7XG4gICAgICBsZXQgZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgICBnYWluTm9kZS5nYWluLnZhbHVlID0gYmxpcFN0YXRlLmdhaW47XG4gICAgICBzb3VyY2UuY29ubmVjdChnYWluTm9kZSk7XG4gICAgICBnYWluTm9kZS5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB9XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXVkaW9zZXJ2aWNlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==