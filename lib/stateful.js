/*
  stateful.js

  Mixin for stateful objects.

  <TODO>
  This needs to trigger a state change event whenever the state
  changes.
*/

export let mixin = {
  setState(state) {
    if (this.state === undefined)
      this.state = {};
    Object.assign(this.state, state);
  }
};

export default {
  mixin
};
