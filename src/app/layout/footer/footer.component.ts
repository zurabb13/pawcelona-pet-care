import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { BUSINESS_CONFIG } from '../../core/config/business.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
  readonly business = BUSINESS_CONFIG;
  readonly year = new Date().getFullYear();
}
