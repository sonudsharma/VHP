import { City } from "./City";
export class Address {

  id: number;
  name: string;
  postalcode: string;
  fulladdress: string;
  city: City;
  
  // constructor(){}

  constructor(id: number, name: string, postalcode: string, fulladdress: string, city: City) {

    this.id = id;
    this.name = name;
    this.postalcode = postalcode;
    this.fulladdress = fulladdress;
    this.city = city;

  }

}