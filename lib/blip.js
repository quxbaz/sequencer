/*
  blip.js
*/

import stateful from './stateful';

function defaultState() {
  return {
    sampleName   : '',
    mute         : false,
    duration     : 200,
    offset       : 0,
    gain         : 1,
    playbackRate : 1
  };
}

export default class Blip {

  constructor(state, props={}) {
    this.state = Object.assign(defaultState(), state);
    this.props = props;
  }

  play() {
    this.props.onPlay(this.state);
  }

}

Object.assign(Blip.prototype, stateful.mixin);
