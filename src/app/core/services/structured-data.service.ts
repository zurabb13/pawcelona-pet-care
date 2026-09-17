import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { BUSINESS_CONFIG } from '../config/business.config';
import { SERVICE_AREAS } from '../config/service-areas.config';
import { SERVICES } from '../config/services.config';
import { PRICING_CONFIG } from '../config/pricing.config';
import { I18nService } from '../i18n/i18n.service';
import { PetService } from '../models/service.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  setLocalBusiness(): void {
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${environment.siteUrl}/#business`,
      name: BUSINESS_CONFIG.workingBrand,
      url: environment.siteUrl,
      image: BUSINESS_CONFIG.heroImage,
      description: this.i18n.t('hero.subtitle'),
      areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS_CONFIG.city,
        addressRegion: BUSINESS_CONFIG.region,
        addressCountry: BUSINESS_CONFIG.countryCode
      },
      makesOffer: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: this.i18n.t(service.titleKey) }
      }))
    };

    if (!BUSINESS_CONFIG.phoneDisplay.includes('X')) data['telephone'] = BUSINESS_CONFIG.phoneDisplay;
    if (!BUSINESS_CONFIG.email.endsWith('.example')) data['email'] = BUSINESS_CONFIG.email;
    if (BUSINESS_CONFIG.publicAddress) {
      (data['address'] as Record<string, unknown>)['streetAddress'] = BUSINESS_CONFIG.publicAddress;
    }

    this.set('pawcelona-local-business', data);
  }

  setService(service: PetService): void {
    this.set('pawcelona-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: this.i18n.t(service.titleKey),
      description: this.i18n.t(service.longDescriptionKey),
      url: `${environment.siteUrl}${this.i18n.localized(`services/${service.slug}`)}`,
      areaServed: { '@type': 'City', name: BUSINESS_CONFIG.city },
      provider: { '@id': `${environment.siteUrl}/#business` },
      offers: {
        '@type': 'Offer',
        priceCurrency: PRICING_CONFIG.currency,
        price: service.priceFrom,
        description: `${this.i18n.t('common.from')} €${service.priceFrom}`
      }
    });
  }

  setFaq(items: Array<{ question: string; answer: string }>): void {
    this.set('pawcelona-faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }

  clearPageSpecific(): void {
    this.remove('pawcelona-service');
    this.remove('pawcelona-faq');
  }

  private set(id: string, data: unknown): void {
    this.remove(id);
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }

  private remove(id: string): void {
    this.document.getElementById(id)?.remove();
  }
}
