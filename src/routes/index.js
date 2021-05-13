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
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";
import AuthLayout from "../layouts/Auth";
import LandignLayout from "../layouts/Landing";

// Misc
import Blank from "../pages/misc/Blank";

// UI Elements
import Alerts from "../pages/ui-elements/Alerts";
import Buttons from "../pages/ui-elements/Buttons";
import Cards from "../pages/ui-elements/Cards";
import General from "../pages/ui-elements/General";
import Grid from "../pages/ui-elements/Grid";
import Modals from "../pages/ui-elements/Modals";
import Notifications from "../pages/ui-elements/Notifications";
import Tabs from "../pages/ui-elements/Tabs";
import Typography from "../pages/ui-elements/Typography";

// Pages
import Profile from "../pages/pages/Profile";
// import Settings from "../pages/pages/Settings";
import Clients from "../pages/pages/Clients";
import Projects from "../pages/pages/Projects";
import Invoice from "../pages/pages/Invoice";
import Pricing from "../pages/pages/Pricing";
import Tasks from "../pages/pages/Tasks";

// Documentation
import Introduction from "../pages/docs/Introduction";
import Installation from "../pages/docs/Installation";
import Plugins from "../pages/docs/Plugins";
import Changelog from "../pages/docs/Changelog";

//Items

import Items from "../pages/Items/Items";
import ItemsEdit from "../pages/Items/ItemsEdit";
import NewItem from "../pages/Items/NewItem";
import Transfers from "../pages/Items/Transfers";
import InventoryAdjustments from "../pages/Items/InventoryAdjustments";
import NewInventoryAdjustments from "../pages/Items/NewInventoryAdjustments";
import InventoryAdjustmentView from "../pages/Items/InventoryAdjustmentView";
import Inventory from "../pages/Items/Inventory";
import NewTransfer from "../pages/Items/NewTransfer";
import TransferView from "../pages/Items/TransferView";

//import OrderEdit from "../pages/Orders/OrderEdit";

// Customers
const Customers = async(() => import("../pages/customers/Customer"));
const AddCustomers = async(() => import("../pages/customers/AddCustomer"));
const ViewCustomers = async(() => import("../pages/customers/CustomerView"));

// exams
const Exams = async(() => import("../pages/exams/Exams"));
// const AddCustomers = async(() => import("../pages/customers/AddCustomer"));
// const ViewCustomers = async(() => import("../pages/customers/CustomerView"));

// orders
const Orders = async(() => import("../pages/orders/Orders"));
const OrderEdit = async(() => import("../pages/orders/OrderEdit"));


// payments
const Payments = async(() => import("../pages/payments/Payments"));



// settings
const Settings = async(() => import("../pages/settings/Settings"));

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
const Crypto = async(() => import("../pages/dashboards/Crypto"));
const Social = async(() => import("../pages/dashboards/Social"));

// Forms
const Layouts = async(() => import("../pages/forms/Layouts"));
const BasicElements = async(() => import("../pages/forms/BasicElements"));
const AdvancedElements = async(() => import("../pages/forms/AdvancedElements"));
const InputGroups = async(() => import("../pages/forms/InputGroups"));
const Editors = async(() => import("../pages/forms/Editors"));
const Validation = async(() => import("../pages/forms/Validation"));
const Wizard = async(() => import("../pages/forms/Wizard"));

// Tables
const BootstrapTables = async(() => import("../pages/tables/Bootstrap"));
const AdvancedTables = async(() => import("../pages/tables/Advanced"));

// Charts
const Chartjs = async(() => import("../pages/charts/Chartjs"));
const ApexCharts = async(() => import("../pages/charts/ApexCharts"));

// Icons
const FontAwesome = async(() => import("../pages/icons/FontAwesome"));
const Feather = async(() => import("../pages/icons/Feather"));

// Calendar
const Calendar = async(() => import("../pages/calendar/Calendar"));

// Maps
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));




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

