import stateful from 'lib/stateful';

describe('Stateful mixin', () => {

  let Foo;
  let foo;

  beforeEach(() => {
    Foo = function(){};
    Object.assign(Foo.prototype, stateful.mixin);
    foo = new Foo();
  });

  it("calls setState()", () => {
    foo.setState({a:1, b:2});
    foo.state.a.should.eql(1);
    foo.state.b.should.eql(2);
  });

  it("calls setState with an empty object.", () => {
    foo.setState({});
    Object.keys(foo.state).should.eql(['id']);
  });

  it("throw an error on attempting to reassign @state", () => {
    foo.setState({});
    (() => {foo.state = {}}).should.throw();
  });

  it("performs an overwrite with setState()", () => {
    foo.setState({a: 1});
    foo.state.a.should.eql(1);
    foo.setState({a: 2});
    foo.state.a.should.eql(2);
  });

  it("triggers a callback on change state.", () => {
    let i = 0;
    foo.onStateChange((newState) => {
      i++;
    });
    foo.setState({a: 1});
    i.should.eql(1);
    foo.setState({a: 2});
    i.should.eql(2);
  });

  it("detaches a handler function.", () => {
    let i = 0;
    let handler = () => i++;
    foo.onStateChange(handler);
    foo.setState({a: 1});
    foo.setState({a: 2});
    i.should.eql(2);
    foo.offStateChange(handler);
    foo.setState({a: 3});
    i.should.eql(2);
  });

  it("throws an error on attempting to detach a non-attached handler.", () => {
    foo.onStateChange(() => null);
    foo.offStateChange.bind(foo, () => 1).should.throw();
  });

  it("avoids triggering handlers on repeating the same state.", () => {
    let i = 0;
    foo.onStateChange((newState) => {
      i++;
    });
    foo.setState({a: 1});
    i.should.eql(1);
    foo.setState({a: 1});
    i.should.eql(1);
  });

  it("sets a unique id on every mixed object.", () => {
    let ids = [];
    for (let i=0; i < 1000; i++) {
      let foo = new Foo();
      foo.setState({});
      ids.push(foo.state.id);
    }
    let set = new Set(ids);
    set.size.should.eql(1000);
  });

});
