import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // CREATE
    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    //GENERATE CENTER
    private generateCenter():number{
        //Generamos un número alazar de 4 dígitos
        return Math.floor(1000 + Math.random() * 9000)
    }

    // FIND ALL USERS
    async findAll(): Promise<User[]> {

        const users = await this.userRepository.find();

        return users.map(user =>({
            ...user,
            center: user.center ?? this.generateCenter()
        }))

        /* for( let user of users){
            if(user.center === null){
                user.center = this.generateCenter();
                await this.userRepository.save(user);;
            }
        }

        return this.userRepository.find(); */

    }

    // SEARCH USER BY ID
    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        if(user.center == null){
            user.center = this.generateCenter();/* 
            await this.userRepository.save(user) */

        }
        return user;
    }

    // UPDATE USER
    async update(id: number, data: Partial<User>): Promise<void> {
        const result = await this.userRepository.update(id, data);
        if (result.affected === 0) {
            throw new Error(`User with id ${id} not found`);
        }
    }

    // DELETE USER
    async delete(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`User with id ${id} not found`);
        }
    }
}
