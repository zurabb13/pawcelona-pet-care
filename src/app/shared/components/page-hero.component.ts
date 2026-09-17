import { Component, Input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="page-hero">
      <div class="ambient ambient--one"></div>
      <div class="shell" appReveal>
        @if (eyebrow) { <span class="eyebrow"><i></i>{{ eyebrow }}</span> }
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
      </div>
    </section>
  `
})
export class PageHeroComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';
}
