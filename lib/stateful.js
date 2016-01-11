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
    let newState = Object.assign({}, this.state, state);
    if (this.validateState)
      this.state = this.validateState(newState);
    else
      this.state = newState;
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
