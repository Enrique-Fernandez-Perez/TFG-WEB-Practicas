import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';
// import { LoginDto } from './dto/login.dto';
// import { RegisterUserDto } from './dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
// import { CreateUserDto } from './dto/create-user.dto';



@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService,
    ){}

  async create(createUserDto: CreateUserDto) : Promise<User>{
    
    try{
      const {password, ...userData} = createUserDto;

      // const newUser = new this.userModel(createUserDto);
      const newUser = new this.userModel({
        password : bcryptjs.hashSync(password, 10),
        ...userData
      });

      await newUser.save();

      const {password:_ , ...user} = newUser.toJSON();
      
      return user;
    }
    catch(error){
      if(error.code === 11000){
        throw new BadRequestException(`${createUserDto.email} already exist!`);
      }
      
      throw new InternalServerErrorException('Something terrible happen!!');
    }


    // const newUser = new this.userModel(createUserDto);
    // return newUser.save();
    
    // encriptar password
    // guardar al usuario
    // generar el jwt

    // return 'This action adds a new auth';
  }

  async register(registerDto: RegisterUserDto) : Promise<LoginResponse>{
    
    const user = await this.create(registerDto);

    // const log = {email:registerDto.email, password:registerDto.password};

    // return this.login(log);

    return {
      user : user,
      token : this.getJwtToken({ id: user._id})
    }
  }

  async login(loginDto : LoginDto) : Promise<LoginResponse> {

    const { email, password} = loginDto;

    const user = await this.userModel.findOne({email});

    if(!user){
      throw new UnauthorizedException('Not valid credential - email');
    }
    
    if( !bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid credential - password');
    }

    const {password:_ , ...rest} = user.toJSON();

    return {
      user: {...rest},
      token: this.getJwtToken({id : user.id}),
    };
  }

  findAll() : Promise<User[]>{
    return this.userModel.find();
  }

  async findUserById( id : string){
    const user = await this.userModel.findById(id);
    const {password:_ , ...rest} = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken( payload : JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
