import { DataType } from '@src/shared/enums/app.enums';
import { MelodyType } from '@src/shared/enums/app.enums';

export class Entity {
  melodyId: string = '';
  type!: string;
  rhythmNote: string = '';
  organization: string = '';
  title: string = '';
  isActive: boolean = false;
  createTime: string = '';
  updateTime: string = '';
}

export class EntityCreateRequest {
  dataType: DataType = DataType.ENTITY;
  melodyId!: string;
  type!: string;
  organization!: string;
  title!: string;
  isActive = true;
  attributes: Array<AttributeCreateRequest> = [];
}

export class EntitySearchRequest {
  dataType: DataType = DataType.ENTITY;
  organization!: string;
  searchText: string = '';
  code: Array<string> = [MelodyType.TUNE, MelodyType.NOTE];
  pageIndex: number = 0;
  pageSize: number = 20;
}

// export class EntryDetailSearchRequest {
//   melodyId!: string;

//   constructor(id: string) {
//     this.melodyId = id;
//   }
// }

export class EntityDeleteRequest {
  dataType: DataType = DataType.ENTITY;
  melodyIds!: string[];
}

export class AttributeCreateRequest {
  mainSound!: string;
  paths!: PathCreateRequest[];
}

export class PathCreateRequest {
  audioPath: string = '';
  chordType: string = '';
  soundType: string = '';
  experimentName: string = '';
  description: string = '';
  isDefault: boolean = false;
  isActive: boolean = true;
  isFeatured: boolean = false;
}
