import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { App } from "./app";
import { routes } from "./app.routes";
import { Navbar } from "./shared/components/navbar/navbar";

describe("App", () => {
    let component: App;
    let fixture: ComponentFixture<App>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [App],
            providers: [provideRouter(routes)],
        }).overrideComponent(Navbar, {
            set: {
                imports: [],
                template: "<p>App Navbar</p>",
            },
        });

        fixture = TestBed.createComponent(App);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it("should render the navbar", () => {
        const navbar = fixture.nativeElement.querySelector("app-navbar");
        expect(navbar).toBeTruthy();
    });

    it('should match the snapshot', () => {
        expect(fixture.nativeElement).toMatchSnapshot();
    });
});
