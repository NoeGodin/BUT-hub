  export class Oeuvre {
    constructor(public imageURL: string,
                public titre: string,
                public auteur: string,
                public description: string,
                public date: Date,
                public courant: string,
                public like: number) {
    }
  }