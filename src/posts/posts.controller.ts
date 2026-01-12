import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private userService: UsersService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBadRequestResponse({
    example: {
      message: 'badRequest',
      status: 400,
    },
  })
  @ApiCreatedResponse({
    example: {
      title: 'titl1',
      content: 'content 1',
      user: '69653107624ec7bf94c8f050',
      _id: '696539ee964839b199caa229',
      createdAt: '2026-01-12T18:14:06.215Z',
      updatedAt: '2026-01-12T18:14:06.215Z',
      __v: 0,
    },
  })
  create(@User() userId, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  @ApiResponse({
    example: {
      _id: '694993250dd81cdff7b3e283',
      title: 'title1',
      content: 'content1',
      createdAt: '2025-12-22T18:51:17.886Z',
      updatedAt: '2025-12-22T18:51:17.886Z',
      __v: 0,
    },
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiCreatedResponse({
    example: {
      _id: '694993250dd81cdff7b3e283',
      title: 'title1',
      content: 'content1',
      createdAt: '2025-12-22T18:51:17.886Z',
      updatedAt: '2025-12-22T18:51:17.886Z',
      __v: 0,
    },
  })
  @ApiBadRequestResponse({
    example:"invalid id"
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOkResponse({
  example: { message: 'updated post' },
})
@ApiBadRequestResponse({
  example: { message: 'bad request' },
})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
