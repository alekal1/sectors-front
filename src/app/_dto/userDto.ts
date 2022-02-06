export class UserDto {
    id: number;
    username: string;
    agreeToTerms: boolean;
    sectorsIds: Array<number>;

    constructor(
        username: string,
        agreeToTerms: boolean,
        sectorsIds: Array<number>
    ) {
        this.username = username;
        this.agreeToTerms = agreeToTerms;
        this.sectorsIds = sectorsIds;
    }
}