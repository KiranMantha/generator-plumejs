import { Component, html } from 'plumejs';
const styles = require('./main.scss');

@Component({
    selector: 'app-root',
    styles: styles,
    root: true
})
export class AppComponent {
    render() {
        return html`
            <h1 class='title'>Hello world</h1>
        `
    }
}