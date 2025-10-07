import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { createUserDto } from 'src/dto files/cretaeUser.dto';
import { CreateRoleDto } from 'src/dto files/Role.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}

    @Post("createrole")
     createrole(@Body() roledata:CreateRoleDto){
      return this.adminService.createrole(roledata)
     }

    // @Post("createUser")
    // createUser(@Body() createUser:createUserDto){
    //   return this.adminService.createUser(createUser);
    // }
    
}
