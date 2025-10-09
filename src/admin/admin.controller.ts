import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { createUserDto } from 'src/dto files/cretaeUser.dto';
import { CreateRoleDto } from 'src/dto files/Role.dto';
import { LoginDto } from 'src/dto files/Login.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}
     
    @Post("login")
    getlogin(@Body() logindata:LoginDto){
      return this.adminService.login(logindata.email,logindata.password)
    }

    @Post("createrole")
     createrole(@Body() roledata:CreateRoleDto){
      return this.adminService.createrole(roledata)
     }

    @Post("createUser")
    createUser(@Body() userData:createUserDto){
      return this.adminService.createUser(userData);
    }
    
}
