import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { BUSINESS_CONFIG } from '../../../../core/config/business.config';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section final-cta-wrap">
      <div class="shell">
        <div class="final-cta" appReveal>
          <div class="final-cta__glow"></div>
          <span class="eyebrow eyebrow--light"><i></i>{{ i18n.t('cta.eyebrow') }}</span>
          <h2>{{ i18n.t('cta.title') }}</h2><p>{{ i18n.t('cta.text') }}</p>
          <div class="hero-actions hero-actions--center">
            <a class="btn btn--light btn--large" [routerLink]="i18n.localized('book')">{{ i18n.t('hero.primary') }}</a>
            <a class="btn btn--outline-light btn--large" [href]="whatsappHref" target="_blank" rel="noopener">{{ i18n.t('hero.secondary') }}</a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FinalCtaComponent {
  readonly i18n = inject(I18nService);
  readonly whatsappHref = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi! I would like to book a pet care service in Barcelona.')}`;
}
