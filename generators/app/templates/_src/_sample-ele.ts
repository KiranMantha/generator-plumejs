import {
	Component,
	html,
	Injectable,
	Renderer,
	ComponentRef
} from '@plumejs/core';
import { Router } from '@plumejs/router';

@Injectable()
class SampleService {
	constructor() {}
	testMeth() {
		console.log('testmethod in sample service');
	}
}

@Injectable()
class TestService {
	constructor(private sampleSrvc: SampleService) {}
	testMeth() {
		this.sampleSrvc.testMeth();
	}

	getUsers() {
		return fetch('https://api.github.com/users?since=135');
	}
}

@Component({
	selector: 'test-ele'
})
class TestEle {
	readonly ObservedProperties = <const>['testprops'];
	testprops: { name: string };

	constructor(private renderer: Renderer) {}

	render() {
		return html`
			<div>
				testing web component2 ${this.testprops.name}
				<button onclick=${(e: any) => this.counts(e)}>hi</button>
				<input
					value=${this.testprops.name}
					oninput=${(e: any) => this.change(e.target.value)}
				/>
			</div>
		`;
	}

	counts(e: any) {
		this.renderer.emitEvent('count', 'testing from click');
	}

	change(val: string) {
		this.renderer.emitEvent('count', val);
	}

	mount() {
		console.log('component loaded');
		console.log('props: ', this.testprops);
	}

	unmount() {
		console.log('component unloaded');
	}
}

@Component({
	selector: 'sample-ele'
})
class SampleEle {
	test: string;
	outCount: Function;
	props: any;
	inputField: HTMLInputElement;

	private testEleRef: ComponentRef<TestEle>;

	constructor(private testSrvc: TestService, private renderer: Renderer) {
		this.test = 'sample 123';
		this.props = {
			name: this.test
		};
	}

	render() {
		return html`
			<div>
				<h1>Sample two way data binding</h1>
				testing web component1 ${this.test}
				<div>
					<button
						onclick=${() => {
							this.updateProps();
						}}
					>
						change props
					</button>
				</div>
				<test-ele
					ref="${(node) => {
						this.testEleRef = node;
					}}"
					oncount="${(e: CustomEvent) => {
						this.count(e.detail);
					}}"
				>
				</test-ele>
			</div>
		`;
	}

	updateProps() {
		this.testEleRef.setProps({ testprops: this.props });
	}

	count(val: string) {
		this.test = val;
		this.props.name = val;
		this.renderer.update();
		this.testEleRef.setProps({ testprops: this.props });
	}

	beforeMount() {
		console.log('before mounting...');
	}

	mount() {
		console.log('component loaded');
		console.log(this.inputField);
		this.testSrvc.testMeth();
		this.testEleRef.setProps({ testprops: this.props });
	}

	unmount() {
		console.log('component unloaded');
	}
}
