/*
  sequencer.js

  <Usage>

  let sequencer = new Sequencer();
  sequencer.play();

  <TODO>
  - Move this file to /lib.
  - Create file called index.
  - export this, audioservice, blip, and channel from index.
*/

import stateful from './stateful';
import Channel from './channel';
import Timer from 'timer';
import Dispatcher from 'dispatcher';

function defaultState() {
  return {
    playing: false,
    currentBeat: 0,
    beatDuration: 200,
    channels: []
  };
}

export default class Sequencer {

  constructor(state, props={}) {
    this.state = Object.assign(defaultState(), state);
    this.props = props;
    this.timer = new Timer({tickInterval: this.state.beatDuration});
    this.timer.on('tick', () => {
      if (this.state.playing)
        this.tick();
    });
    this.timerStarted = false;
  }

  play() {
    this.state.playing = true;
    if (!this.timerStarted) {
      this.timer.start();
      this.timerStarted = true;
    }
  }

  pause() {
    this.state.playing = false;
  }

  tick() {
    /*
      Plays a beat and moves onto the next one.
    */
    this.playCurrentBeat();
    this.advanceBeat();
  }

  playCurrentBeat() {
    for (let channel of this.state.channels)
      channel.playBeat(this.state.currentBeat);
  }

  advanceBeat() {
    this.state.currentBeat = (this.state.currentBeat + 1) % 16;
  }

  addChannel(state={}) {
    this.state.channels.push(
      new Channel(state, {
        onPlay: blipState => this.publish('play-blip', blipState)
      })
    );
  }

}

let dispatcher = new Dispatcher();
Object.assign(Sequencer.prototype, stateful.mixin, {
  subscribe : dispatcher.subscribe.bind(dispatcher),
  publish   : dispatcher.publish.bind(dispatcher)
});
