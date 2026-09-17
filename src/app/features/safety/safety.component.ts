import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective],
  template: `<app-page-hero [eyebrow]="i18n.t('nav.safety')" [title]="i18n.t('pages.safety.title')" [text]="i18n.t('pages.safety.text')"/><section class="section"><div class="shell benefit-grid">@for(item of items;track item;let i=$index){<article class="benefit-card" appReveal [style.--delay]="i*60+'ms'"><span class="benefit-card__mark">0{{i+1}}</span><h3>{{i18n.t(item)}}</h3><p>{{i18n.t('safety.text')}}</p></article>}</div></section>`
})
export class SafetyComponent {
  readonly i18n = inject(I18nService);
  readonly items = ['safety.meet', 'safety.emergency', 'safety.vet', 'safety.keys', 'safety.medication', 'safety.updates'];
}
