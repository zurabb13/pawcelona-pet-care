export interface ServiceOption {
  labelKey: string;
  duration?: number;
  price: number;
}

export interface PetService {
  id: string;
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  longDescriptionKey: string;
  eyebrowKey: string;
  priceFrom: number;
  image: string;
  features: string[];
  options?: ServiceOption[];
}
