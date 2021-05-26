/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import "reflect-metadata";

//
import { IRestApiController }        from '@api/api-controller';
import { AuthController }            from '@api/auth.controller';
import { IBaseController }           from "@api/base.controller";
import { BaseController }            from "@api/base.controller";
import { ServiceApiController }      from '@api/service-api.controller';
import { SessionApiController }      from "@api/session-api.controller";
import { StaticAssetsController }    from '@api/static-assets.controller';
import { AppSettings, IAppSettings } from '@app/app.settings';
import { TestMessageHandler }        from "@app/message-handlers/test-message.handler";
import { IRestaurantService }        from '@app/modules/restaurant/services/restaurant.service';
import { RestaurantService }         from '@app/modules/restaurant/services/restaurant.service';
import { ReviewController }          from '@app/modules/review/review.controller';
import { RealtimeServer }            from "@app/realtime/realtime-server";
import { IRealtimeServer }           from "@app/realtime/realtime-server";
import { IServerService }            from "@app/server.service";
import { ServerService }           from "@app/server.service";
import { LogService }              from "@app/services/log.service";
import { ILogService }             from "@app/services/log.service";
import { IgniterNode }             from '@app/types/igniter-node';
import { IWebApp }                 from "@app/webapp";
import { WebApp }                  from "@app/webapp";
import { Inf }                     from "@core/interfaces";
import { IMessageHandler }         from "@core/messaging/message-handler";
import { IMessageHub, MessageHub } from "@core/messaging/message-hub";
import { TCPNetworkConnector }     from "@core/networking/connectors/tcp/tcp-network-connector";
import { INetworkConnector }       from "@core/networking/network-connector";
import { IFoodMenuAdminDbBeta }    from "@modules/food-menu/fm-admin-db-beta";
import { FoodMenuAdminDbBeta }     from "@modules/food-menu/fm-admin-db-beta";
import { DbClient, IDbClient }     from '@zynDb/db-client';
import { AuthJwtApiController }    from "@modules/auth/auth-jwt.api-controller";
import { AuthLoginApiController }  from "@modules/auth/auth-login.api-controller";
import { BasketApiController }     from "@modules/basket/basket.api-controller";
import { IFixerEndpoint }          from '@modules/currency/api/fixer-endpoint';
import { FixerEndpoint }           from '@modules/currency/api/fixer-endpoint';
import { ICurrencyConverter }      from '@modules/currency/currency-converter';
import { CurrencyConverter }       from '@modules/currency/currency-converter';
import { CurrencyController }      from '@modules/currency/currency.controller';
import { FoodMenuAdminDb }         from "@modules/food-menu/fm-admin-db";
import { IFoodMenuAdminDb }          from "@modules/food-menu/fm-admin-db";
import { FoodMenuAdminController }   from "@modules/food-menu/fm-admin.controller";
import { IFmPriceConverter }         from '@modules/food-menu/fm-price-converter';
import { FmPriceConverter }          from '@modules/food-menu/fm-price-converter';
import { FoodMenuController }        from '@modules/food-menu/fm.controller';
import { FoodMenuDb, IFoodMenuDb }   from '@modules/food-menu/fm.db';
import { TranslateController }       from "@modules/google-translate/translate.controller";
import { CityService, ICityService } from "@modules/location/city.service";
import { LocationController }        from "@modules/location/location.controller";
import { OrderController }           from "@modules/order/order.controller";
import { IOrderService }             from "@modules/order/order.service";
import { OrderService }              from "@modules/order/order.service";
import { PaymentCheckout }           from "@modules/payment/checkout";
import { RestaurantController }      from '@modules/restaurant/restaurant.controller';
import { RestaurantDb }              from "@modules/restaurant/restaurant.db";
import { IRestaurantDb }            from "@modules/restaurant/restaurant.db";
import { ReviewDb }                 from '@modules/review/review-db';
import { IReviewModule }            from '@modules/review/review.module';
import { ReviewModule }             from '@modules/review/review.module';
import { IUserDb }                  from "@modules/user/user-db";
import { UserDb }                   from "@modules/user/user-db";
import { IConnectionHub }           from "@networking/connection-hub";
import { ConnectionHub }            from "@networking/connection-hub";
import { SocketIONetworkConnector } from "@networking/connectors/socket.io/socket.io-network-connector";
import { INetworkHub }              from "@networking/networking-hub";
import { NetworkingHub }            from "@networking/networking-hub";
import { DBPool }                   from "@zynDb/db-pool";
import { IDBPool }                  from "@zynDb/db-pool";
import { Container }                from "inversify";
import { IAdminServer }             from "./admin/admin-server";
import { AdminServer }              from "./admin/admin-server";
import { Bootstrap }                from "./main";
import { IDbMetaTool }              from "./tools/db-meta-tool";
import { DbMetaTool }               from "./tools/db-meta-tool";

let KernelModules = {
	ApiController: Symbol("IController")
};

let ModuleTag = {
	Handler:           "handler",
	Message:           "message",
	DataModule:        "data_module",
	ProtocolManager:   "protocol_manager",
	MessageHandler:    "messageHandler",
	Controller:        "controller",
	RestApiController: "rest_api_controller",
	NetworkConnector:  "network_connector"
};

