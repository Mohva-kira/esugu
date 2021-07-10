import { DecimalPipe } from "@angular/common";

export class Orders {
  id!: number;
  adresse !: string;
  codePostal !: string;
  ville !: string;
  pays!: string;
  tel !: string;
  produits !: any[];
  montant !: DecimalPipe;
  user !: any;
  status !: number;



}
