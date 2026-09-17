import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SERVICES } from '../../core/config/services.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    @if (service(); as item) {
      <section class="service-detail-hero">
        <div class="shell service-detail-grid">
          <div appReveal><span class="eyebrow"><i></i>{{ i18n.t(item.eyebrowKey) }}</span><h1>{{ i18n.t(item.titleKey) }}</h1><p>{{ i18n.t(item.longDescriptionKey) }}</p><div class="hero-actions"><a class="btn btn--primary btn--large" [routerLink]="i18n.localized('book')" [queryParams]="{service:item.id}">{{ i18n.t('nav.book') }}</a><a class="btn btn--ghost btn--large" [routerLink]="i18n.localized('prices')">{{ i18n.t('nav.prices') }}</a></div></div>
          <div class="service-detail-image" appReveal><img [src]="item.image" [alt]="i18n.t(item.titleKey)" width="800" height="700" loading="eager" decoding="async"></div>
        </div>
      </section>
      <section class="section section--cream"><div class="shell service-detail-content">
        <div appReveal><span class="eyebrow"><i></i>{{ i18n.t('trust.eyebrow') }}</span><h2>{{ i18n.t('trust.title') }}</h2><p>{{ i18n.t('trust.text') }}</p></div>
        <div class="detail-points" appReveal>@for (feature of item.features; track feature) { <span>✓ {{ i18n.t(feature) }}</span> }</div>
      </div></section>
    }
  `
})
export class ServiceDetailComponent {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), { initialValue: this.route.snapshot.paramMap.get('slug') });
  readonly service = computed(() => SERVICES.find((item) => item.slug === this.slug()));
}
