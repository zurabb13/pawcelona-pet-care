import { Component, inject } from '@angular/core';
import { SERVICE_AREAS } from '../../core/config/service-areas.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective],
  template: `<app-page-hero [eyebrow]="i18n.t('areas.eyebrow')" [title]="i18n.t('pages.areas.title')" [text]="i18n.t('pages.areas.text')"/><section class="section"><div class="shell area-grid">@for(area of areas;track area;let i=$index){<article class="area-card" appReveal [style.--delay]="i*50+'ms'"><span>0{{i+1}}</span><h2>{{area}}</h2><p>Barcelona</p></article>}</div></section>`
})
export class ServiceAreasComponent {
  readonly i18n = inject(I18nService);
  readonly areas = SERVICE_AREAS;
}
