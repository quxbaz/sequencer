import Blip from 'lib/blip';

describe('Blip', () => {

  let blip;

  beforeEach(() => {
    blip = new Blip();
  });

  it("blips have unique ids.", () => {
    let ids = new Set();
    for (let i=0; i < 1000; i++)
      ids.add(new Blip().id);
    ids.size.should.eql(1000);
  });

  it("sets gain.", () => {
    blip.setState({gain: 2});
    blip.state.gain.should.eql(2);
  });

  it("sets rate.", () => {
    blip.setState({rate: 2});
    blip.state.rate.should.eql(2);
  });

  it("enforces a max rate.", () => {
    blip.setState({rate: 99});
    blip.state.rate.should.eql(blip.state.maxRate);
  });

  it("enforces a min rate.", () => {
    blip.setState({rate: -1});
    blip.state.rate.should.eql(blip.state.minRate);
  });

  it("enforces a max gain.", () => {
    blip.setState({gain: 99});
    blip.state.gain.should.eql(blip.state.maxGain);
  });

  it("enforces a min gain.", () => {
    blip.setState({gain: -1});
    blip.state.gain.should.eql(blip.state.minGain);
  });

  it("sets a new max gain and validates again it.", () => {
    blip.setState({gain: 99, maxGain: 200});
    blip.state.gain.should.eql(99);
  });

  it("sets a new min gain and validates again it.", () => {
    blip.setState({gain: -2, minGain: -3});
    blip.state.gain.should.eql(-2);
  });

  it("sets custom defaults.", () => {
    let defaults = require('lib/blip').defaults;
    defaults.offset = 60;
    new Blip().state.offset.should.eql(60);
  });

});