const addCustomerRoutes = {
  path: "/add-customer",
  name: "Add Customer",
  component: AddCustomers,
  children: null
};

const customerViewRoutes = {
  path: "/customer-view/:id",
  name: "Customer View",
  component: ViewCustomers,
  children: null
};

const examsRoutes = {
  path: "/exams",
  name: "Exams",
  icon: BookIcon,
  component: Exams,
  // badgeColor: "primary",
  // badgeText: "New",
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

const paymentsRoutes = {
  path: "/payments",
  name: "Payments",
  icon: DollarSignIcon,
  component: Payments,
  // badgeColor: "primary",
  // badgeText: "New",
  children: null
};



const settingsRoutes = {
  path: "/settings",
  name: "Settings",
  icon: SettingsIcon,
  component: Settings,
  // badgeColor: "primary",
  // badgeText: "New",
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  icon: SlidersIcon,
  containsHome: true,
  component: Ecommerce,
  // children: [
  //   {
  //     path: "/dashboard/default",
  //     name: "Default",
  //     component: Default
  //   },
  //   {
  //     path: "/dashboard/analytics",
  //     name: "Analytics",
  //     component: Analytics
  //   },
  //   {
  //     path: "/dashboard/e-commerce",
  //     name: "E-commerce",
  //     component: Ecommerce
  //   },
  //   {
  //     path: "/dashboard/social",
  //     name: "Social",
  //     component: Social
  //   },
  //   {
  //     path: "/dashboard/crypto",
  //     name: "Crypto",
  //     component: Crypto,
  //     badgeColor: "primary",
  //     badgeText: "New"
  //   }
  // ]
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/pages/clients",
      name: "Clients",
      component: Clients
    },
    {
      path: "/pages/projects",
      name: "Projects",
      component: Projects,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      component: Invoice
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/pages/tasks",
      name: "Tasks",
      component: Tasks,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const itemsRoute = {
  path: "/items",
  name: "Items",
  icon: BriefcaseIcon,
  component: Items,
  // children: [
  //   {
  //     path: "/items/all",
  //     name: "All Items",
  //     component: Items,
  //   },
  //   {
  //     path: "/items/inventory",
  //     name: "Inventory",
  //     component: Inventory,
  //   },
  //   // {
  //   //   path: "/items/transfers",
  //   //   name: "Transfers",
  //   //   component: Transfers,
  //   // },
  //   {
  //     path: "/items/inventory-adjustments",
  //     name: "Inventory Adjustments",
  //     component: InventoryAdjustments,
  //   },
  // ],
};

const inventoryAdjustmentViewRoute = {
  path: "/items/inventory-adjustment/:id",
  name: "Transfer View",
  icon: MonitorIcon,
  component: InventoryAdjustmentView,
  children: null,
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



const newInventoryAdjustmentsRoute = {
  path: "/items/inventory-adjustments/new",
  name: "New Inventory Adjustments",
  icon: BriefcaseIcon,
  component: NewInventoryAdjustments,
  children: null,
};

const newTransferRoute = {
  path: "/items/transfers/new",
  name: "New Transfer",
  icon: BriefcaseIcon,
  component: NewTransfer,
  children: null,
};

const transferViewRoute = {
  path: "/items/transfer/:id",
  name: "Transfer View",
  icon: MonitorIcon,
  component: TransferView,
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

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const documentationRoutes = {
  path: "/docs",
  name: "Documentation",
  icon: BookOpenIcon,
  children: [
    {
      path: "/docs/introduction",
      name: "Introduction",
      component: Introduction
    },
    {
      path: "/docs/installation",
      name: "Getting Started",
      component: Installation
    },
    {
      path: "/docs/plugins",
      name: "Plugins",
      component: Plugins
    },
    {
      path: "/docs/changelog",
      name: "Changelog",
      component: Changelog
    }
  ]
};

const uiRoutes = {
  path: "/ui",
  name: "UI Elements",
  header: "Components",
  icon: GridIcon,
  children: [
    {
      path: "/ui/alerts",
      name: "Alerts",
      component: Alerts
    },
    {
      path: "/ui/buttons",
      name: "Buttons",
      component: Buttons
    },
    {
      path: "/ui/cards",
      name: "Cards",
      component: Cards
    },
    {
      path: "/ui/general",
      name: "General",
      component: General
    },
    {
      path: "/ui/grid",
      name: "Grid",
      component: Grid
    },
    {
      path: "/ui/modals",
      name: "Modals",
      component: Modals
    },
    {
      path: "/ui/notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "/ui/tabs",
      name: "Tabs",
      component: Tabs
    },
    {
      path: "/ui/typography",
      name: "Typography",
      component: Typography
    }
  ]
};

const chartRoutes = {
  path: "/charts",
  name: "Charts",
  icon: PieChartIcon,
  badgeColor: "primary",
  badgeText: "New",
  children: [
    {
      path: "/charts/chartjs",
      name: "Chart.js",
      component: Chartjs
    },
    {
      path: "/charts/apexcharts",
      name: "ApexCharts",
      component: ApexCharts,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const formRoutes = {
  path: "/forms",
  name: "Forms",
  icon: CheckSquareIcon,
  children: [
    {
      path: "/forms/layouts",
      name: "Layouts",
      component: Layouts
    },
    {
      path: "/forms/basic-elements",
      name: "Basic Elements",
      component: BasicElements
    },
    {
      path: "/forms/advanced-elements",
      name: "Advanced Elements",
      component: AdvancedElements
    },
    {
      path: "/forms/input-groups",
      name: "Input Groups",
      component: InputGroups
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors
    },
    {
      path: "/forms/validation",
      name: "Validation",
      component: Validation
    },
    {
      path: "/forms/wizard",
      name: "Wizard",
      component: Wizard
    }
  ]
};

const tableRoutes = {
  path: "/tables",
  name: "Tables",
  icon: ListIcon,
  children: [
    {
      path: "/tables/bootstrap",
      name: "Bootstrap",
      component: BootstrapTables
    },
    {
      path: "/tables/advanced-tables",
      name: "Advanced",
      component: AdvancedTables
    }
  ]
};

const iconRoutes = {
  path: "/icons",
  name: "Icons",
  icon: HeartIcon,
  badgeColor: "info",
  badgeText: "Special",
  children: [
    {
      path: "/icons/feather",
      name: "Feather",
      component: Feather
    },
    {
      path: "/icons/font-awesome",
      name: "Font Awesome",
      component: FontAwesome
    }
  ]
};

const calendarRoutes = {
  path: "/calendar",
  name: "Calendar",
  icon: CalendarIcon,
  component: Calendar,
  badgeColor: "primary",
  badgeText: "New",
  children: null
};

const mapRoutes = {
  path: "/maps",
  name: "Maps",
  icon: MapPinIcon,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps
    }
  ]
};

// This route is not visisble in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  addCustomerRoutes,
  customerViewRoutes,
  customersRoutes,
  examsRoutes,
  ordersRoutes,
  paymentsRoutes,
  settingsRoutes,
  pageRoutes,
  layoutRoutes,
  documentationRoutes,
  uiRoutes,
  chartRoutes,
  formRoutes,
  tableRoutes,
  iconRoutes,
  calendarRoutes,
  mapRoutes,
  privateRoutes,
  itemsRoute,
  itemsEditRoute,
  newItemsRoute,
  OrdersEditRoute,
  newInventoryAdjustmentsRoute,
  newTransferRoute,
  transferViewRoute,
  inventoryAdjustmentViewRoute,
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
  examsRoutes,
  paymentsRoutes,
  settingsRoutes,
 

  // pageRoutes,
  // authRoutes,
  // layoutRoutes,
  // documentationRoutes,
  // uiRoutes,
  // chartRoutes,
  // formRoutes,
  // tableRoutes,
  // iconRoutes,
  // calendarRoutes,
  // mapRoutes
];
