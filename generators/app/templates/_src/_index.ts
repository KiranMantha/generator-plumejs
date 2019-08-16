import { Component, html, TranslationService } from 'plumejs';

import en from './i18n/en';
import fr from './i18n/fr';

@Component({
    selector: 'app-root',
    styles: 'styles.scss',
    root: true
})
export class AppComponent {
    constructor(translations:TranslationService){
        translations.setTranslate(en, 'en');
        translations.setTranslate(fr, 'fr');
        translations.setDefaultLanguage('en');
    }

    render() {
        return html`
        <span>${ 'username.greet'.translate({name: 'hello world'}) }</span>    
        <h1 class='title'>Hello world</h1>            
        `
    }
}