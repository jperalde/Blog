/*
@Entity()
export class UserEntity extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  username!: string;

  @Column('varchar', { length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column('int', { nullable: false, default: roles.USER })
  role!: number;
}
*/
