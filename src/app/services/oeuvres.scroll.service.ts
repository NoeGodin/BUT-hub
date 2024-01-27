import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
  lastOeuvreClicked: string | null = null;

  setLastOeuvreClicked(id:string){
    this.lastOeuvreClicked = id;
  }

  getLastOeuvreClicked(){
    return this.lastOeuvreClicked;
  }
}
