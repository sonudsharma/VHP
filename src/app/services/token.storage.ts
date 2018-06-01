import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const ID = "id";
const TYPE = "type";
const NAME = "name";
const EMAIL = "email";

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveId(id: string) {
    window.sessionStorage.removeItem(ID);
    window.sessionStorage.setItem(ID, id);
  }

  public saveType(type: string) {
    window.sessionStorage.removeItem(TYPE);
    window.sessionStorage.setItem(TYPE, type);
  }

  public saveName(name: string) {
    window.sessionStorage.removeItem(NAME);
    window.sessionStorage.setItem(NAME, name);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }


  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getId(): string {
    return sessionStorage.getItem(ID);
  }

  public getName(): string {
    return sessionStorage.getItem(NAME);
  }

  public getType(): string {
    return sessionStorage.getItem(TYPE);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL);
  }
}