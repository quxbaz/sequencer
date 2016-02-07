/*
  stateful.js

  Base class for stateful objects.
*/

import Sentry from 'sentry';

export class Stateful {

  constructor(state={}) {
    Object.defineProperty(this, 'state', {
      writable: false,
      value: Object.assign({}, state)
    });
    this.event = new Sentry();
  }

  setState(state) {
    let nextState = Object.assign({}, this.state, state);
    Object.assign(this.state, this.validateState(nextState));
    this.event.trigger('change', this.state);
  }

  validateState(nextState) {
    return nextState;
  }

  // Aliases
  on(...args) {return this.event.on(...args)}
  off(...args) {return this.event.off(...args)}
  trigger(...args) {return this.event.trigger(...args)}

}

export let mixin = {

  setState(state) {
    if (this.state === undefined) {
      this._state = {};
      Object.defineProperty(this, 'state', {
        get: () => this._state,
        set() {
          throw Error("You cannot reassign @state. Use setState instead.");
        }
      });
    }
    let newState = Object.assign({}, this.state, state);
    if (this.validateState)
      Object.assign(this.state, this.validateState(newState));
    else
      Object.assign(this.state, state);
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
  },

  offStateChange(handler) {
    let i = this._stateChangeHandlers.indexOf(handler);
    if (i == -1)
      throw new Error("Handler is not attached.");
    else
      this._stateChangeHandlers.splice(i, 1);
  }

};

export default {
  mixin
};
