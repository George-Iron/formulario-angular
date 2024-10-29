import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:3000/api';  

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario (POST)
  registrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  // Método para obtener los registros existentes (GET)
  obtenerRegistros(): Observable<any> {
    console.log(`Obteniendo registros desde ${this.apiUrl}/registros`); // Verificar que la solicitud GET se realiza correctamente
    return this.http.get(`${this.apiUrl}/registros`);
  }

  eliminarRegistro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/registro/${id}`);
  }

  modificarRegistro(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/registro/${id}`, data);
  }

}
