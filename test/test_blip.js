import Blip from 'lib/blip';

describe('Blip', function() {

  let blip;

  beforeEach(() => {
    blip = new Blip();
  });

  it("sets gain.", function() {
    blip.setState({gain: 2});
    blip.state.gain.should.eql(2);
  });

  it("sets rate.", function() {
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

});
