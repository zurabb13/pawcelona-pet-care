import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeroComponent } from '../../shared/components/page-hero.component';

type LegalKind = 'privacy' | 'cookies' | 'terms';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
    <app-page-hero [eyebrow]="i18n.t('footer.legal')" [title]="i18n.t(titleKey)" [text]="i18n.t('legal.intro')" />
    <section class="section">
      <article class="shell legal-copy">
        @if (kind === 'privacy') {
          <section class="legal-section">
            <h2>{{ i18n.t('legal.controller') }}</h2>
            <p>{{ i18n.t('legal.privacy.controllerText') }}</p>
            <div class="legal-identity">
              <strong>{{ business.legalName }}</strong>
              <span>{{ business.taxId }}</span>
              <span>{{ business.city }}, {{ business.country }}</span>
              <a [href]="'mailto:' + business.dataProtectionEmail">{{ business.dataProtectionEmail }}</a>
            </div>
          </section>
          <section class="legal-section"><h2>{{ i18n.t('legal.data') }}</h2><p>{{ i18n.t('legal.privacy.dataText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.purpose') }}</h2><p>{{ i18n.t('legal.privacy.purposeText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.retention') }}</h2><p>{{ i18n.t('legal.privacy.retentionText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.recipients') }}</h2><p>{{ i18n.t('legal.privacy.recipientsText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.rights') }}</h2><p>{{ i18n.t('legal.privacy.rightsText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.security') }}</h2><p>{{ i18n.t('legal.privacy.securityText') }}</p></section>
        } @else if (kind === 'cookies') {
          <section class="legal-section"><h2>{{ i18n.t('legal.cookiesUsed') }}</h2><p>{{ i18n.t('legal.cookies.text') }}</p><div class="legal-storage-item"><code>pawcelona_cookie_notice</code><p>{{ i18n.t('legal.cookies.item') }}</p></div></section>
        } @else {
          <section class="legal-section"><h2>{{ i18n.t('legal.termsBookings') }}</h2><p>{{ i18n.t('legal.terms.bookingsText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.termsCare') }}</h2><p>{{ i18n.t('legal.terms.careText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.termsPayments') }}</h2><p>{{ i18n.t('legal.terms.paymentsText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.termsLiability') }}</h2><p>{{ i18n.t('legal.terms.liabilityText') }}</p></section>
          <section class="legal-section"><h2>{{ i18n.t('legal.contact') }}</h2><p><strong>{{ business.legalName }}</strong><br>{{ business.city }}, {{ business.country }}<br><a [href]="'mailto:' + business.email">{{ business.email }}</a></p></section>
        }
      </article>
    </section>
  `
})
export class LegalComponent implements OnInit {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
  private readonly route = inject(ActivatedRoute);
  titleKey = 'legal.privacy.title';
  kind: LegalKind = 'privacy';

  ngOnInit(): void {
    this.titleKey = this.route.snapshot.data['titleKey'] ?? this.titleKey;
    const path = this.route.snapshot.url[0]?.path ?? 'privacy';
    this.kind = path === 'cookies' || path === 'terms' ? path : 'privacy';
  }
}
