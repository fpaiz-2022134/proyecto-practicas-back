import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    surname: string;
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({nullable: true})
    center: number | null; //Permite null en la columna
}

