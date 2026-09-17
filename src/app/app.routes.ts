import { Routes } from '@angular/router';
import { languageGuard } from './core/i18n/language.guard';
import { serviceGuard } from './core/services/service.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'es',
	},

	{
		path: ':lang',
		canActivate: [languageGuard],

		children: [
			{
				path: '',
				loadComponent: () =>
					import('./features/home/home.component').then((m) => m.HomeComponent),
			},

			{
				path: 'services',
				loadComponent: () =>
					import('./features/services/services.component').then(
						(m) => m.ServicesComponent,
					),
			},

			{
				path: 'services/:slug',
				canActivate: [serviceGuard],
				loadComponent: () =>
					import('./features/services/service-detail.component').then(
						(m) => m.ServiceDetailComponent,
					),
			},

			{
				path: 'prices',
				loadComponent: () =>
					import('./features/pricing/pricing.component').then(
						(m) => m.PricingComponent,
					),
			},

			{
				path: 'how-it-works',
				loadComponent: () =>
					import('./features/how-it-works/how-it-works-page.component').then(
						(m) => m.HowItWorksPageComponent,
					),
			},

			{
				path: 'about',
				loadComponent: () =>
					import('./features/about/about.component').then(
						(m) => m.AboutComponent,
					),
			},

			{
				path: 'safety',
				loadComponent: () =>
					import('./features/safety/safety.component').then(
						(m) => m.SafetyComponent,
					),
			},

			{
				path: 'areas',
				loadComponent: () =>
					import('./features/service-areas/service-areas.component').then(
						(m) => m.ServiceAreasComponent,
					),
			},

			{
				path: 'faq',
				loadComponent: () =>
					import('./features/faq/faq.component').then((m) => m.FaqComponent),
			},

			{
				path: 'contact',
				loadComponent: () =>
					import('./features/contact/contact.component').then(
						(m) => m.ContactComponent,
					),
			},

			{
				path: 'book',
				loadComponent: () =>
					import('./features/booking/booking.component').then(
						(m) => m.BookingComponent,
					),
			},

			{
				path: 'privacy',
				data: {
					titleKey: 'legal.privacy.title',
				},
				loadComponent: () =>
					import('./features/legal/legal.component').then(
						(m) => m.LegalComponent,
					),
			},

			{
				path: 'cookies',
				data: {
					titleKey: 'legal.cookies.title',
				},
				loadComponent: () =>
					import('./features/legal/legal.component').then(
						(m) => m.LegalComponent,
					),
			},

			{
				path: 'terms',
				data: {
					titleKey: 'legal.terms.title',
				},
				loadComponent: () =>
					import('./features/legal/legal.component').then(
						(m) => m.LegalComponent,
					),
			},

			{
				path: 'not-found',
				loadComponent: () =>
					import('./features/not-found/not-found.component').then(
						(m) => m.NotFoundComponent,
					),
			},

			{
				path: '**',
				redirectTo: 'not-found',
			},
		],
	},

	{
		path: '**',
		redirectTo: 'es/not-found',
	},
];
