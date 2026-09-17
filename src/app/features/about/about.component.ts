import { Component, inject } from '@angular/core';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective],
  template: `
    <app-page-hero [eyebrow]="i18n.t('nav.about')" [title]="i18n.t('pages.about.title')" [text]="i18n.t('pages.about.text')" />
    <section class="section"><div class="shell about-grid">
      <div class="about-image" appReveal><img [src]="business.aboutImage" [alt]="i18n.t('about.imageAlt')" loading="lazy" decoding="async" width="1600" height="1067"></div>
      <div appReveal><span class="eyebrow"><i></i>{{ business.city }}</span><h2>{{ i18n.t('trust.title') }}</h2><p>{{ i18n.t('trust.text') }}</p></div>
    </div></section>
  `
})
export class AboutComponent {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
}
