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
