import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { createUserDto } from 'src/dto files/cretaeUser.dto';
import { CreateRoleDto } from 'src/dto files/Role.dto';
import { LoginDto } from 'src/dto files/Login.dto';
import { AdminGuard } from 'src/auth/adminGuard';
import { CatagoryDto } from 'src/dto files/catagory.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}
     
    @Post("login")
    getlogin(@Body() logindata:LoginDto){
      return this.adminService.login(logindata.email,logindata.password)
    }

    @Post("createrole")
    @UseGuards(AdminGuard)
     createrole(@Body() roledata:CreateRoleDto){
      return this.adminService.createrole(roledata)
     }

    @Post("createUser")
    @UseGuards(AdminGuard)
    createUser(@Body() userData:createUserDto){
      return this.adminService.createUser(userData);
    }
    @Post("createcatagory")
    @UseGuards(AdminGuard)
    createcatagory(@Body()CatagoryData:CatagoryDto){
    return this.adminService.createCatagory(CatagoryData);
    }

    
}
