import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SERVICES } from '../config/services.config';
import { Locale, SUPPORTED_LOCALES } from '../i18n/translations';

export const serviceGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get('slug');
  if (slug && SERVICES.some((service) => service.slug === slug)) return true;

  const candidate = route.parent?.paramMap.get('lang') ?? 'es';
  const lang: Locale = SUPPORTED_LOCALES.includes(candidate as Locale) ? (candidate as Locale) : 'es';
  return inject(Router).createUrlTree([`/${lang}/not-found`]);
};
