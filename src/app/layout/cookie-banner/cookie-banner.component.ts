import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (visible()) {
      <aside class="cookie-banner" role="dialog" aria-live="polite" [attr.aria-label]="i18n.t('cookies.title')">
        <div>
          <strong>{{ i18n.t('cookies.title') }}</strong>
          <p>{{ i18n.t('cookies.text') }} <a [routerLink]="i18n.localized('cookies')">{{ i18n.t('cookies.more') }}</a></p>
        </div>
        <button class="btn btn--primary btn--small" type="button" (click)="acknowledge()">{{ i18n.t('cookies.accept') }}</button>
      </aside>
    }
  `
})
export class CookieBannerComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visible.set(localStorage.getItem('pawcelona_cookie_notice') !== 'acknowledged-v1');
  }

  acknowledge(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('pawcelona_cookie_notice', 'acknowledged-v1');
    }
    this.visible.set(false);
  }
}
