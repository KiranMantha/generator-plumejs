import { Component, html, TranslationService } from '@plumejs/core';
import { Route, Router } from "@plumejs/router";
import locale_en from './i18n/en';
import locale_fr from './i18n/fr';
import globalstyles from './styles.scss';

@Component({
	selector: 'app-root',
	styles: globalstyles,
	root: true
})
export class AppComponent {
	constructor(private router: Router, translations: TranslationService) {
		Router.registerRoutes(this.routes);
		translations.setTranslate(locale_en, 'en');
		translations.setTranslate(locale_fr, 'fr');
		translations.setDefaultLanguage('en');
	}

	routes:Array<Route> = [
		{
			path: '',
			redirectTo: '/home'
		},
		{
			path: '/home',
			template: `<sample-ele></sample-ele>`,
			templatePath: ()=> import('./sample-ele')
		},
		{
			path: '/persons/:id',
			template: `<persons-list></persons-list>`,
			templatePath: () => import('./persons/persons-list')
		}
	]

	inputField:HTMLInputElement;

	mount() {
		console.log(this.inputField);
	}

	navigate = (path: string) => {
		this.router.navigateTo(path);
	};

	getRef() {
		console.log(this.inputField);
	}

	render() {
		return html`
			<h1 class="title">Hello world</h1>
			<div>${'username.greet'.translate({ name: 'test user' })}</div>
			<ul>
				<li>
					<a
						onclick=${() => {
							this.navigate('/home');
						}}
						>Home</a
					>
				</li>
				<li>
					<a
						onclick=${() => {
							this.navigate('/persons/123');
						}}
						>persons</a
					>
				</li>
			</ul>
			<input type="text" ref=${(node) => {this.inputField = node;})} /><button
				onclick=${() => {
					this.getRef();
				}}
			>
				click
			</button>
			<router-outlet></router-outlet>
		`;
	}
}
