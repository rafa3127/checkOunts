import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }
  generateID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = characters.length;
    for (let i = 0; i < 30; i++) {
        result += characters.charAt(Math.floor(Math.random() * length));
    }

    return result;
   }
   jsonConverter(string: string): any{
    var s = string;
    s = s.replace(/'/g, '"')
    s = JSON.parse(s) 
    return s 
   }
}