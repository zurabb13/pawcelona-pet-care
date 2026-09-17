import { Component, computed, inject } from '@angular/core';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PageHeroComponent, RevealDirective],
  template: `
    <app-page-hero [eyebrow]="i18n.t('common.contact')" [title]="i18n.t('pages.contact.title')" [text]="i18n.t('pages.contact.text')" />
    <section class="section"><div class="shell contact-grid">
      <a class="contact-card" appReveal [href]="whatsappHref()" target="_blank" rel="noopener noreferrer"><span>01</span><h2>{{ i18n.t('contact.whatsappTitle') }}</h2><p>{{ i18n.t('contact.whatsappText') }}</p><b>↗</b></a>
      <a class="contact-card" appReveal [href]="'mailto:' + business.email"><span>02</span><h2>{{ i18n.t('contact.emailTitle') }}</h2><p>{{ i18n.t('contact.emailText') }}</p><small>{{ business.email }}</small><b>↗</b></a>
    </div></section>
  `
})
export class ContactComponent {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
  readonly whatsappHref = computed(() => `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(this.i18n.t('whatsapp.prefill'))}`);
}
