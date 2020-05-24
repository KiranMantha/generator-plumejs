import { Component, html, TranslationService, Router, Route, Ref, useRef } from "plumejs";
import locale_en from './i18n/en';
import locale_fr from './i18n/fr';
import globalstyles from './styles.scss';

const routes:Array<Route> = [
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

Router.registerRoutes(routes);

@Component({
  selector: "app-root",
  styles: globalstyles,
  root: true
})
export class AppComponent {
  constructor(private router:Router, translations:TranslationService) {
    translations.setTranslate(locale_en, "en");
    translations.setTranslate(locale_fr, "fr");
    translations.setDefaultLanguage("en");
  }  

	inputField:Ref<HTMLInputElement> = useRef(null);
	
	mount() {
		console.log(this.inputField);
	}
  
  navigate = (path:string) => {
    this.router.navigateTo(path);
  }

  getRef(){
		console.log(this.inputField);
	}
  
  render() {
    return html`
      <h1 class="title">Hello world</h1>
      <div>${ 'username.greet'.translate({name: 'test user'}) }</div>
      <ul>
				<li>
					<a onclick=${() => { this.navigate('/home') }}>Home</a>
				</li>
				<li>
					<a onclick=${() => { this.navigate('/persons/123') }}>persons</a>
				</li>
      </ul>
      <input type='text' ref=${this.inputField} /><button onclick=${()=>{ this.getRef() }}>click</button>
      <router-outlet></router-outlet>
    `;
  }
}
