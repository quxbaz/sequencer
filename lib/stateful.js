/*
  stateful.js

  Mixin for stateful objects.

  <TODO>
  This needs to trigger a state change event whenever the state
  changes.
*/

export let mixin = {

  setState(state) {
    let newState = Object.assign({}, this.state, state);
    if (this.validateState)
      Object.assign(this.state, this.validateState(newState));
    else
      Object.assign(this.state, state);
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
