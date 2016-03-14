import Base from 'lib/base';
import Sequencer from 'lib/sequencer';
import Channel from 'lib/channel';
import Blip from 'lib/blip';

describe("Base", () => {
  afterEach(() => {
    Base.observer.off('new');
  })
  it("triggers a 'new' event on instantiation.", () => {
    let spy = 0;
    Base.on('new', () => {
      spy++;
    });
    new Base();
    spy.should.eql(1);
    new Sequencer();
    spy.should.eql(2);
    new Blip();
    spy.should.eql(3);
    new Channel();
    spy.should.eql(20);  // 1 channel + 16 blips
  });
  it("'new' events are passed the created object.", () => {
    Base.on('new', (blip) => {
      (blip instanceof Blip).should.be.true;
    });
    new Blip();
  });
});
