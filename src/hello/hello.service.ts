import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateHelloDto } from './dto/create-hello.dto';
import { UpdateHelloDto } from './dto/update-hello.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hello } from './entities/hello.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelloService {

  constructor(@InjectRepository(Hello) private helloRepository: Repository<Hello>) { }

  async create(createHelloDto: CreateHelloDto): Promise<Hello> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createHelloDto.password, saltOrRounds);
    const saveData = {
      username: createHelloDto.username,
      password: hash,
    }
    const newHello = this.helloRepository.create(saveData);
    return this.helloRepository.save(newHello);
  }

  async login(createHelloDto: CreateHelloDto): Promise<string> {
    const {username, password} = createHelloDto;
    const user = await this.helloRepository.findOne({where: {username}});
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return 'Login successful';

  }

  findAll() {
    return `This action returns all hello`;
  }

  findOne(username: string) {
    return this.helloRepository.findOne({where: {username}}); 
  }

  update(id: number, updateHelloDto: UpdateHelloDto) {
    return `This action updates a #${id} hello`;
  }

  remove(id: number) {
    return `This action removes a #${id} hello`;
  }
}
