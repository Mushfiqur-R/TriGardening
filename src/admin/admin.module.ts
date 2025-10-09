import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[  JwtModule.register({
      secret: process.env.SECRET_KEY || 'secretkey',
      signOptions: { expiresIn: '1d' },
    }),],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
