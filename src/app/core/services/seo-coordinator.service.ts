import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SERVICES } from '../config/services.config';
import { I18nService } from '../i18n/i18n.service';
import { SeoService } from './seo.service';
import { StructuredDataService } from './structured-data.service';

@Injectable({ providedIn: 'root' })
export class SeoCoordinatorService {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);
  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.updateFromUrl();
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.i18n.syncLanguageFromUrl();
      this.updateFromUrl();
    });
  }

  private updateFromUrl(): void {
    const url = this.router.url.split('?')[0].split('#')[0];
    const segments = url.split('/').filter(Boolean);
    const localPath = segments.slice(1).join('/');
    this.structuredData.clearPageSpecific();
    this.structuredData.setLocalBusiness();

    if (localPath === 'not-found') {
      this.seo.update(this.i18n.t('notFound.title'), this.i18n.t('notFound.text'), localPath, { index: false });
      return;
    }

    if (localPath.startsWith('services/')) {
      const slug = localPath.split('/')[1];
      const service = SERVICES.find((item) => item.slug === slug);
      if (service) {
        this.seo.update(`${this.i18n.t(service.titleKey)} · Barcelona`, this.i18n.t(service.shortDescriptionKey), localPath, { image: service.image });
        this.structuredData.setService(service);
        return;
      }
    }

    const pages: Record<string, [string, string]> = {
      '': [this.i18n.t('seo.homeTitle'), this.i18n.t('hero.subtitle')],
      services: [this.i18n.t('pages.services.title'), this.i18n.t('pages.services.text')],
      prices: [this.i18n.t('pages.prices.title'), this.i18n.t('pages.prices.text')],
      'how-it-works': [this.i18n.t('pages.how.title'), this.i18n.t('pages.how.text')],
      about: [this.i18n.t('pages.about.title'), this.i18n.t('pages.about.text')],
      safety: [this.i18n.t('pages.safety.title'), this.i18n.t('pages.safety.text')],
      areas: [this.i18n.t('pages.areas.title'), this.i18n.t('pages.areas.text')],
      faq: [this.i18n.t('pages.faq.title'), this.i18n.t('pages.faq.text')],
      contact: [this.i18n.t('pages.contact.title'), this.i18n.t('pages.contact.text')],
      book: [this.i18n.t('pages.booking.title'), this.i18n.t('pages.booking.text')],
      privacy: [this.i18n.t('legal.privacy.title'), this.i18n.t('legal.intro')],
      cookies: [this.i18n.t('legal.cookies.title'), this.i18n.t('legal.intro')],
      terms: [this.i18n.t('legal.terms.title'), this.i18n.t('legal.intro')]
    };

    const [title, description] = pages[localPath] ?? pages[''];
    this.seo.update(title, description, localPath);

    if (localPath === 'faq') {
      this.structuredData.setFaq(Array.from({ length: 6 }, (_, index) => ({
        question: this.i18n.t(`faq.q${index + 1}`),
        answer: this.i18n.t(`faq.a${index + 1}`)
      })));
    }
  }
}
