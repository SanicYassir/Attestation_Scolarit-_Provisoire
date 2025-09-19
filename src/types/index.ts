export interface StudentInfo {
  nom: string;
  prenom: string;
  cin: string;
  cne: string;
  dateNaissance: string;
  adresse: string;
  sexe: 'Homme' | 'Femme';
  diplome: 'Diplôme de cycle préparatoire intégré' | 'Diplome d\'ingenieur d\'etat en chimie';
  annee: '1ère année cycle préparatoire intégré' | '2ème année cycle préparatoire intégré' | '1ère année cycle ingénieur' | '2ème année cycle ingénieur' |'3ème année cycle ingénieur' ;
  dateNow: string;
  apogee:string
}