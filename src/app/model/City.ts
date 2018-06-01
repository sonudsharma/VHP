import { State } from "./state";
export class City {

  id: number;
  name: string;
  state: State;

  // constructor(){}

  constructor(id: number, name: string, state: State) {

    this.id = id;
    this.name = name;
    this.state = state;

  }

}