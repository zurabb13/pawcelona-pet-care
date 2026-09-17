import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICES } from './core/config/services.config';
import { SUPPORTED_LOCALES } from './core/i18n/translations';

const localeParams = () => SUPPORTED_LOCALES.map((lang) => ({ lang }));

const serviceParams = () =>
	SUPPORTED_LOCALES.flatMap((lang) =>
		SERVICES.map((service) => ({
			lang,
			slug: service.slug,
		})),
	);

export const serverRoutes: ServerRoute[] = [
	{
		path: '',
		renderMode: RenderMode.Prerender,
	},

	{
		path: ':lang',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/services',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/services/:slug',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => serviceParams(),
	},

	{
		path: ':lang/prices',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/how-it-works',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/about',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/safety',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/areas',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/faq',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/contact',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/book',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/privacy',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/cookies',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/terms',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: ':lang/not-found',
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => localeParams(),
	},

	{
		path: '**',
		renderMode: RenderMode.Client,
	},
];
