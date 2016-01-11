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
    if (this.validateState)
      this.state = this.validateState(state, this.state);
    else
      this.state = Object.assign({}, this.state, state);
    if (this._stateChangeHandlers !== undefined) {
      this._stateChangeHandlers.forEach((handler) => {
        handler(this.state);
      });
    }
  },

  onStateChange(handler) {
    if (this._stateChangeHandlers === undefined)
      this._stateChangeHandlers = [];
    this._stateChangeHandlers.push(handler);
  }

};

export default {
  mixin
};
