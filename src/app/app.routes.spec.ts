import { Location } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { of } from "rxjs";

import { routes } from "./app.routes";
import { Pokemons } from "./features/pokemons/services/pokemons";
import AboutPage from "./pages/about-page/about-page";
import PricingPage from "./pages/pricing-page/pricing-page";
import PokemonsPage from "./pages/pokemons-page/pokemons-page";

describe("routes", () => {
    let router: Router;
    let location: Location;
    let harness: RouterTestingHarness;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes),
                {
                    provide: Pokemons,
                    useValue: {
                        loadPage: () => of([]),
                        loadPokemon: () => of({}),
                    },
                },
            ],
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        harness = await RouterTestingHarness.create();
    });

    it("should be defined", () => {
        expect(routes).toBeTruthy();
    });

    it("should contain all defined routes", () => {
        const paths = routes.map((route) => route.path);

        expect(paths).toEqual([
            "about",
            "pricing",
            "contact",
            "pokemons",
            "pokemons/page/:page",
            "pokemons/:name",
            "**",
        ]);
    });

    it("should render AboutPageComponent when path is /about", async () => {
        const component = await harness.navigateByUrl("/about", AboutPage);

        expect(component).toBeInstanceOf(AboutPage);
    });

    it("should navigate to \"/about\" and render AboutPageComponent", async () => {
        await router.navigateByUrl("/about");
        harness.detectChanges();

        const title = harness.routeNativeElement?.querySelector("h1");

        expect(location.path()).toBe("/about");
        expect(title).toBeTruthy();
        expect(title?.textContent).toContain("Sobre la aplicación");
    });

    it("should render PricingPageComponent when path is /pricing", async () => {
        const component = await harness.navigateByUrl("/pricing", PricingPage);

        expect(component).toBeInstanceOf(PricingPage);
    });

    it("should navigate to \"/pokemons/page/1\" and render PokemonsPageComponent", async () => {
        await router.navigateByUrl("/pokemons/page/1");
        harness.detectChanges();

        const page = (harness.fixture.nativeElement as HTMLElement).querySelector("app-pokemons-page");

        expect(location.path()).toBe("/pokemons/page/1");
        expect(page).toBeTruthy();
    });

    it("should render PokemonsPageComponent when path is /pokemons/page/:page", async () => {
        const component = await harness.navigateByUrl("/pokemons/page/2", PokemonsPage);

        expect(location.path()).toBe("/pokemons/page/2");
        expect(component).toBeInstanceOf(PokemonsPage);
    });

    it("should redirect to /pokemons/page/1 when path is unknown", async () => {
        await harness.navigateByUrl("/ruta-desconocida");

        expect(location.path()).toBe("/pokemons/page/1");
    });
});