let kernel = new Container();

kernel.bind<IgniterNode>(Inf.IZapNode).to(Bootstrap);
kernel.bind<IServerService>(Inf.IServerService).to(ServerService).inSingletonScope();
kernel.bind<IMessageHub>(Inf.IMessageHub).to(MessageHub).inSingletonScope();
kernel.bind<IConnectionHub>(Inf.IConnectionHub).to(ConnectionHub).inSingletonScope();
kernel.bind<INetworkHub>(Inf.INetworkHub).to(NetworkingHub).inSingletonScope();

kernel.bind<IWebApp>(Inf.IWebApp).to(WebApp).inSingletonScope();
kernel.bind<IBaseController>(Inf.IBaseController).to(BaseController).inRequestScope();

kernel.bind<IDbClient>(Inf.IDbClient).to(DbClient).inSingletonScope();

// DB Pool
kernel.bind<IDBPool>(Inf.IDBPool).to(DBPool).inRequestScope();


kernel.bind<ILogService>(Inf.ILogService).to(LogService).inRequestScope();

//
// Realtime Server
//
kernel.bind<IRealtimeServer>(Inf.IRealtimeServer).to(RealtimeServer).inSingletonScope();

//
//
// Tools
//
//
kernel.bind<IDbMetaTool>('IDbMetaTool').to(DbMetaTool).inRequestScope();

//
// Food Menu Db
//
kernel.bind<IFoodMenuDb>(Inf.IFoodMenuDb).to(FoodMenuDb).inRequestScope();
kernel.bind<IFoodMenuAdminDb>(Inf.IFoodMenuAdminDb).to(FoodMenuAdminDb).inRequestScope();
kernel.bind<IFoodMenuAdminDbBeta>(Inf.IFoodMenuAdminDbBeta).to(FoodMenuAdminDbBeta).inRequestScope();

kernel.bind<IRestaurantDb>(Inf.IRestaurantDb).to(RestaurantDb).inRequestScope();
kernel.bind<IUserDb>(Inf.IUserDb).to(UserDb).inRequestScope();

kernel.bind<IAppSettings>(Inf.IAppSettings).to(AppSettings).inSingletonScope();

kernel.bind<ICityService>(Inf.ICityService).to(CityService).inSingletonScope();
kernel.bind<IFixerEndpoint>(Inf.IFixerEndpoint).to(FixerEndpoint)
	  .inSingletonScope();
kernel.bind<ICurrencyConverter>(Inf.ICurrencyConverter).to(CurrencyConverter)
	  .inRequestScope();
kernel.bind<IFmPriceConverter>(Inf.IFmPriceConverter).to(FmPriceConverter)
	  .inRequestScope();

kernel.bind<IAdminServer>(Inf.IAdminServer).to(AdminServer).inRequestScope();

//
// Modules
//
kernel.bind<IRestaurantService>(Inf.IRestaurantService).to(RestaurantService).inRequestScope();
kernel.bind<IReviewModule>("IReviewModule").to(ReviewModule).inRequestScope();
kernel.bind<ReviewDb>(Inf.IReviewDb).to(ReviewDb).inRequestScope();
kernel.bind<IOrderService>(Inf.IOrderService).to(OrderService).inRequestScope();


////////////////////////////////////////////////////////////////////////////////
//
//    API Controllers
//
////////////////////////////////////////////////////////////////////////////////

kernel.bind<IRestApiController>(Inf.IController)
	  .to(AuthController).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.Controller);

////////////////////////////////////////////////////////////////////////////////
//
//    Rest API Controllers
//
////////////////////////////////////////////////////////////////////////////////

kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(AuthJwtApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(AuthLoginApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(LocationController).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

//
// Restaurant Controller
//
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(RestaurantController).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

//
// FoodMenu
//
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(FoodMenuController).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(FoodMenuAdminController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

//
// Order
//
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(OrderController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

//
// END:FoodMenu
//

// Translate
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(TranslateController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Basket Api Controller
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(BasketApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Session
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(SessionApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Review
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(ReviewController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Currency
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(CurrencyController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Review
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(ReviewController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Service
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(ServiceApiController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Service
kernel.bind<IRestApiController>("IRestApiController")
	  .to(PaymentCheckout).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

// Static Assets
kernel.bind<IRestApiController>(Inf.IRestApiController)
	  .to(StaticAssetsController).inRequestScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);

////////////////////////////////////////////////////////////////////////////////
//
//    Network Connectors
//
////////////////////////////////////////////////////////////////////////////////

// Socket.IO
kernel.bind<INetworkConnector>("INetworkConnector")
	  .to(SocketIONetworkConnector).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.ProtocolManager);

// TCP Socket
kernel.bind<INetworkConnector>("INetworkConnector")
	  .to(TCPNetworkConnector).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.ProtocolManager);

//
// Message Handlers
//
kernel.bind<IMessageHandler>("IMessageHandler")
	  .to(TestMessageHandler).inSingletonScope()
	  .whenTargetTagged(ModuleTag.Handler, ModuleTag.MessageHandler);

export { kernel, ModuleTag };
