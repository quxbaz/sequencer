import http from './bower_components/http.js/http';
import AudioService from 'lib/audioservice';
import Blip from 'lib/blip';

function decodeAudioData(audioContext, audioBuffer) {
  return new Promise(resolve => {
    audioContext.decodeAudioData(audioBuffer, decoded =>
      resolve(decoded)
    );
  });
}

function getSoundSample(audioContext) {
  let args = ['/hihat.mp3', {responseType: 'arraybuffer'}];
  return http.get(...args).then(audioBuffer =>
    decodeAudioData(audioContext, audioBuffer)
  );
}

describe("AudioService", function() {

  let audioService;
  let audioContext = new AudioContext();
  let hihatSample;

  before(() => {
    return getSoundSample(audioContext).then(sample => {
      hihatSample = sample;
    });
  });

  beforeEach(() => {
    audioService = new AudioService(audioContext, {
      'hihat': hihatSample
    });
  });

  it("should play two audible hihat sounds (this test will always pass).", () => {
    let blip = new Blip({sampleName: 'hihat'});
    audioService.playBlip(blip.state);
    setTimeout(() => {
      audioService.playBlip(blip.state);
    }, 200);
  });

});
