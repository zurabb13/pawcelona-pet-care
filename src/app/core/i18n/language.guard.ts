import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Locale, SUPPORTED_LOCALES } from './translations';

export const languageGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang') as Locale | null;
  return lang && SUPPORTED_LOCALES.includes(lang)
    ? true
    : inject(Router).createUrlTree(['/es/not-found']);
};
