import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  async findAll(@Request() req) {
    return await this.categoryService.getAll(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.get(id);

    if (!category) {
      throw new NotFoundException("This Category doesn't exist");
    }

    return category;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(
    @Body() category: CategoryDto,
    @Request() req,
  ): Promise<Category> {
    return await this.categoryService.create(req.user.id, category.title);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() category: CategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.updateTitle(
      id,
      category.title,
    );
    return updatedCategory;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoryService.delete(id);
    return;
  }
}
