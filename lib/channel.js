/*
  channel.js
*/

import stateful from './stateful';
import Blip from './blip';

function defaultState() {
  let blips = [];
  for (var i=0; i < 16; i++)
    blips.push(new Blip());
  return {
    sampleName: '',
    blips
  };
}

export default class Channel {

  constructor(state, props={}) {
    this.state = Object.assign(defaultState(), state);
    for (let blip of this.state.blips)
      blip.props.onPlay = props.onPlay;
    this.props = props;
  }

  playBeat(beat) {
    this.state.blips[beat].play();
  }

}

Object.assign(Channel.prototype, stateful.mixin);
