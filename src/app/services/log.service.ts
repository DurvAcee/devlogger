import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public logs!: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: '',
    text: '',
    date: '',
  });

  public selectedLog = this.logSource.asObservable();
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();


  constructor() {
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated components',
    //     date: new Date('12/26/2017 12:54:23'),
    //   },
    //   {
    //     id: '2',
    //     text: 'Added bootstrap',
    //     date: new Date('12/27/2017 12:54:23'),
    //   },
    //   {
    //     id: '3',
    //     text: 'Added logs component',
    //     date: new Date('12/28/2017 12:54:23'),
    //   },
    // ];
    this.logs = [];
  }

  public getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  public setFormLog(log: Log){
    this.logSource.next(log);
  }

  public addLog(log: Log){
    this.logs.unshift(log);
  }

  public updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  public deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
  }

  public clearState(){
    this.stateSource.next(true);
  }
}
