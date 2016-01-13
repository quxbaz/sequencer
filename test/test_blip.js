import Blip from 'lib/blip';

describe('Blip', () => {

  let blip;

  beforeEach(() => {
    blip = new Blip();
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

  // it("gainScale returns 1 on setting gain to max.", () => {
  //   blip.setState({gain: blip.state.maxGain});
  //   blip.state.gainScale.should.eql(1);
  // });

  // it("gainScale returns 0 on setting gain to min.", () => {
  //   blip.setState({gain: blip.state.minGain});
  //   blip.state.gainScale.should.eql(0);
  // });

  // it("gainScale returns 0.5 on setting gain to its middle.", () => {
  //   let middle = (blip.state.maxGain + blip.state.minGain) / 2;
  //   blip.setState({gain: middle});
  //   blip.state.gainScale.should.eql(0.5);
  // });

});
