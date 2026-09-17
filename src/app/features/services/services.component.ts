import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../core/config/services.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services', standalone: true, imports: [RouterLink, PageHeroComponent, RevealDirective],
  template: `
    <app-page-hero [eyebrow]="i18n.t('nav.services')" [title]="i18n.t('pages.services.title')" [text]="i18n.t('pages.services.text')" />
    <section class="section"><div class="shell service-grid">
      @for (service of services; track service.id; let i = $index) {
        <article class="service-card" appReveal [style.--delay]="i * 50 + 'ms'">
          <a class="service-card__media" [routerLink]="i18n.localized('services/' + service.slug)"><img [src]="service.image" [alt]="i18n.t(service.titleKey)" loading="lazy" decoding="async" width="1200" height="889"><span class="service-card__index">0{{i + 1}}</span></a>
          <div class="service-card__body"><div class="service-card__top"><h3>{{i18n.t(service.titleKey)}}</h3><span>{{i18n.t('common.from')}} €{{service.priceFrom}}</span></div><p>{{i18n.t(service.shortDescriptionKey)}}</p><div class="service-card__links"><a [routerLink]="i18n.localized('services/' + service.slug)">{{i18n.t('common.learnMore')}} →</a><a class="mini-book" [routerLink]="i18n.localized('book')" [queryParams]="{service: service.id}">{{i18n.t('common.book')}}</a></div></div>
        </article>
      }
    </div></section>
  `
})
export class ServicesComponent {
  readonly i18n = inject(I18nService); readonly services = SERVICES;
}
