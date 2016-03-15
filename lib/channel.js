/*
  channel
*/

import Base from './base';
import {assign} from './util';
import Blip from './blip';
import {channelDefaults} from './defaults';

export default class Channel extends Base {

  constructor(state={}, props={}) {
    let mergedState = assign({}, channelDefaults, state);
    let blips = makeBlips(mergedState.beats);
    super(assign({blips}, mergedState));
    this.props = props;
    this.state.blips.forEach((blip) => {
      blip.props.onPlay = (blipState) => props.onPlay(blipState, this);
      if (!blip.state.sample)
        blip.setState({sample: this.state.sample});
    });
  }

  playBeat(beat) {
    if (!this.state.mute)
      this.state.blips[beat].play();
  }

}

function makeBlips(beats) {
  let blips = [];
  for (let i=0; i < beats; i++)
    blips.push(new Blip({beat: i, mute: true}));
  return blips;
}
