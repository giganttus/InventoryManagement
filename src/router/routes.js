import { lazy } from "react";

// Pages
const Login = lazy(() => import("pages/login"));
const Start = lazy(() => import("pages/start"));
const Settings = lazy(() => import("pages/settings"));
const AdminPanel = lazy(() => import("pages/adminPanel"));
const InventoryManagement = lazy(() => import("pages/inventoryManagement"));
const UserManagement = lazy(() => import("pages/userManagement"));
const ItemsManagement = lazy(() => import("pages/itemsManagement"));


//Layouts
const PublicLayout = lazy(() => import("layouts/PublicLayout"));
const PrivateLayout = lazy(() => import("layouts/PrivateLayout"));

export const publicRoutes = [
	{
		key: "login",
		path: "",
		index: true,
		page: Login,
		layout: PublicLayout,
	},
];

export const privateRoutes = [
	{
		key: "start",
		path: "start",
		page: Start,
		layout: PrivateLayout,
	},
	{
		key: "settings",
		path: "settings",
		page: Settings,
		layout: PrivateLayout,
	},
	{
		key: "adminpanel",
		path: "adminpanel",
		page: AdminPanel,
		layout: PrivateLayout,
	},
	{
		key: "inventorymanagement",
		path: "inventorymanagement",
		page: InventoryManagement,
		layout: PrivateLayout,
	},
	{
		key: "usermanagement",
		path: "usermanagement",
		page: UserManagement,
		layout: PrivateLayout,
	},
	{
		key: "itemmanagement",
		path: "itemmanagement",
		page: ItemsManagement,
		layout: PrivateLayout,
	},
];
