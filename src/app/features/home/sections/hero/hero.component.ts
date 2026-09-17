import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS_CONFIG } from '../../../../core/config/business.config';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
  readonly whatsappHref = computed(() => `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(this.i18n.t('whatsapp.prefill'))}`);
}
