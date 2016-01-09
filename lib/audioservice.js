export default class AudioService {

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.nodes = {
      // gain:
    };
  }

  play(blipState) {
    if (this.isMute())
      return this;
    let blip = this.props.blip;
    let source = this.audioContext.createBufferSource();

    source.buffer = app.am.getSampleBuffer(blip.get('sampleName'));

    this.linkModifiers(source);
    source.connect(this.audioContext.destination);
    source.start(this.audioContext.currentTime + blip.get('offset') / 1000);
  },

  linkModifiers(source) {
    // Links modifier nodes to a buffer source.
    source.playbackRate.value = this.playbackRate;
    if (this.gain != defaultGainValue(this.audioContext)) {
      let gainNode = this.audioContext.createGain();
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = this.gain;
    }
  }

}
