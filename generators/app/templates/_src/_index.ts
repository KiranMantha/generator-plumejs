import { Component, html, TranslationService, Router } from "plumejs";
import locale_en from './i18n/en';
import locale_fr from './i18n/fr';

@Component({
  selector: "app-root",
  styleUrl: "styles.scss",
  root: true
})
export class AppComponent {
  constructor(router:Router, translations:TranslationService) {
    translations.setTranslate(locale_en, "en");
    translations.setTranslate(locale_fr, "fr");
    translations.setDefaultLanguage("en");
  }
  render() {
    return html`
      <h1 class="title">Hello world</h1>
      <div>${ 'username.greet'.translate({name: 'test user'}) }</div>
    `;
  }
}
