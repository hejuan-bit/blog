import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './user';

@Entity({name: 'user_anths'})
export class UserAuth extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    identity_type!: string;

    @Column()
    identifier!: string;

    @Column()
    credential!: string;

    @Column()
    introduce!: string;

    @ManyToOne(()  => User, {
        cascade: true
    })

    @JoinColumn({name: 'user_id'})
    user!: User

}