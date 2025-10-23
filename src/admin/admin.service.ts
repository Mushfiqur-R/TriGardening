import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Catagory, Prisma, PrismaClient, Role, User } from '@prisma/client';
import { createUserDto } from 'src/dto files/cretaeUser.dto';
import { CreateRoleDto } from 'src/dto files/Role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { connect } from 'http2';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CatagoryDto } from 'src/dto files/catagory.dto';
@Injectable()
export class AdminService {
     constructor(private prisma:PrismaService,
                private jwtService:JwtService
     ){}
    async createrole(roledata:CreateRoleDto):Promise<Role>{
        return this.prisma.role.create({
         data:{
          name:roledata.name,
          description:roledata.description
         }

        })
    }

    async createUser(userData:createUserDto):Promise<{status:string,message:string,data:User}>{
     const roleName = userData.usertype.toLocaleLowerCase();
     const role = await this.prisma.role.findUnique({
        where:{name :roleName},
     })
      if(!role){
        throw new Error(`Role ${roleName} is not found`);
      }
      const saltRounds =10;
      const hashpassword= await bcrypt.hash(userData.password,saltRounds);
        const newUser=await this.prisma.user.create( { 
        data: {
        name: userData.name,
        phoneno: userData.phoneno,
        thana: userData.thana,
        district: userData.district,
        password: hashpassword,
        usertype: roleName,
        address: userData.address || null,
        secondpno: userData.secondaryNumber || null,
        email: userData.email ,
        role: { connect: { id: role.id } }, // ✅ connect role
      },})
      return {status:"success",
             message:"User creation successful",
             data:newUser
      };
    }
catch (error: unknown) {
      console.log('Error creating user:', error); // ✅ debug console

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes('email')) {
          return {
            status: 'error',
            message: 'Email already used!',
          };
        }
      }

      return {
        status: 'error',
        message: 'Something went wrong!',
        error,
      };
    }

    async login(email:string,password:string){
      const user= await this.prisma.user.findUnique({
        where :{
          email
        },
        include:{role:true}
      });
      if(!user){
        throw new UnauthorizedException('Invalid credentials.')
      }

      const isMatch= await bcrypt.compare(password,user.password);
      if(!isMatch){
        throw new UnauthorizedException("Invalid Credentials");
      }
      const payload ={
        sub:user.id,
        email:user.email,
        role:user.role.name
      }
      const token = await this.jwtService.signAsync(payload,{
        secret:process.env.SECRET_KEY||'secretkey',
        expiresIn:'1d',
      })

      return {
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
    }

   async createCatagory(CatagoryData:CatagoryDto):Promise<Catagory>{
        return this.prisma.catagory.create(
         {
          data:{
            name:CatagoryData.name,
            description:CatagoryData.description
          }
         }
        )
    }
  
}

