export interface Login {
  matricule: string;
  password: string;
}

export interface User extends Login {
  _id: string;
  prenom: string;
  nom: string;
  email: string;
  domaine: string;
  role: string;
}
