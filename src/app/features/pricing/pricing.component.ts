import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRICING_CONFIG } from '../../core/config/pricing.config';
import { SERVICES } from '../../core/config/services.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, RevealDirective],
  template: `
    <app-page-hero [eyebrow]="i18n.t('pricing.eyebrow')" [title]="i18n.t('pages.prices.title')" [text]="i18n.t('pages.prices.text')" />
    <section class="section"><div class="shell pricing-table" appReveal>
      @for (service of services; track service.id) {
        <div class="pricing-row">
          <div><strong>{{ i18n.t(service.titleKey) }}</strong><p>{{ i18n.t(service.shortDescriptionKey) }}</p></div>
          <span>{{ i18n.t('common.from') }} <b>€{{ service.priceFrom }}</b></span>
          <a class="mini-book" [routerLink]="i18n.localized('book')" [queryParams]="{service: service.id}">{{ i18n.t('common.book') }}</a>
        </div>
      }
      @if (pricing.weekendSurcharge > 0 || pricing.holidaySurcharge > 0) {
        <div class="pricing-surcharges">
          @if (pricing.weekendSurcharge > 0) { <span>{{ i18n.t('pricing.weekendSurcharge') }} <strong>+€{{ pricing.weekendSurcharge }}</strong></span> }
          @if (pricing.holidaySurcharge > 0) { <span>{{ i18n.t('pricing.holidaySurcharge') }} <strong>+€{{ pricing.holidaySurcharge }}</strong></span> }
        </div>
      }
      @if (pricing.demoPrices) { <p class="demo-note">* {{ i18n.t('pricing.demoNote') }}</p> }
    </div></section>
  `
})
export class PricingComponent {
  readonly i18n = inject(I18nService);
  readonly services = SERVICES;
  readonly pricing = PRICING_CONFIG;
}
