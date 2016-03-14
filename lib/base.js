import Stateful from 'stateful';
import Sentry from 'sentry';

export default class Base extends Stateful {
  constructor(...args) {
    super(...args);
    Base.trigger('new', this);
  }
}

Base.observer = new Sentry();
Base.trigger = Base.observer.trigger.bind(Base.observer);
Base.on = Base.observer.on.bind(Base.observer);
