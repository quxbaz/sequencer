import Channel from 'lib/channel';

describe('Channel', () => {

  let channel;

  beforeEach(() => {
    channel = new Channel();
  });

  it("creates Blip objects with the same @sampleName state as its own.", () => {
    let channel = new Channel({sampleName: 'kick'});
    channel.state.blips.forEach((blip) => {
      blip.state.sampleName.should.eql('kick');
    });
  });

});
