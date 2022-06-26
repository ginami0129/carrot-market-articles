// 게시글 고유 번호
// 제목
// 본문
// 생성 시각
// 수정 시각

import { Column, PrimaryGeneratedColumn } from 'typeorm';

// 삭제 시각
export class Article {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public desc: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
