import Channel from 'lib/channel';

describe('Channel', () => {

  let channel;

  beforeEach(() => {
    channel = new Channel();
  });

  it("creates default Blip objects that are mute.", () => {
    channel.state.blips.forEach((blip) => {
      blip.state.mute.should.be.true;
    });
  });

  it("creates default Blip objects with the same @sampleName state as its own.", () => {
    let channel = new Channel({sampleName: 'kick'});
    channel.state.blips.forEach((blip) => {
      blip.state.sampleName.should.eql('kick');
    });
  });

  it("does not play a beat if it's mute.", () => {
    let i = 0;
    channel.state.blips[0].play = () => i++;
    channel.playBeat(0);
    i.should.eql(1);
    channel.setState({mute: true});
    channel.playBeat(0);
    i.should.eql(1);
    channel.setState({mute: false});
    channel.playBeat(0);
    i.should.eql(2);
  });

  it("creates blips with the correct beat property.", () => {
    for (let i=0; i < channel.state.beats; i++)
      channel.state.blips[i].state.beat.should.eql(i);
  });

  it("Sets a blip with new properties.", () => {
    channel.setBlip(1, {gain: 4});
    channel.state.blips[1].state.gain.should.eql(4);
  });

});
