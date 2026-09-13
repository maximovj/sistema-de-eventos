import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Artista } from '@repo/shared-types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArtistasService {
    private readonly apiUrl = 'http://localhost:3080/artistas';
    private readonly http = inject(HttpClient);

    artistas(): Observable<Artista[]> {
        return this.http.get<Artista[]>(`${this.apiUrl}`);
    }

    guardar(data: Artista): Observable<Artista> {
        return this.http.post<Artista>(this.apiUrl, data);
    }

    actualizar(id: string, data: Artista): Observable<Artista> {
        return this.http.put<Artista>(`${this.apiUrl}/${id}`, data);
    }

    eliminar(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}