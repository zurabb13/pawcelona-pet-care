import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-trust-section',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section">
      <div class="shell split-layout">
        <div class="sticky-copy" appReveal>
          <span class="eyebrow"><i></i>{{ i18n.t('trust.eyebrow') }}</span>
          <h2>{{ i18n.t('trust.title') }}</h2>
          <p>{{ i18n.t('trust.text') }}</p>
          <a class="text-link" [routerLink]="i18n.localized('safety')">{{ i18n.t('nav.safety') }} →</a>
        </div>
        <div class="benefit-grid">
          @for (item of benefits; track item.title; let i = $index) {
            <article class="benefit-card" appReveal [style.--delay]="i * 50 + 'ms'">
              <span class="benefit-card__mark">{{ item.icon }}</span>
              <h3>{{ i18n.t(item.title) }}</h3>
              <p>{{ i18n.t(item.text) }}</p>
            </article>
          }
        </div>
      </div>
      <div class="shell safety-band" appReveal>
        <div><span class="eyebrow eyebrow--light"><i></i>{{ i18n.t('safety.eyebrow') }}</span><h2>{{ i18n.t('safety.title') }}</h2><p>{{ i18n.t('safety.text') }}</p></div>
        <div class="safety-list">
          @for (item of safety; track item) { <span>✓ {{ i18n.t(item) }}</span> }
        </div>
      </div>
    </section>
  `
})
export class TrustSectionComponent {
  readonly i18n = inject(I18nService);
  readonly benefits = [
    { icon: '01', title: 'trust.a.title', text: 'trust.a.text' }, { icon: '02', title: 'trust.b.title', text: 'trust.b.text' },
    { icon: '03', title: 'trust.c.title', text: 'trust.c.text' }, { icon: '04', title: 'trust.d.title', text: 'trust.d.text' },
    { icon: '05', title: 'trust.e.title', text: 'trust.e.text' }, { icon: '06', title: 'trust.f.title', text: 'trust.f.text' }
  ];
  readonly safety = ['safety.meet', 'safety.emergency', 'safety.vet', 'safety.keys', 'safety.medication', 'safety.updates'];
}
