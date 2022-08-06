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

import { ListDto } from './dto/list.dto';
import { List as ListEntity } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private readonly listService: ListsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('/pinned')
  async findAll(@Request() req) {
    return await this.listService.getPinned(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ListEntity> {
    const list = await this.listService.get(id);
    if (!list) {
      throw new NotFoundException("This List doesn't exist");
    }
    return list;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() list: ListDto, @Request() req): Promise<ListEntity> {
    return await this.listService.create(
      list.categoryId,
      list.title,
      req.user.id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() list: ListDto,
  ): Promise<ListEntity> {
    const updatedList = await this.listService.update(id, list);
    return updatedList;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.listService.delete(id);
    if (!deleted) {
      throw new NotFoundException("This List doesn't exist");
    }
    return 'Successfully deleted';
  }
}
