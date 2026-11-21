import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
})
export default class PricingPage {
  private title = inject(Title)
 private meta = inject(Meta)

 ngOnInit() {
  this.title.setTitle('Pricing Page')
  this.meta.updateTag({ name: 'description', content: 'Este es mi pricing page' })
  this.meta.addTag({ name: 'keywords', content: 'pricing, page, angular' })
  this.meta.addTag({name:'og:title', content: 'Pricing Page'})
 }
}
