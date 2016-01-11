/*
  blip.js
*/

import stateful from './stateful';

function defaultState() {
  return {

    sampleName : '',
    mute       : false,
    duration   : 200,
    offset     : 0,

    gain       : 1,
    minGain    : 0,
    maxGain    : 10,

    rate       : 1,
    minRate    : 0.05,
    maxRate    : 4

  };
}

export default class Blip {

  constructor(state, props={}) {
    this.state = Object.assign(defaultState(), state);
    this.props = props;
  }

  validateState(newState) {
    newState.gain = Math.min(newState.gain, this.state.maxGain);
    newState.gain = Math.max(newState.gain, this.state.minGain);
    newState.rate = Math.min(newState.rate, this.state.maxRate);
    newState.rate = Math.max(newState.rate, this.state.minRate);
    return newState;
  }

  play() {
    this.props.onPlay(this.state);
  }

}

Object.assign(Blip.prototype, stateful.mixin);
