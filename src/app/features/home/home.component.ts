import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { ServicesPreviewComponent } from './sections/services-preview/services-preview.component';
import { TrustStripComponent } from './sections/trust-strip/trust-strip.component';
import { HowItWorksComponent } from './sections/how-it-works/how-it-works.component';
import { TrustSectionComponent } from './sections/trust-section/trust-section.component';
import { PricingPreviewComponent } from './sections/pricing-preview/pricing-preview.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { AreasPreviewComponent } from './sections/areas-preview/areas-preview.component';
import { FaqPreviewComponent } from './sections/faq-preview/faq-preview.component';
import { FinalCtaComponent } from './sections/final-cta/final-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TrustStripComponent, ServicesPreviewComponent, HowItWorksComponent, TrustSectionComponent, PricingPreviewComponent, TestimonialsComponent, AreasPreviewComponent, FaqPreviewComponent, FinalCtaComponent],
  template: `
    <app-hero />
    <app-trust-strip />
    <app-services-preview />
    <app-how-it-works />
    <app-trust-section />
    <app-pricing-preview />
    <app-testimonials />
    <app-areas-preview />
    <app-faq-preview />
    <app-final-cta />
  `
})
export class HomeComponent {}
