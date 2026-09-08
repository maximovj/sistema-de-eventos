import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sede } from '@repo/shared-types';

@Injectable({providedIn: 'root'})
export class SedeService {
    private readonly apiUrl = 'http://localhost:3080/sedes';
    private readonly httpClient = inject(HttpClient);

    sedes() :Observable<Sede[]> {
        return this.httpClient.get<Sede[]>(this.apiUrl);
    }

    guardar(data: Sede): Observable<Sede> {
        return this.httpClient.post<Sede>(this.apiUrl, data);
    }

    actualizar(id: string, data: Sede): Observable<Sede> {
        return this.httpClient.put<Sede>(`${this.apiUrl}/${id}`, data);
    }

    eliminar(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
    }

}