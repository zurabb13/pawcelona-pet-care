import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BUSINESS_CONFIG } from '../config/business.config';
import { I18nService } from '../i18n/i18n.service';
import { Locale, SUPPORTED_LOCALES } from '../i18n/translations';
import { environment } from '../../../environments/environment';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_ES',
  es: 'es_ES',
  ca: 'ca_ES',
  ru: 'ru_RU'
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  update(pageTitle: string, description: string, path = '', options: { index?: boolean; image?: string } = {}): void {
    const brand = BUSINESS_CONFIG.workingBrand;
    const fullTitle = pageTitle.includes(brand) ? pageTitle : `${pageTitle} | ${brand}`;
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    const canonical = `${environment.siteUrl}${this.i18n.localized(cleanPath)}`;
    const image = options.image ?? BUSINESS_CONFIG.heroImage;
    const index = options.index !== false;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: index ? 'index,follow,max-image-preview:large' : 'noindex,follow' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[this.i18n.language()] });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:site_name', content: brand });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.setCanonical(canonical);
    this.setAlternates(cleanPath);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setAlternates(path: string): void {
    this.document.querySelectorAll('link[data-pawcelona-alt]').forEach((node) => node.remove());
    for (const locale of SUPPORTED_LOCALES) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = locale;
      link.href = `${environment.siteUrl}/${locale}${path ? '/' + path : ''}`;
      link.dataset['pawcelonaAlt'] = 'true';
      this.document.head.appendChild(link);
    }
    const fallback = this.document.createElement('link');
    fallback.rel = 'alternate';
    fallback.hreflang = 'x-default';
    fallback.href = `${environment.siteUrl}/es${path ? '/' + path : ''}`;
    fallback.dataset['pawcelonaAlt'] = 'true';
    this.document.head.appendChild(fallback);
  }
}
