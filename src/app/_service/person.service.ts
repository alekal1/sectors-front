import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { UserDto } from "../_dto/userDto";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
    }),
    resolveWithFullResponse: true
};

@Injectable({
    providedIn: 'root'
})

export class UserService {
    readonly userApi = "http://localhost:8080/api/user";

    constructor(private client: HttpClient) {}

    /**
     * Add new user
     */
    public async addUser(userDto: UserDto): Promise<UserDto> {
        return this.client.post<UserDto>(`${this.userApi}/add`, userDto, httpOptions).toPromise();
    }

    /**
     * Get user's data in new window
     */
    public getUserData(id: number, name: string): void {
        this.client.get(`${this.userApi}/download/${id}/${name}`, {responseType: 'blob' as 'json'}).subscribe(
            (res: any) => {
                this.showData(res);
            }
        );
    }

    private showData(res: any) {
        let dataType = res.type;
        let binaryData = [];
        binaryData.push(res);
        let blob = new Blob(binaryData, {type: dataType})
        let url = window.URL.createObjectURL(blob);
        window.open(url);
    }
}