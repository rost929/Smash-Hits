import { Module } from '@nestjs/common';
import { RegistrationController } from './controllers/Registration.controller';
import { RegistrationService } from './services/Registration.service';
import { UserModule } from '../users/User.module';

@Module({
  imports: [UserModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
