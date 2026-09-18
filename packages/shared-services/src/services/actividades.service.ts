import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actividad } from '@repo/shared-types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActividadesService {
    private readonly apiUrl = 'http://localhost:3080/actividades';
    private readonly http = inject(HttpClient);

    actividades(): Observable<Actividad[]> {
        return this.http.get<Actividad[]>(`${this.apiUrl}`);
    }

    guardar(data: Actividad) {
        return this.http.post<Actividad>(`${this.apiUrl}`, data);
    }

    actualizar(id: string, data: Actividad) {
        return this.http.put<Actividad>(`${this.apiUrl}/${id}`, data);
    }

    eliminar(id: string) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}