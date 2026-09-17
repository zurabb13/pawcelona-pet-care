import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Locale, SUPPORTED_LOCALES, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  readonly language = signal<Locale>('es');
  readonly locales = SUPPORTED_LOCALES;

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      this.syncLanguageFromUrl();
    });
  }

  syncLanguageFromUrl(): void {
    const candidate = this.router.url.split('?')[0].split('/').filter(Boolean)[0] as Locale | undefined;
    const locale = candidate && SUPPORTED_LOCALES.includes(candidate) ? candidate : 'es';
    this.language.set(locale);
    this.document.documentElement.lang = locale;
  }

  t(key: string): string {
    const locale = this.language();
    return TRANSLATIONS[locale][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  switchLanguage(locale: Locale): void {
    const pieces = this.router.url.split('?')[0].split('/').filter(Boolean);
    if (pieces.length && SUPPORTED_LOCALES.includes(pieces[0] as Locale)) {
      pieces[0] = locale;
    } else {
      pieces.unshift(locale);
    }
    void this.router.navigateByUrl('/' + pieces.join('/'));
  }

  localized(path = ''): string {
    const normalized = path.startsWith('/') ? path.slice(1) : path;
    return `/${this.language()}${normalized ? '/' + normalized : ''}`;
  }
}
