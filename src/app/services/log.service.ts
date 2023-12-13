import { Injectable } from '@angular/core';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public logs!: Log[];

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'Generated components',
        date: new Date('12/26/2017 12:54:23')
      },
      {
        id: '2',
        text: 'Added bootstrap',
        date: new Date('12/27/2017 12:54:23')
      },
      {
        id: '3',
        text: 'Added logs component',
        date: new Date('12/28/2017 12:54:23')
      }
    ]
   }

   public getLogs() {
    return this.logs;
   }
}
