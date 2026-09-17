import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRICING_CONFIG } from '../../../../core/config/pricing.config';
import { SERVICES } from '../../../../core/config/services.config';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const dogWalking = SERVICES.find((service) => service.id === 'dog-walking');
const homeVisit = SERVICES.find((service) => service.id === 'home-visits');
const overnight = SERVICES.find((service) => service.id === 'overnight-care');

@Component({
  selector: 'app-pricing-preview',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section section--cream">
      <div class="shell">
        <div class="section-heading" appReveal>
          <div><span class="eyebrow"><i></i>{{ i18n.t('pricing.eyebrow') }}</span><h2>{{ i18n.t('pricing.title') }}</h2></div>
          <p>{{ i18n.t('pricing.text') }}</p>
        </div>
        <div class="pricing-grid">
          @for (price of prices; track price.label; let i = $index) {
            <article class="price-card" appReveal [style.--delay]="i * 60 + 'ms'">
              <span>{{ i18n.t(price.label) }}</span><strong>€{{ price.price }}</strong><small>{{ i18n.t('common.from') }}</small>
            </article>
          }
          <a class="price-card price-card--cta" [routerLink]="i18n.localized('prices')" appReveal><span>{{ i18n.t('common.viewAll') }}</span><strong>→</strong></a>
        </div>
        @if (pricing.demoPrices) { <p class="demo-note">* {{ i18n.t('pricing.demoNote') }}</p> }
      </div>
    </section>
  `
})
export class PricingPreviewComponent {
  readonly i18n = inject(I18nService);
  readonly pricing = PRICING_CONFIG;
  readonly prices = [
    { label: 'pricing.walk30', price: dogWalking?.options?.find((option) => option.duration === 30)?.price ?? dogWalking?.priceFrom ?? 0 },
    { label: 'pricing.walk60', price: dogWalking?.options?.find((option) => option.duration === 60)?.price ?? dogWalking?.priceFrom ?? 0 },
    { label: 'pricing.home30', price: homeVisit?.priceFrom ?? 0 },
    { label: 'pricing.overnight', price: overnight?.priceFrom ?? 0 }
  ];
}
