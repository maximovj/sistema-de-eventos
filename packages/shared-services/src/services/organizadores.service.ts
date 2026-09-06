import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizador } from '@repo/shared-types';

@Injectable({
  providedIn: 'root'
})
export class OrganizadoresService {
  private readonly apiUrl = 'http://localhost:3080/organizadores';
  private readonly http = inject(HttpClient);

  organizadores(): Observable<Organizador[]> {
    return this.http.get<Organizador[]>(this.apiUrl);
  }

  guardar(data: Organizador): Observable<Organizador> {
    return this.http.post<Organizador>(this.apiUrl, data);
  }

  actualizar(id: string, data: Organizador) {
    return this.http.put<Organizador>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
