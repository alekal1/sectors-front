export class SectorDto {
    id: number;
    name: string;
    type: string;
    parentSector: SectorDto

    constructor(
        id: number,
        name: string,
        type: string,
        parentSector: SectorDto
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.parentSector = parentSector;
    }

}