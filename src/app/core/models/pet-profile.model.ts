export type PetSpecies = 'dog' | 'cat' | 'other';
export type PetGender = 'female' | 'male' | 'unknown';

/** Future authenticated pet profile. Kept separate from the MVP booking request. */
export interface PetProfile {
  id: string;
  ownerId: string;
  photoUrl?: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  gender?: PetGender;
  dateOfBirth?: string;
  weightKg?: number;
  foodInstructions?: string;
  medication?: string;
  allergies?: string;
  vetInformation?: string;
  behavior?: string;
  emergencyContact?: string;
  specialInstructions?: string;
}
