import {
  Table,
  Column,
  Model,
  Length,
  DataType,
} from "sequelize-typescript";

import {
  MAX_BLOGPOST_TITLE_LENGTH,
  MAX_BLOGPOST_CONTENT_LENGTH,
  MAX_PROJECT_NAME_LENGTH,
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MAX_PROJECT_LINK_LENGTH,
} from "./constants";

@Table
export class BlogPost extends Model {
  @Length({ min: 1, max: 100 })
  @Column
  cover: string;

  @Length({ min: 1, max: MAX_BLOGPOST_TITLE_LENGTH })
  @Column
  title: string;

  @Length({ min: 1, max: MAX_BLOGPOST_CONTENT_LENGTH })
  @Column(DataType.TEXT)
  content: string;
}

@Table
export class Project extends Model {
  @Length({ min: 1, max: 100 })
  @Column
  cover: string;

  @Length({ min: 1, max: MAX_PROJECT_NAME_LENGTH })
  @Column
  name: string;

  @Length({ min: 1, max: MAX_PROJECT_DESCRIPTION_LENGTH })
  @Column(DataType.TEXT)
  description: string;

  @Length({ min: 1, max: MAX_PROJECT_LINK_LENGTH })
  @Column
  link: string;
}
