import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { ParseIntPipe } from '@nestjs/common';

@Controller('User')
export class UserController {
    constructor( private readonly userService: UserService ){}

    @Post()
    create (@Body() data: Partial<User>): Promise<User>{
        return this.userService.create(data);
    } 

    @Get()
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<User>): Promise<void>{
        return this.userService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.userService.delete(id);
    }
}
