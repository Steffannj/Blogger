import { EventAggregator } from 'aurelia-event-aggregator';
import { Account } from './../../models/Account';
import { NavigationInstruction, Next, Redirect } from "aurelia-router";
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class AuthorizeStep {
  currentUser: Account;
  ea: EventAggregator;

  constructor(ea: EventAggregator) {
    this.ea = ea;
    this.ea.subscribe("account", acc => this.currentUser = acc);
  }

  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      if (!this.currentUser) {
        return next.cancel(new Redirect('login'));
      }
    }
    return next();
  }
}
