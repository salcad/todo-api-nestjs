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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ListItemDto } from './dto/listItem.dto';
import { ListItem as ListItemEntity } from './listItem.entity';
import { ListItemsService } from './listItems.service';

@Controller('list-items')
export class ListItemsController {
  constructor(private readonly listItemsService: ListItemsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ListItemEntity> {
    const listItem = await this.listItemsService.get(id);
    if (!listItem) {
      throw new NotFoundException("This ListItem doesn't exist");
    }
    return listItem;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() listItem: ListItemDto): Promise<ListItemEntity> {
    return await this.listItemsService.create(listItem);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() listItem: ListItemDto,
  ): Promise<ListItemEntity> {
    const updatedListItem = await this.listItemsService.update(id, listItem);
    if (!updatedListItem) {
      throw new NotFoundException("This ListItem doesn't exist");
    }
    return updatedListItem;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.listItemsService.delete(id);
    if (!deleted) {
      throw new NotFoundException("This ListItem doesn't exist");
    }
    return 'Successfully deleted';
  }
}
