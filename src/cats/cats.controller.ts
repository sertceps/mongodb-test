import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('/cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get()
    async getAllCats() {
        return await this.catsService.findAll();
    }

    @Post()
    async createCat(@Body() body) {
        const cat = await this.catsService.create({
            name: body.name,
            age: body.age,
        });
        return { id: cat._id };
    }
}
