import { PetService } from '../models/service.model';

/**
 * SERVICE CATALOG
 * Prices here are starter/demo values until the business owner confirms the commercial rates.
 * Adding a new service here automatically makes it available to the Services page and booking form.
 */
export const SERVICES: PetService[] = [
  {
    id: 'dog-walking', slug: 'dog-walking', titleKey: 'services.dogWalking.title', shortDescriptionKey: 'services.dogWalking.short', longDescriptionKey: 'services.dogWalking.long', eyebrowKey: 'services.dogWalking.eyebrow', priceFrom: 15,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.routine', 'services.features.photos', 'services.features.water'],
    options: [{ labelKey: 'pricing.walk30', duration: 30, price: 15 }, { labelKey: 'pricing.walk60', duration: 60, price: 22 }]
  },
  {
    id: 'pet-sitting', slug: 'pet-sitting', titleKey: 'services.petSitting.title', shortDescriptionKey: 'services.petSitting.short', longDescriptionKey: 'services.petSitting.long', eyebrowKey: 'services.petSitting.eyebrow', priceFrom: 24,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.homeRoutine', 'services.features.photos', 'services.features.play']
  },
  {
    id: 'cat-sitting', slug: 'cat-sitting', titleKey: 'services.catSitting.title', shortDescriptionKey: 'services.catSitting.short', longDescriptionKey: 'services.catSitting.long', eyebrowKey: 'services.catSitting.eyebrow', priceFrom: 16,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.feeding', 'services.features.litter', 'services.features.photos']
  },
  {
    id: 'home-visits', slug: 'home-visits', titleKey: 'services.homeVisits.title', shortDescriptionKey: 'services.homeVisits.short', longDescriptionKey: 'services.homeVisits.long', eyebrowKey: 'services.homeVisits.eyebrow', priceFrom: 15,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.feeding', 'services.features.medication', 'services.features.photos']
  },
  {
    id: 'overnight-care', slug: 'overnight-care', titleKey: 'services.overnight.title', shortDescriptionKey: 'services.overnight.short', longDescriptionKey: 'services.overnight.long', eyebrowKey: 'services.overnight.eyebrow', priceFrom: 55,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.overnight', 'services.features.routine', 'services.features.photos']
  },
  {
    id: 'pet-taxi', slug: 'pet-taxi', titleKey: 'services.petTaxi.title', shortDescriptionKey: 'services.petTaxi.short', longDescriptionKey: 'services.petTaxi.long', eyebrowKey: 'services.petTaxi.eyebrow', priceFrom: 18,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.transport', 'services.features.vet', 'services.features.updates']
  },
  {
    id: 'puppy-visits', slug: 'puppy-visits', titleKey: 'services.puppyVisits.title', shortDescriptionKey: 'services.puppyVisits.short', longDescriptionKey: 'services.puppyVisits.long', eyebrowKey: 'services.puppyVisits.eyebrow', priceFrom: 15,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.routine', 'services.features.play', 'services.features.photos']
  },
  {
    id: 'vet-visit-assistance', slug: 'vet-visit-assistance', titleKey: 'services.vetAssistance.title', shortDescriptionKey: 'services.vetAssistance.short', longDescriptionKey: 'services.vetAssistance.long', eyebrowKey: 'services.vetAssistance.eyebrow', priceFrom: 22,
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.transport', 'services.features.vet', 'services.features.updates']
  },
  {
    id: 'weekend-holiday-care', slug: 'weekend-holiday-care', titleKey: 'services.holidayCare.title', shortDescriptionKey: 'services.holidayCare.short', longDescriptionKey: 'services.holidayCare.long', eyebrowKey: 'services.holidayCare.eyebrow', priceFrom: 20,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=84',
    features: ['services.features.homeRoutine', 'services.features.photos', 'services.features.updates']
  }
];
