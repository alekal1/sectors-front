import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SectorDto } from '../_dto/sectorDto';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class SectorService {
    readonly sectorApi = "http://localhost:8080/api/sector";

    constructor(private client: HttpClient) {}

    /**
     * Get all sectors
     * @return Observable<Sector[]> all sectors
     */
    public getSectors(): Observable<SectorDto[]> {
        return this.client.get<SectorDto[]>(`${this.sectorApi}`, httpOptions);
    }

    /**
     * Get sectors by type
     * @retutn Observable<Sector[]> sectors by type
     */

    public getSectorByType(type: string): Observable<SectorDto[]> {
        return this.client.get<SectorDto[]>(`${this.sectorApi}/${type}`, httpOptions);
    }

    /**
     * Get sectors by parentId
     * @return Observable<Sector[]> sectors by parent id
     */
    public getSectorsByParentId(id: number): Observable<SectorDto[]> {
        return this.client.get<SectorDto[]>(`${this.sectorApi}/parent/${id}`, httpOptions);
    }
}