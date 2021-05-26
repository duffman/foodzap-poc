import { Component }                          from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CanDeactivate }                      from "@angular/router";
import { Router }                             from '@angular/router';
import { PrivacyPolicyPage }                  from "@app/admin/account/privacy-policy/privacy-policy.page";
import { PasswordValidator }                  from "@app/validators/password.validator";
import { ModalController }                    from '@ionic/angular';
import { MenuController }                     from '@ionic/angular';
import { IonRouterOutlet }                    from '@ionic/angular';
import { ICanComponentDeactivate }            from "@services/deactivate-guard";

@Component(
	{
		selector:    'app-signup',
		templateUrl: './signup.page.html',
		styleUrls:   [
			'./styles/signup.page.scss'
		]
	})
export class SignupPage implements CanDeactivate<ICanComponentDeactivate> {
	signupForm: FormGroup;
	matching_passwords_group: FormGroup;

	validation_messages = {
		'email':              [
			{
				type:    'required',
				message: 'Email is required.'
			},
			{
				type:    'pattern',
				message: 'Enter a valid email.'
			}
		],
		'password':           [
			{
				type:    'required',
				message: 'Password is required.'
			},
			{
				type:    'minlength',
				message: 'Password must be at least 5 characters long.'
			}
		],
		'confirm_password':   [
			{
				type:    'required',
				message: 'Confirm password is required'
			}
		],
		'matching_passwords': [
			{
				type:    'areNotEqual',
				message: 'Password mismatch'
			}
		]
	};

	constructor(
		public router: Router,
		public modalController: ModalController,
		public menu: MenuController,
		private routerOutlet: IonRouterOutlet
	) {

		let passwordFormControl = new FormControl('',
												  Validators.compose([
																		 Validators.minLength(5),
																		 Validators.required
																	 ]));

		this.matching_passwords_group = new FormGroup(
			{
				'password':
				passwordFormControl,
				'confirm_password': new FormControl('', Validators.required)
			}, (formGroup: FormGroup) => {
				return PasswordValidator.areNotEqual(formGroup);
			});

		this.signupForm = new FormGroup(
			{
				'email':              new FormControl('test@test.com',
													  Validators.compose(
														  [
															  Validators.required,
															  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
														  ])),
				'matching_passwords': this.matching_passwords_group
			});
	}

	canDeactivate(component: ICanComponentDeactivate, currentRoute: import("@angular/router").ActivatedRouteSnapshot, currentState: import("@angular/router").RouterStateSnapshot, nextState?: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        throw new Error("Method not implemented.");
    }

	// Disable side menu for this page
	ionViewDidEnter(): void {
		this.menu.enable(false);
	}

	// Restore to default when leaving this page
	ionViewDidLeave(): void {
		this.menu.enable(true);
	}

	async showPrivacyModal() {
		const modal = await this.modalController.create(
			{
				component:         PrivacyPolicyPage,
				swipeToClose:      true,
				presentingElement: this.routerOutlet.nativeEl
			});
		return await modal.present();
	}

	doSignup(): void {
		console.log('do sign up');
		this.router.navigate(['app/allergies']);
	}

	doFacebookSignup(): void {
		console.log('facebook signup');
		this.router.navigate(['app/allergies']);
	}

	doGoogleSignup(): void {
		console.log('google signup');
		this.router.navigate(['app/allergies']);
	}

	doTwitterSignup(): void {
		console.log('twitter signup');
		this.router.navigate(['app/allergies']);
	}
}
