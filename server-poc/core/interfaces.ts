import { IRealtimeServer } from "@app/realtime/realtime-server";
import { IConnectionHub }  from "@networking/connection-hub";
import { INetworkHub }     from "@networking/networking-hub";
import { IDBPool }         from "@zynDb/db-pool";

/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * 2020-05-17
 */

export const Inf = {
	IWizumService:      "IWizumService",
	IConnectionHub:     "IConnectionHub",
	IMessageHub:        "IMessageHub",
	INetworkHub:        "INetworkHub",
	IAppSettings:       "IAppSettings",
	IZapNode:           "IZapNode",
	IServerService:     "IServerService",
	IWebApp:            "IWebApp",
	IBaseController:    "IBaseController",

	IDbClient:          "IDbClient",
	IMysqlClient:       "IMySqlClient",
	IDBPool:            "IDBPool",

	IDbLogger:          "IDbLogger",
	IController:        "IController",
	IRestApiController: "IRestApiController",
	IServiceRegistry:   "IServiceRegistry",
	ILogService:        "ILogService",
	ICityService:       "ICityService",
	ICurrencyConverter: "ICurrencyConverter",
	IAdminServer:       "IAdminServer",

	IReviewDb:          "IReviewDb",
	IUserDb:            "IUserDb",

	// Order
	IOrderService: "IOrderService",
	IBasketDb:     "IBasketDb",

	// Realtime Server
	IRealtimeServer: "IRealtimeServer",

	// Modules
	ISmsGatewayService: "SmsGatewayService",

	// Restaurant
	IRestaurantDb:        "IRestaurantDb",
	IRestaurantAdminDb:   "IRestaurantAdminDb",
	IFmPriceConverter:    "IFmPriceConverter",
	IRestaurantService:   "IRestaurantService",
	IFoodMenuDb:          "IFoodMenuDb",
	IFixerEndpoint:       "IFixerEndpoint",
	IFoodMenuAdminDb:     "IFoodMenuAdminDb",
	IFoodMenuAdminDbBeta: "IFoodMenuAdminDbBeta"

}

