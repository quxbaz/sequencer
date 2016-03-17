/*
  audioservice.js

  <Usage>
  let sequencer = new Sequencer();
  let audioService = new AudioService();
  sequencer.on('playBlip', blipState => {
    audioService.playBlip(blipState);
  });
*/

let defaultGainValue = (() => {
  let val;
  return audioContext => {
    if (val)
      return val;
    val = audioContext.createGain().gain.value;
    return val;
  };
})();

export default class AudioService {

  constructor(audioContext, sampleMap={}) {
    if (audioContext === undefined)
      throw Error('You must provide an AudioContext object.');
    this.audioContext = audioContext;
    this.sampleMap = sampleMap;
  }

  playBlip(state) {
    if (state.mute || !state.sample)
      return;
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sampleMap[state.sample];
    this.linkModifiers(state, source);
    source.connect(this.audioContext.destination);
    source.start(this.audioContext.currentTime + (state.offset || 0) / 1000);
  }

  linkModifiers(state, source) {
    // Links modifier nodes to a buffer source.
    source.playbackRate.value = state.rate;
    if (state.gain != defaultGainValue(this.audioContext)) {
      let gainNode = this.audioContext.createGain();
      gainNode.gain.value = state.gain;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
    }
  }

}
