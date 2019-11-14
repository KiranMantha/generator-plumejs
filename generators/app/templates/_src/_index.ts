import { Component, html, TranslationService } from "plumejs";
import locale_en from './i18n/en';
import locale_fr from './i18n/fr';

@Component({
  selector: "app-root",
  styleUrl: "styles.scss",
  root: true
})
export class AppComponent {
  constructor(translations: TranslationService) {
    translations.setTranslate(locale_en, "en");
    translations.setTranslate(locale_fr, "fr");
    translations.setDefaultLanguage("en");
  }
  render() {
    return html`
      <h1 class="title">Hello world</h1>
      ${ 'user.name'.translate({name: 'test user'}) }
    `;
  }
}
