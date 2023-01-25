import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Query, Inject } from '@nestjs/common'
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase
} from 'micro-videos/application'

import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { SearchCategoryDto } from './dto/search-category.dto'

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private readonly createUseCase: CreateCategoryUseCase

  @Inject(UpdateCategoryUseCase)
  private readonly updateUseCase: UpdateCategoryUseCase

  @Inject(DeleteCategoryUseCase)
  private readonly deleteUseCase: DeleteCategoryUseCase

  @Inject(GetCategoryUseCase)
  private readonly getUseCase: GetCategoryUseCase

  @Inject(ListCategoriesUseCase)
  private readonly listUseCase: ListCategoriesUseCase

  @Post()
  async create (@Body() createCategoryDto: CreateCategoryDto) {
    return await this.createUseCase.run(createCategoryDto)
  }

  @Get()
  async search (@Query() searchParams: SearchCategoryDto) {
    return await this.listUseCase.run(searchParams)
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.getUseCase.run({ id })
  }

  @Put(':id')
  async update (@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.updateUseCase.run({
      id,
      ...updateCategoryDto
    })
  }

  @HttpCode(204)
  @Delete(':id')
  async remove (@Param('id') id: string) {
    return await this.deleteUseCase.run({ id })
  }
}
