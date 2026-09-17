export interface CustomerReview {
  customerName: string;
  petName?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  serviceId: string;
  review: string;
  customerPhoto?: string;
  petPhoto?: string;
}

/**
 * Add only genuine reviews for which you have permission to publish the text/photos.
 * The homepage review section stays hidden while this array is empty.
 */
export const CUSTOMER_REVIEWS: CustomerReview[] = [];
