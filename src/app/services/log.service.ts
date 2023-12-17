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
    this.logs = [];
  }

  public getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }
    else {
      this.logs = JSON.parse(localStorage.getItem('logs') ?? '[]');
    }
    return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  public localStorageSync(){
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  
  public setFormLog(log: Log){
    this.logSource.next(log);
  }

  public addLog(log: Log){
    this.logs.unshift(log);
    this.localStorageSync();
  }

  public updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    this.localStorageSync();
  }

  public deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id){
        this.logs.splice(index, 1);
      }
    });
    this.localStorageSync();
  }

  public clearState(){
    this.stateSource.next(true);
  }
}
