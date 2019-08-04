import { Component, html } from 'plumejs';

const rootstyles = require('./styles.scss');

@Component({
    selector: 'app-root',
    styles: rootstyles,
    root: true
})
export class AppComponent {
    render() {
        return html`
            <h1 class='title'>Hello world</h1>
        `
    }
}