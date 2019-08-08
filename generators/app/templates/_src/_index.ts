import { Component, html, TranslationService } from "plumejs";
import locale_en from './assets/i18n/en';
import locale_fr from './assets/i18n/fr';

const rootstyles = require("./styles.scss");


@Component({
  selector: "app-root",
  styles: rootstyles,
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
    `;
  }
}
