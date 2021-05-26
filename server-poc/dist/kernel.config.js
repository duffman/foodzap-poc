"use strict";
/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTag = exports.kernel = void 0;
require("reflect-metadata");
const auth_controller_1 = require("@api/auth.controller");
const base_controller_1 = require("@api/base.controller");
const service_api_controller_1 = require("@api/service-api.controller");
const session_api_controller_1 = require("@api/session-api.controller");
const static_assets_controller_1 = require("@api/static-assets.controller");
const app_settings_1 = require("@app/app.settings");
const test_message_handler_1 = require("@app/message-handlers/test-message.handler");
const restaurant_service_1 = require("@app/modules/restaurant/services/restaurant.service");
const review_controller_1 = require("@app/modules/review/review.controller");
const realtime_server_1 = require("@app/realtime/realtime-server");
const server_service_1 = require("@app/server.service");
const log_service_1 = require("@app/services/log.service");
const webapp_1 = require("@app/webapp");
const interfaces_1 = require("@core/interfaces");
const message_hub_1 = require("@core/messaging/message-hub");
const tcp_network_connector_1 = require("@core/networking/connectors/tcp/tcp-network-connector");
const fm_admin_db_beta_1 = require("@modules/food-menu/fm-admin-db-beta");
const db_client_1 = require("@zynDb/db-client");
const auth_jwt_api_controller_1 = require("@modules/auth/auth-jwt.api-controller");
const auth_login_api_controller_1 = require("@modules/auth/auth-login.api-controller");
const basket_api_controller_1 = require("@modules/basket/basket.api-controller");
const fixer_endpoint_1 = require("@modules/currency/api/fixer-endpoint");
const currency_converter_1 = require("@modules/currency/currency-converter");
const currency_controller_1 = require("@modules/currency/currency.controller");
const fm_admin_db_1 = require("@modules/food-menu/fm-admin-db");
const fm_admin_controller_1 = require("@modules/food-menu/fm-admin.controller");
const fm_price_converter_1 = require("@modules/food-menu/fm-price-converter");
const fm_controller_1 = require("@modules/food-menu/fm.controller");
const fm_db_1 = require("@modules/food-menu/fm.db");
const translate_controller_1 = require("@modules/google-translate/translate.controller");
const city_service_1 = require("@modules/location/city.service");
const location_controller_1 = require("@modules/location/location.controller");
const order_controller_1 = require("@modules/order/order.controller");
const order_service_1 = require("@modules/order/order.service");
const checkout_1 = require("@modules/payment/checkout");
const restaurant_controller_1 = require("@modules/restaurant/restaurant.controller");
const restaurant_db_1 = require("@modules/restaurant/restaurant.db");
const review_db_1 = require("@modules/review/review-db");
const review_module_1 = require("@modules/review/review.module");
const user_db_1 = require("@modules/user/user-db");
const connection_hub_1 = require("@networking/connection-hub");
const socket_io_network_connector_1 = require("@networking/connectors/socket.io/socket.io-network-connector");
const networking_hub_1 = require("@networking/networking-hub");
const db_pool_1 = require("@zynDb/db-pool");
const inversify_1 = require("inversify");
const admin_server_1 = require("./admin/admin-server");
const main_1 = require("./main");
const db_meta_tool_1 = require("./tools/db-meta-tool");
let KernelModules = {
    ApiController: Symbol("IController")
};
let ModuleTag = {
    Handler: "handler",
    Message: "message",
    DataModule: "data_module",
    ProtocolManager: "protocol_manager",
    MessageHandler: "messageHandler",
    Controller: "controller",
    RestApiController: "rest_api_controller",
    NetworkConnector: "network_connector"
};
exports.ModuleTag = ModuleTag;
let kernel = new inversify_1.Container();
exports.kernel = kernel;
kernel.bind(interfaces_1.Inf.IZapNode).to(main_1.Bootstrap);
kernel.bind(interfaces_1.Inf.IServerService).to(server_service_1.ServerService).inSingletonScope();
kernel.bind(interfaces_1.Inf.IMessageHub).to(message_hub_1.MessageHub).inSingletonScope();
kernel.bind(interfaces_1.Inf.IConnectionHub).to(connection_hub_1.ConnectionHub).inSingletonScope();
kernel.bind(interfaces_1.Inf.INetworkHub).to(networking_hub_1.NetworkingHub).inSingletonScope();
kernel.bind(interfaces_1.Inf.IWebApp).to(webapp_1.WebApp).inSingletonScope();
kernel.bind(interfaces_1.Inf.IBaseController).to(base_controller_1.BaseController).inRequestScope();
kernel.bind(interfaces_1.Inf.IDbClient).to(db_client_1.DbClient).inSingletonScope();
// DB Pool
kernel.bind(interfaces_1.Inf.IDBPool).to(db_pool_1.DBPool).inRequestScope();
kernel.bind(interfaces_1.Inf.ILogService).to(log_service_1.LogService).inRequestScope();
//
// Realtime Server
//
kernel.bind(interfaces_1.Inf.IRealtimeServer).to(realtime_server_1.RealtimeServer).inSingletonScope();
//
//
// Tools
//
//
kernel.bind('IDbMetaTool').to(db_meta_tool_1.DbMetaTool).inRequestScope();
//
// Food Menu Db
//
kernel.bind(interfaces_1.Inf.IFoodMenuDb).to(fm_db_1.FoodMenuDb).inRequestScope();
kernel.bind(interfaces_1.Inf.IFoodMenuAdminDb).to(fm_admin_db_1.FoodMenuAdminDb).inRequestScope();
kernel.bind(interfaces_1.Inf.IFoodMenuAdminDbBeta).to(fm_admin_db_beta_1.FoodMenuAdminDbBeta).inRequestScope();
kernel.bind(interfaces_1.Inf.IRestaurantDb).to(restaurant_db_1.RestaurantDb).inRequestScope();
kernel.bind(interfaces_1.Inf.IUserDb).to(user_db_1.UserDb).inRequestScope();
kernel.bind(interfaces_1.Inf.IAppSettings).to(app_settings_1.AppSettings).inSingletonScope();
kernel.bind(interfaces_1.Inf.ICityService).to(city_service_1.CityService).inSingletonScope();
kernel.bind(interfaces_1.Inf.IFixerEndpoint).to(fixer_endpoint_1.FixerEndpoint)
    .inSingletonScope();
