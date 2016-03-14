require('node_modules/chai/index.js').should();
import './test_base';
import './test_sequencer';
import './test_channel';
import './test_blip';
import './test_audioservice';


// Inline tests

import * as util from 'lib/util';

describe("lib/util", () => {
  describe("uniqid()", () => {
    it("Creates 10000 unique ids.", () => {
      let ids = new Set();
      for (let i=0; i < 10000; i++)
        ids.add(util.uniqId());
      ids.size.should.eql(10000);
    });
  });
});
