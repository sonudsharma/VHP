import { Country } from "./Country";
export class State {

  id: number;
  name: string;
  country: Country;

  // constructor(){}

  constructor(id: number, name: string, country: Country) {

    this.id = id;
    this.name = name;
    this.country = country;
  }

}