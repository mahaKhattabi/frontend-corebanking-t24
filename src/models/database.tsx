export interface Domain {
  _id: string;
  nameD: string;
  description: string;
  processus: Process[];
  tables: Table[];
}

export interface Process {
  _id: string;
  nameP: string;
  description: string;
  domaines: Domain[];
  tables: Table[];
}

export interface Table {
  _id: string;
  nameT: string;
  description: string;
  processus: Process[];
  domaines: Domain[];
}
