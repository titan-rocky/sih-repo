interface IFfakeDb {
  [key: string]: string;
}

export class fakeDB {
  data: IFfakeDb = {};
  addData(user: string, pass: string) {
    this.data[user] = pass;
  }
  getPass(user: string) {
    return this.data[user];
  }
}
