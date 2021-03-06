import { CheckRegister } from './../authChecks/checkRegister';
import { Router } from 'aurelia-router';
import { AccountType } from './../models/Account';
import { AccountRepository } from './../repository/AccountRepository';
import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, ValidationController } from 'aurelia-validation';

@inject(Router, AccountRepository, ValidationControllerFactory, CheckRegister)
export class Signup {
  username: string;
  password: string;
  repeatedPassword: string;
  router: Router;
  accountRepository: AccountRepository;
  vcf: ValidationControllerFactory;
  vc: ValidationController;
  checkRegister: CheckRegister;
  error: string;

  constructor(router: Router, accountRepository: AccountRepository, vcf: ValidationControllerFactory, checkRegister: CheckRegister) {
    this.router = router;
    this.accountRepository = accountRepository;
    this.vc = vcf.createForCurrentScope();
    this.checkRegister = checkRegister;
  }

  signup(username) {
    try {
      if (this.checkRegister.isUsernameAvailable(username)) {
        this.accountRepository.addAccount(this.username, this.password, AccountType.User);
        this.router.navigateToRoute("login");
      }
    } catch (err) {
      this.error = err;
    }
  }
}

ValidationRules
.ensure("username")
.minLength(5)
.maxLength(50)
.ensure("password")
.minLength(8)
.maxLength(50)
.on(Signup);
