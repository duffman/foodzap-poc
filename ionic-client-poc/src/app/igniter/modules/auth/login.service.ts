import { HttpClient }      from "@angular/common/http";
import { Injectable }      from '@angular/core';
import { LoginResult }     from "@app/igniter/modules/auth/login-result";
import { ILoginResult }    from "@app/igniter/modules/auth/login-result";
import { UrlBuilder }      from "@app/igniter/utils/url-builder";
import { ApiRoutes }       from "@sdk/api/api-routes";
import { ActionResult }    from "@sdk/core/action-result";
import { IActionResult }   from "@sdk/core/action-result";
import { AppSettings }     from "@sdk/sdk-settings";
import { BehaviorSubject } from "rxjs";
import { Observable }      from "rxjs";
import { ICredentials }    from "./credentials.type";

@Injectable(
	{
		providedIn: 'root'
	})
export class LoginService {
	public user : Observable<any>;
	private userData = new BehaviorSubject<any>(null);

	constructor(private httpClient : HttpClient) {
	}

	public apiPost(path : string, data? : any) {
		if (path.startsWith("/")) {
			path.substr(1, path.length);
		}

		let url = AppSettings.API_URL + path;

		console.log('API POST ::', url);
		return this.httpClient.post(url, data);
	}

	public apiPostData(path : string, data : any) : Promise<IActionResult> {

		let url = new UrlBuilder(AppSettings.API_URL).join(path).toString();

		/*
		if (path && path.length > 1 && path.startsWith("/")) {
			path.substr(1, path.length);
		}

		const url    = apiUrl + path;
		*/

		let respType : string = 'text';
		let result = new ActionResult();

		return new Promise((resolve, reject) => {
			console.log('API POST DATA ::', url);
			return this.httpClient.post(url, data, { responseType: 'text' })
					   .toPromise().then(res => {
					result.data = res;
					console.log('apiPost :: Resolved ::', typeof res);
					resolve(result);

				}).catch(err => {
					console.error('apiPost :: promise error', err);
					result.setError(err);
					resolve(result);
				});
		});
	}

	public doUserLogin(credentials : ICredentials) : Promise<ILoginResult> {
		return this.doLogin(ApiRoutes.UserLogin, credentials);
	}

	public doAdminLogin(credentials : ICredentials) : Promise<ILoginResult> {
		return this.doLogin(ApiRoutes.AdminLogin, credentials);
	}

	public doLogin(path: string, credentials : ICredentials) : Promise<ILoginResult> {
		return new Promise((resolve, reject) => {
			//
			//
			// MD5 the password
			// TODO:IMPLEMENT

			let passHash: string = credentials.password; //(credentials.password, false).asS;
			credentials.password = passHash;

			this.apiPostData(path, credentials).then(res => {
				let loginRes = new LoginResult();

				// Extract Server result
				try {
					let data = JSON.parse(res.data);
					console.log('LOGIN RES ::', loginRes);
					loginRes.data = data;
					loginRes.success = data.succes;

				} catch (e) {
					console.log('ERROR PARSING RESULT ::', e);
				}

				resolve(loginRes);

			}).catch(err => {
				reject(err);
			});
		});
	}

	/**
	 * Perform a Login Post Request
	 * @param {ICredentials} credentials
	 * @returns {Observable<any>}
	 *
	public doLogin2(credentials : ICredentials) : Observable<any> {
		function l(str: string, data?: any) {
			str = 'doLogin :: ' + str;
			if (data) { console.log(str, data); } else { console.log(str, data); }
		}

		l('data', credentials);

		let result = new LoginResult();

		return new Observable((observer) => {
			l('new Observable', credentials);

			bcrypt.hash(credentials.password, 10, (err, res) => {
				l('bcrypt :: err ::', err);
				l('bcrypt :: res ::', res);

				if (!err) {
					let data : ICredentials = {
						email:    credentials.email,
						password: res
					};

					this.apiPost(IgniterSettings.ApiPaths.UserLogin).subscribe(obs => {
						l('this.apiPost ::', obs);

						observer.next(obs);
					});

				}
				else {
					result.errCode = 607;
					observer.next(result)
				}
			});
		});
	 */

	/*
	 this.apiPost(IgniterSettings.ApiPaths.UserLogin).pipe(
	 take(1),
	 map(data => {
	 console.log('SERVER RESPONSE ::', data);
	 return of(true);
	 })
	 );

	 return of(true);
	 */

}
