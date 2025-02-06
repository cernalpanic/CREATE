export class Note {
    
    id: number;
    dateCreated: Date;
    description: string;

    constructor(id: number, dateCreated: Date, description: string)
    {
        this.id = id;
        this.dateCreated = dateCreated;
        this.description = description;
    }

    get getId(): number{
        return this.id;
    }
    get getDateCreated(): Date{
        return this.dateCreated;
    }
    get getDescription(): string{
        return this.description;
    }

    set setId(id: number){
        this.id = id;
    }
    set setDateCreated(dateCreated: Date){
        this.dateCreated = dateCreated;
    }
    set setDescription(description: string){
        this.description = description;
    }
}