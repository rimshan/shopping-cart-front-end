import async from "../components/Async";

import {
  Book as BookIcon,
  BookOpen as BookOpenIcon,
  CheckSquare as CheckSquareIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MapPin as MapPinIcon,
  Monitor as MonitorIcon,
  PieChart as PieChartIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  DollarSign as DollarSignIcon,
  Briefcase as BriefcaseIcon,
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import AuthLayout from "../layouts/Auth";
import LandignLayout from "../layouts/Landing";

//Items
import Items from "../pages/Items/Items";
import ItemsEdit from "../pages/Items/ItemsEdit";
import NewItem from "../pages/Items/NewItem";


// Customers
const Customers = async(() => import("../pages/customers/Customer"));
const ViewCustomers = async(() => import("../pages/customers/CustomerView"));



// orders
const Orders = async(() => import("../pages/orders/Orders"));
const OrderEdit = async(() => import("../pages/orders/OrderEdit"));


// settings
const Settings = async(() => import("../pages/settings/Settings"));

// Dashboards

const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));

// Routes
const landingRoutes = {
  path: "/",
  name: "Auth",
  component: Landing,
  layouts: LandignLayout,
  children: null
};

const customersRoutes = {
  path: "/customers",
  name: "Customers",
  icon: UsersIcon,
  // header: "Main",
  component: Customers,
  // badgeColor: "primary",
  // badgeText: "New",
  children: null
};



const customerViewRoutes = {
  path: "/customer-view/:id",
  name: "Customer View",
  component: ViewCustomers,
  children: null
};


const ordersRoutes = {
  path: "/orders",
  name: "Orders",
  icon: CalendarIcon,
  component: Orders,
  // badgeColor: "primary",
  // badgeText: "New",
  children: null
};

const OrdersEditRoute = {
  path: "/orders/edit/:id",
  name: "Transfer View",
  icon: MonitorIcon,
  component: OrderEdit,
  children: null,
};




const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: SettingsIcon,
  component: Settings,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  icon: SlidersIcon,
  containsHome: true,
  component: Ecommerce,
};



const itemsRoute = {
  path: "/items",
  name: "Items",
  icon: BriefcaseIcon,
  component: Items,
};


const newItemsRoute = {
  path: "/items/new",
  name: "New Items",
  icon: BriefcaseIcon,
  component: NewItem,
  children: null,
};

const itemsEditRoute = {
  path: "/items/edit/:id",
  name: "Transfer View",
  icon: MonitorIcon,
  component: ItemsEdit,
  children: null,
};




const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "12/24",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};


// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  customerViewRoutes,
  customersRoutes,
  ordersRoutes,
  settingsRoutes,
  itemsRoute,
  itemsEditRoute,
  newItemsRoute,
  OrdersEditRoute,

];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  dashboardRoutes,
  itemsRoute,
  customersRoutes,
  ordersRoutes,
  settingsRoutes,
];
