export class Document {

  fileName: string;
  size: string;
  Path: string;
  category: string;
  userId: string;

  // constructor(){}

  constructor(fileName: string, size: string, Path: string, category: string, userId: string) {
    this.fileName = fileName;
    this.size = size;
    this.Path = Path;
    this.category = category;
    this.userId = userId;
  }

}