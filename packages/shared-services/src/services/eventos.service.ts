import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '@repo/shared-types';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private readonly apiUrl = 'http://localhost:3080/eventos';
  private readonly http = inject(HttpClient);

  eventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }
}
