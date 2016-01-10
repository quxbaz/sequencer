import stateful from 'lib/stateful';

describe('Stateful mixin', function() {

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

  it("does not trigger a callback on calling setState() with the same state.", function() {
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
