import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './user';

@Entity({name: 'article'})
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    views!: number;

    @Column()
    create_time!: Date;

    @Column()
    update_time!: Date;

    @Column()
    is_delete!: number;

    @ManyToOne(()  => User, {
        cascade: true
    })

    @JoinColumn({name: 'user_id'})
    user!: User

}