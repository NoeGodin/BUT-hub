  export class User {
    games!: {
      tetris: {
        level: number;
        lignes: number;
        score: number;
      };
    };
    id!: string;
    pseudo!: string;
  }