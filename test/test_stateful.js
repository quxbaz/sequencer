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

});
