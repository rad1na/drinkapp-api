import { User } from ".prisma/client";
import { AbilityBuilder, AbilityClass } from "@casl/ability";
import { PrismaAbility, Subjects } from "@casl/prisma";
import { Injectable } from "@nestjs/common";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
      User: User;
    }>,
  ]
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);
    can(Action.Read, "User", { id: user.id });
    can(Action.Update, "User", { id: user.id });
    can(Action.Delete, "User", { id: user.id });
    if (user.role === 3) {
      can(Action.Manage, "all");
    }
    return build();
  }
}
