import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../../../core/config/services.config';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section section--cream">
      <div class="shell">
        <div class="section-heading" appReveal>
          <div><span class="eyebrow"><i></i>{{ i18n.t('home.servicesEyebrow') }}</span><h2>{{ i18n.t('home.servicesTitle') }}</h2></div>
          <p>{{ i18n.t('home.servicesText') }}</p>
        </div>
        <div class="service-grid">
          @for (service of services; track service.id; let i = $index) {
            <article class="service-card" appReveal [style.--delay]="i * 60 + 'ms'">
              <a class="service-card__media" [routerLink]="i18n.localized('services/' + service.slug)">
                <img [src]="service.image" [alt]="i18n.t(service.titleKey)" width="600" height="420" loading="lazy">
                <span class="service-card__index">0{{ i + 1 }}</span>
              </a>
              <div class="service-card__body">
                <div class="service-card__top"><h3>{{ i18n.t(service.titleKey) }}</h3><span>{{ i18n.t('common.from') }} €{{ service.priceFrom }}</span></div>
                <p>{{ i18n.t(service.shortDescriptionKey) }}</p>
                <div class="service-card__links">
                  <a [routerLink]="i18n.localized('services/' + service.slug)">{{ i18n.t('common.learnMore') }} →</a>
                  <a class="mini-book" [routerLink]="i18n.localized('book')" [queryParams]="{service: service.id}">{{ i18n.t('common.book') }}</a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesPreviewComponent {
  readonly i18n = inject(I18nService);
  readonly services = SERVICES.slice(0, 6);
}
