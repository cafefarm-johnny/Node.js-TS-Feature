import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    AllowNull,
    Default,
    Comment,
    Is,
    CreatedAt,
    UpdatedAt,
    DeletedAt
} from 'sequelize-typescript';

import { emailValidate } from '../../common/reg.validator';
import CustomError from '../../error/custom.error';

@Table({
    freezeTableName: true,
    tableName: 'member',
    timestamps: true,
    underscored: true
})
export default class Member extends Model<Member> {
    @PrimaryKey
    @AutoIncrement
    @Comment('사용자 고유 번호')
    @Column(DataType.BIGINT)
    id!: number;

    @Comment('사용자 아이디')
    @Column(DataType.STRING(20))
    username!: string;

    // pbkdf2 암호화로 인해 암호화 전 검증으로 변경
    // @Is('pwValidate', (v: string) => {
    //     if (v && v.length < 8) {
    //         throw new CustomError(400, '비밀번호는 8자 이상 작성해주세요.');
    //     } else if (v && v.length > 20) {
    //         throw new CustomError(
    //             400,
    //             '비밀번호는 20자 이상 작성하실 수 없습니다.'
    //         );
    //     }
    // })
    @Comment('사용자 비밀번호')
    @Column(DataType.STRING(100))
    password!: string;

    @Comment('비밀번호 암호화 salt')
    @Column(DataType.STRING(100))
    passwordSalt!: string;

    @AllowNull(true)
    @Default(null)
    @Comment('사용자 이전 사용 비밀번호')
    @Column(DataType.STRING(100))
    beforePassword!: string;

    @Is('emailValidate', (v: string) => {
        if (!emailValidate(v)) {
            throw new CustomError(400, '이메일 형식이 아닙니다.');
        }
    })
    @Comment('사용자 이메일')
    @Column(DataType.STRING(100))
    email!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updateAt!: Date;

    @DeletedAt
    deleteAt!: Date;
}

/**
 * 테이블 강제 삭제 후 생성
 * @author Johnny
 */
// async function forceCreate(): Promise<void> {
//     try {
//         await Member.sync({ force: true }); // force: 테이블 존재하면 drop 후 생성
//         await Member.create({
//             username: 'test',
//             password: '12341234',
//             email: 'test@gmail.com'
//         });
//     } catch (e) {
//         console.error(e);
//     }
// }
