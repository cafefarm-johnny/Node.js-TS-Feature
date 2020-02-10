import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Comment,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';

import Member from '../../member/model/member';

@Table({
    freezeTableName: true,
    tableName: 'file',
    timestamps: true,
    underscored: true
})
export default class File extends Model<File> {
    @PrimaryKey
    @AutoIncrement
    @Comment('파일 고유 번호')
    @Column(DataType.BIGINT)
    id!: number;

    @ForeignKey(() => Member)
    @Column(DataType.BIGINT)
    userId!: number;

    @BelongsTo(() => Member)
    member!: Member;

    @Comment('파일명')
    @Column(DataType.STRING(255))
    filename!: string;

    @Comment('파일 크기')
    @Column(DataType.INTEGER)
    size!: number;

    @CreatedAt
    createAt!: Date;

    @UpdatedAt
    updateAt!: Date;

    @DeletedAt
    deleteAt!: Date;
}
