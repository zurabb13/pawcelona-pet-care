import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-how-page',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective],
  template: `<app-page-hero [eyebrow]="i18n.t('nav.how')" [title]="i18n.t('pages.how.title')" [text]="i18n.t('pages.how.text')"/><section class="section section--dark"><div class="shell steps-grid">@for(step of steps; track step.n; let i=$index){<article class="step-card" appReveal [style.--delay]="i*80+'ms'"><span class="step-card__number">{{step.n}}</span><div class="step-card__line"></div><h3>{{i18n.t(step.t)}}</h3><p>{{i18n.t(step.x)}}</p></article>}</div></section>`
})
export class HowItWorksPageComponent {
  readonly i18n = inject(I18nService);
  readonly steps = [
    { n: '01', t: 'how.step1.title', x: 'how.step1.text' },
    { n: '02', t: 'how.step2.title', x: 'how.step2.text' },
    { n: '03', t: 'how.step3.title', x: 'how.step3.text' },
    { n: '04', t: 'how.step4.title', x: 'how.step4.text' }
  ];
}
