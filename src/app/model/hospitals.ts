export class Hospitals {

  regId: string;
  name: string;
  address: string;
  phone: string;
  email: string;

  // constructor(){}

  constructor(regId: string, name: string, address: string, phone: string, email: string) {
    this.regId = regId;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

}