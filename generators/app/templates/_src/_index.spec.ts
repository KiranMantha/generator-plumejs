import { TestBed } from 'plumejs/testBed';
import { AppComponent } from './_index';


describe("Plumejs Component", () => {
  let appRoot:any;
	beforeAll(async () => {
    appRoot = await TestBed.MockComponent({selector: 'app-root', target: AppComponent});
  });
  
  it('should render h1 element', () => {
    const h1:any = appRoot.querySelector('h1');
    expect(h1.innerHTML).toBe("Hello World");
  });
  
  afterAll(()=>{
    TestBed.RemoveComponent(appRoot);
  });
});