import Sequencer from 'lib/sequencer';

describe("Sequencer", () => {

  let sequencer;

  beforeEach(() => {
    sequencer = new Sequencer();
  });

  it("initializes a Sequencer object with custom state.", () => {
    let sequencer = new Sequencer({
      currentBeat: 8,
      beatDuration: 420
    });
    sequencer.state.currentBeat.should.eql(8);
    sequencer.state.beatDuration.should.eql(420);
  });

  it("plays and alters its state.", () => {
    sequencer.play();
    sequencer.state.playing.should.be.true;
  });

  it("pauses and alters its state.", () => {
    sequencer.pause();
    sequencer.state.playing.should.be.false;
  });

  it("ticks and advances the beat.", () => {
    let beat = sequencer.state.currentBeat;
    sequencer.tick();
    sequencer.state.currentBeat.should.eql(beat + 1);
    sequencer.tick();
    sequencer.state.currentBeat.should.eql(beat + 2);
  });

  it("ticks for sixteen beats and ends on the last beat.", () => {
    for (let i=0; i < 16; i++)
      sequencer.tick();
    sequencer.state.currentBeat.should.eql(15);
  });

  it("adds a channel.", () => {
    sequencer.state.channels.length.should.eql(0);
    sequencer.addChannel();
    sequencer.state.channels.length.should.eql(1);
  });

  it("publishes a 'playBlip' message.", () => {
    let i = 1;
    sequencer.on('playBlip', (n) => i += n);
    sequencer.trigger('playBlip', 2);
    i.should.eql(3);
  });

});