kernel.bind(interfaces_1.Inf.ICurrencyConverter).to(currency_converter_1.CurrencyConverter)
    .inRequestScope();
kernel.bind(interfaces_1.Inf.IFmPriceConverter).to(fm_price_converter_1.FmPriceConverter)
    .inRequestScope();
kernel.bind(interfaces_1.Inf.IAdminServer).to(admin_server_1.AdminServer).inRequestScope();
//
// Modules
//
kernel.bind(interfaces_1.Inf.IRestaurantService).to(restaurant_service_1.RestaurantService).inRequestScope();
kernel.bind("IReviewModule").to(review_module_1.ReviewModule).inRequestScope();
kernel.bind(interfaces_1.Inf.IReviewDb).to(review_db_1.ReviewDb).inRequestScope();
kernel.bind(interfaces_1.Inf.IOrderService).to(order_service_1.OrderService).inRequestScope();
////////////////////////////////////////////////////////////////////////////////
//
//    API Controllers
//
////////////////////////////////////////////////////////////////////////////////
kernel.bind(interfaces_1.Inf.IController)
    .to(auth_controller_1.AuthController).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.Controller);
////////////////////////////////////////////////////////////////////////////////
//
//    Rest API Controllers
//
////////////////////////////////////////////////////////////////////////////////
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(auth_jwt_api_controller_1.AuthJwtApiController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(auth_login_api_controller_1.AuthLoginApiController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(location_controller_1.LocationController).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
//
// Restaurant Controller
//
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(restaurant_controller_1.RestaurantController).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
//
// FoodMenu
//
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(fm_controller_1.FoodMenuController).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(fm_admin_controller_1.FoodMenuAdminController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
//
// Order
//
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(order_controller_1.OrderController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
//
// END:FoodMenu
//
// Translate
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(translate_controller_1.TranslateController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Basket Api Controller
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(basket_api_controller_1.BasketApiController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Session
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(session_api_controller_1.SessionApiController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Review
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(review_controller_1.ReviewController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Currency
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(currency_controller_1.CurrencyController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Review
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(review_controller_1.ReviewController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Service
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(service_api_controller_1.ServiceApiController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Service
kernel.bind("IRestApiController")
    .to(checkout_1.PaymentCheckout).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
// Static Assets
kernel.bind(interfaces_1.Inf.IRestApiController)
    .to(static_assets_controller_1.StaticAssetsController).inRequestScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.RestApiController);
////////////////////////////////////////////////////////////////////////////////
//
//    Network Connectors
//
////////////////////////////////////////////////////////////////////////////////
// Socket.IO
kernel.bind("INetworkConnector")
    .to(socket_io_network_connector_1.SocketIONetworkConnector).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.ProtocolManager);
// TCP Socket
kernel.bind("INetworkConnector")
    .to(tcp_network_connector_1.TCPNetworkConnector).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.ProtocolManager);
//
// Message Handlers
//
kernel.bind("IMessageHandler")
    .to(test_message_handler_1.TestMessageHandler).inSingletonScope()
    .whenTargetTagged(ModuleTag.Handler, ModuleTag.MessageHandler);
