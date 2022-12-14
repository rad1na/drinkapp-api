import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.modules";
import { PrismaModule } from "./prisma/prisma.module";
import { SmsModule } from "./sms/sms.module";
import { UserModule } from "./user/user.module";
import { CaslModule } from "./casl/casl.module";
import { DrinkModule } from './drink/drink.module';
import { DrinkTypeModule } from './drink_type/drink_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    SmsModule,
    CaslModule,
    DrinkModule,
    DrinkTypeModule,
  ],
})
export class AppModule {}
