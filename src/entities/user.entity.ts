import { UserStatus } from 'src/apis/users/constants/user.enum';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { v7 } from 'uuid';
import { HASH_ROUNDS } from 'src/apis/auth/constants/auth.constant';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductLikeEntity } from 'src/entities/product-like.entity';

export type UserModel = Omit<
  UserEntity,
  'comparePassword' | 'toPersistence' | 'products' | 'productLikes'
>;

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('varchar', {
    length: 20,
    comment: '유저 이름',
  })
  name: string;

  @Column('varchar', {
    comment: '유저 핸드폰 번호',
    name: 'phone_number',
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column('varchar', {
    comment: '유저 이메일',
    unique: true,
  })
  email: string;

  @Column('varchar', {
    comment: '유저 패스워드',
  })
  password: string;

  @Column('enum', {
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    comment: '유저 상태',
  })
  status: UserStatus;

  @OneToMany(() => ProductEntity, (products) => products.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: ProductEntity[];

  @OneToMany(() => ProductLikeEntity, (productLikes) => productLikes.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productLikes: ProductLikeEntity[];

  static async create(
    createProps: Pick<
      UserEntity,
      'name' | 'phoneNumber' | 'email' | 'password'
    >,
  ): Promise<UserEntity> {
    const { name, phoneNumber, email, password } = createProps;

    const userEntity = new UserEntity();

    userEntity.id = v7();
    userEntity.name = name;
    userEntity.phoneNumber = phoneNumber;
    userEntity.email = email;
    userEntity.password = await bcrypt.hash(password, HASH_ROUNDS);
    userEntity.status = UserStatus.ACTIVE;
    userEntity.createdAt = new Date();
    userEntity.updatedAt = new Date();

    return userEntity;
  }

  comparePassword(plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  }

  toPersistence(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
