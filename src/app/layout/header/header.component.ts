import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { Locale } from '../../core/i18n/translations';
import { BUSINESS_CONFIG } from '../../core/config/business.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
  private readonly platformId = inject(PLATFORM_ID);
  readonly mobileOpen = signal(false);
  readonly compact = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) this.compact.set(window.scrollY > 18);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.mobileOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.mobileOpen.set(false);
  }

  changeLanguage(value: string): void {
    this.i18n.switchLanguage(value as Locale);
    this.closeMenu();
  }

  whatsappHref(): string {
    return `https://wa.me/${this.business.whatsappNumber}?text=${encodeURIComponent(this.i18n.t('whatsapp.prefill'))}`;
  }
}
