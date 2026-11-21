import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export default class AboutPage implements OnInit {
 private title = inject(Title)
 private meta = inject(Meta)

 ngOnInit() {
  this.title.setTitle('About Page')
  this.meta.updateTag({ name: 'description', content: 'Este es mi about page' })
  this.meta.addTag({ name: 'keywords', content: 'about, page, angular' })
  this.meta.addTag({name:'og:title', content: 'About Page'})
 }
}
