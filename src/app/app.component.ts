import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n/i18n.service';
import { SeoCoordinatorService } from './core/services/seo-coordinator.service';
import { CookieBannerComponent } from './layout/cookie-banner/cookie-banner.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { WhatsappButtonComponent } from './layout/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent, CookieBannerComponent],
  template: `
    <a class="skip-link" href="#main-content">{{ i18n.t('common.skipToContent') }}</a>
    <app-header />
    <main id="main-content" tabindex="-1"><router-outlet /></main>
    <app-footer />
    <app-whatsapp-button />
    <app-cookie-banner />
  `
})
export class AppComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly seoCoordinator = inject(SeoCoordinatorService);

  ngOnInit(): void {
    this.i18n.syncLanguageFromUrl();
    this.seoCoordinator.init();
  }
}
