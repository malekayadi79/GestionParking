export interface Parking {
  id?: string;
  nom: string;
  description?: string;
  typeParking: string; // Ou une Enum si vous l'avez créée en TS
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  prixInitial: number;
  prixPromos: number;
  dateDebutPromos?: Date;
  dateFinPromos?: Date;
  isEvent: boolean;
  spots?: any[]; // On met any[] pour l'instant pour ne pas bloquer
}