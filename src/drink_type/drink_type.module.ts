import { Module } from "@nestjs/common";
import { DrinkTypeService } from "./drink_type.service";
import { DrinkTypeController } from "./drink_type.controller";
import { CaslModule } from "../casl/casl.module";

@Module({
  imports: [CaslModule],
  controllers: [DrinkTypeController],
  providers: [DrinkTypeService],
})
export class DrinkTypeModule {}
