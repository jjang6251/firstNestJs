import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { HelloService } from './hello.service';
import { CreateHelloDto } from './dto/create-hello.dto';
import { UpdateHelloDto } from './dto/update-hello.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @UseGuards(AuthGuard)
  @Get('auth')
  hello(@Body() createHelloDto: CreateHelloDto, @Request() req) {
    const message = {
      ...createHelloDto,
      ...req.user,
    };
    return message;
  }

  @Post()
  create(@Body() createHelloDto: CreateHelloDto) {
    return this.helloService.create(createHelloDto);
  }

  @Post('login')
  login(@Body() createHelloDto:CreateHelloDto) {
    return this.helloService.login(createHelloDto);
  }

  @Get()
  findAll() {
    return this.helloService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.helloService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelloDto: UpdateHelloDto) {
    return this.helloService.update(+id, updateHelloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helloService.remove(+id);
  }
}
