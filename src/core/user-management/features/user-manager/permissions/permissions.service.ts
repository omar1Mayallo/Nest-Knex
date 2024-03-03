import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import { TABLES } from './../../../../../shared/constants/tables';
import {
  EntityProps,
  IPermission,
  ModuleProps,
} from './types/permissions.types';
import { CustomHelpersService } from 'src/shared/modules/custom-helpers/custom-helpers.service';
import { UserActionsModel } from 'src/shared/types/entities/user-management.model';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
    private readonly helpers: CustomHelpersService,
  ) {}

  async getLoggedUserPermissions(email: string) {
    const userPermissions = await this.getPermissionsByEmail(email);
    if (this.helpers.isEmpty(userPermissions)) {
      throw new UnauthorizedException("User don't have permissions");
    }
    return this.buildPermissionsTree(userPermissions);
  }

  async getLoggedUserActions(email: string) {
    const userActions = await this.knex<UserActionsModel>(
      TABLES.USER_ENTITY_ACTION,
    )
      .where({ email })
      .select('action_key')
      .pluck('action_key');

    return userActions;
  }

  async verifyPermissions(
    email: string,
    action: string | string[],
  ): Promise<boolean> {
    // 1) Get Current User Permissions (or Actions)
    const userActions = await this.getLoggedUserActions(email);

    // 2) verify action(s) in User Permissions
    if (Array.isArray(action)) {
      // 2-1) action as [act-1, act-2, act-3] .. check at least one in userActions
      return userActions.some((userAction: string) =>
        action.includes(userAction),
      );
    }
    // 2-2) action as act-1 .. check it exists in userActions
    else return userActions.includes(action);
  }

  // ____________________ PRIVATE ____________________ //
  private async getPermissionsByEmail(email: string): Promise<IPermission[]> {
    const { MODULE, ENTITY, ENTITY_ACTION, USER_ENTITY_ACTION } = TABLES;
    const permissions: IPermission[] = await this.knex
      .select({
        module_key: `${MODULE}.module_key`,
        module_ar_name: `${MODULE}.ar_name`,
        module_en_name: `${MODULE}.en_name`,
        module_parent_key: `${MODULE}.parent_key`,
        module_source: `${MODULE}.source`,
        module_icon: `${MODULE}.icon`,
        entity_key: `${ENTITY}.entity_key`,
        entity_module_parent_key: `${ENTITY}.module_key`,
        entity_ar_name: `${ENTITY}.ar_name`,
        entity_en_name: `${ENTITY}.en_name`,
        entity_url: `${ENTITY}.entity_url`,
        entity_icon: `${ENTITY}.icon`,
        order: `${ENTITY}.order`,
        action_key: `${ENTITY_ACTION}.action_key`,
        action_ar_name: `${ENTITY_ACTION}.ar_name`,
        action_en_name: `${ENTITY_ACTION}.en_name`,
      })
      .from(USER_ENTITY_ACTION)
      .join(
        ENTITY_ACTION,
        `${USER_ENTITY_ACTION}.action_key`,
        `${TABLES.ENTITY_ACTION}.action_key`,
      )
      .join(
        ENTITY,
        `${TABLES.ENTITY_ACTION}.entity_key`,
        `${ENTITY}.entity_key`,
      )
      .join(MODULE, `${ENTITY}.module_key`, `${MODULE}.module_key`)
      .where({
        [`${USER_ENTITY_ACTION}.email`]: email,
      })
      .orderBy(`${ENTITY}.order`, 'asc');
    return permissions;
  }

  private buildPermissionsTree(permissions: IPermission[]) {
    // 1) Prepare Modules, Entities and Actions Properties
    const {
      groupedActions,
      populateEntityProperties,
      populateModuleProperties,
    } = this.prepareProperties(permissions);

    // 2) Split Modules and Entities
    // ______________MAIN_MODULE__________________ //
    const mainModule = permissions.find(
      (item) => item.module_parent_key === null,
    );

    //_____________ ([1st]_LEVEL)_ENTITIES_&_MODULES _____________//
    const firstLevelEntities = this.aggregateEntitiesFromModule(undefined, {
      permissions: permissions,
      mainModule,
    });
    const {
      subModules: firstLevelSubModules,
      aggregatedSubModules: firstLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      undefined,
      mainModule,
    );

    //_____________ ([2nd]_LEVEL)_ENTITIES_&_MODULES _____________//
    const secondLevelEntities =
      this.aggregateEntitiesFromModule(firstLevelSubModules);

    const {
      subModules: secondLevelSubModules,
      aggregatedSubModules: secondLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      firstLevelAggregatedSubModules,
    );

    //_____________ ([3rd]_LEVEL)_ENTITIES_&_MODULES _____________//
    const thirdLevelEntities = this.aggregateEntitiesFromModule(
      secondLevelSubModules,
    );
    const {
      subModules: thirdLevelSubModules,
      aggregatedSubModules: thirdLevelAggregatedSubModules,
    } = this.aggregateSubModulesFromParentModule(
      permissions,
      secondLevelAggregatedSubModules,
    );

    //_____________ ([4th]_LEVEL)_ENTITIES_&_MODULES _____________//
    const forthLevelEntities =
      this.aggregateEntitiesFromModule(thirdLevelSubModules);

    // 2) Constructing Permission Tree Structure
    const permissionsTree = {
      ...populateModuleProperties(mainModule),
      entities: [
        ...firstLevelEntities.map((entity) => {
          return {
            ...populateEntityProperties(entity),
            actions: groupedActions[entity.entity_key] || [],
          };
        }),
        ...firstLevelAggregatedSubModules.map((subModule) => {
          return {
            ...populateModuleProperties(subModule),
            order: secondLevelEntities.filter(
              (entity) =>
                entity.entity_module_parent_key === subModule.module_key,
            )[0].order,
            entities: [
              ...secondLevelEntities
                .filter(
                  (entity) =>
                    entity.entity_module_parent_key === subModule.module_key,
                )
                .map((entity) => {
                  return {
                    ...populateEntityProperties(entity),
                    actions: groupedActions[entity.entity_key] || [],
                  };
                }),
              ...secondLevelAggregatedSubModules
                .filter(
                  (item) => item.module_parent_key === subModule.module_key,
                )
                .map((subModule) => {
                  return {
                    ...populateModuleProperties(subModule),
                    order: thirdLevelEntities.filter(
                      (entity) =>
                        entity.entity_module_parent_key ===
                        subModule.module_key,
                    )[0].order,
                    entities: [
                      ...thirdLevelEntities
                        .filter(
                          (entity) =>
                            entity.entity_module_parent_key ===
                            subModule.module_key,
                        )
                        .map((entity) => {
                          return {
                            ...populateEntityProperties(entity),
                            actions: groupedActions[entity.entity_key] || [],
                          };
                        }),
                      ...thirdLevelAggregatedSubModules
                        .filter(
                          (item) =>
                            item.module_parent_key === subModule.module_key,
                        )
                        .map((subModule) => {
                          return {
                            ...populateModuleProperties(subModule),
                            order: forthLevelEntities.filter(
                              (entity) =>
                                entity.entity_module_parent_key ===
                                subModule.module_key,
                            )[0].order,
                            entities: [
                              ...forthLevelEntities
                                .filter(
                                  (entity) =>
                                    entity.entity_module_parent_key ===
                                    subModule.module_key,
                                )
                                .map((entity) => {
                                  return {
                                    ...populateEntityProperties(entity),
                                    actions:
                                      groupedActions[entity.entity_key] || [],
                                  };
                                }),
                            ],
                          };
                        }),
                    ],
                  };
                }),
            ],
          };
        }),
      ].sort((a, b) => a.order - b.order),
    };

    return permissionsTree;
  }

  private prepareProperties(permissions?: IPermission[]) {
    //_MODULE
    const populateModuleProperties = (
      module: Pick<IPermission, ModuleProps>,
    ) => ({
      module_key: module.module_key,
      module_ar_name: module.module_ar_name,
      module_en_name: module.module_en_name,
      module_parent_key: module.module_parent_key,
      module_source: module.module_source,
      module_icon: module.module_icon,
    });

    //_ENTITY
    const populateEntityProperties = (
      entity: Pick<IPermission, EntityProps>,
    ) => ({
      entity_key: entity.entity_key,
      entity_module_parent_key: entity.entity_module_parent_key,
      entity_ar_name: entity.entity_ar_name,
      entity_en_name: entity.entity_en_name,
      entity_url: entity.entity_url,
      entity_icon: entity.entity_icon,
      order: entity.order,
    });

    //_ACTION
    const groupedActions = {};
    permissions?.forEach((permission) => {
      const { entity_key, action_key, action_ar_name, action_en_name } =
        permission;
      if (!groupedActions[entity_key]) {
        groupedActions[entity_key] = [];
      }
      if (action_key) {
        groupedActions[entity_key].push({
          action_key,
          action_ar_name,
          action_en_name,
        });
      }
    });

    return {
      groupedActions,
      populateModuleProperties,
      populateEntityProperties,
    };
  }

  private aggregateEntitiesFromModule(
    nestedModules?: IPermission[],
    forMainModule?: { permissions: IPermission[]; mainModule: IPermission },
  ) {
    // Modules Entities (for the main module and nested modules)
    let entities: IPermission[] = [];
    if (forMainModule) {
      entities = forMainModule.permissions.filter(
        (item) =>
          item.entity_module_parent_key === forMainModule.mainModule.module_key,
      );
    } else {
      entities = nestedModules.filter(
        (item) => item.entity_module_parent_key === item.module_key,
      );
    }

    // Uniqueness the entities keys
    const uniqueEntitiesKeys = [
      ...new Set(entities.map((item) => item.entity_key)),
    ];

    // Aggregate Entities
    const aggregatedEntities = uniqueEntitiesKeys.map((entityKey) => {
      const entity = entities.find((item) => item.entity_key === entityKey);
      return this.prepareProperties().populateEntityProperties(entity);
    });

    return aggregatedEntities;
  }

  private aggregateSubModulesFromParentModule(
    permissions: IPermission[],
    aggregatedParentModules?: Pick<IPermission, ModuleProps>[],
    mainModule?: IPermission,
  ) {
    let subModules: IPermission[] = [];
    if (mainModule) {
      subModules = permissions.filter(
        (item) => item.module_parent_key === mainModule.module_key,
      );
    } else {
      subModules = permissions.filter((item) =>
        aggregatedParentModules.some(
          (aggregatedItem) =>
            aggregatedItem.module_key === item.module_parent_key,
        ),
      );
    }

    const uniqueSubModuleKeys = [
      ...new Set(subModules.map((item) => item.module_key)),
    ];
    const aggregatedSubModules = uniqueSubModuleKeys.map((moduleKey) => {
      const module = subModules.find((item) => item.module_key === moduleKey);
      return this.prepareProperties().populateModuleProperties(module);
    });

    return { subModules, aggregatedSubModules };
  }
}
