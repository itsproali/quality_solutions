import EventIcon from "@mui/icons-material/Event";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

// type NavItem = {
//   name: string;
//   path: string;
//   scrollLink?: boolean;
//   icon?: any;
// };

export const navItems = [
  {
    name: "Events",
    route: "/events",
    icon: <EventIcon />,
  },
  {
    name: "Services",
    route: "/services",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Training",
    route: "/courses",
    icon: <VideoLibraryIcon />,
  },
  {
    name: "Books",
    route: "/books",
    icon: <MenuBookIcon />,
  },
  {
    name: "GxP Documents",
    route: "/products",
    icon: <AddCircleIcon />,
  },
  {
    name: "Blogs",
    route: "blog",
    scrollLink: true,
    icon: <LibraryBooksIcon />,
  },
];

export const userMenus = [
  {
    name: "Profile",
    route: "/account",
    icon: "/icons/user.png",
  },
  {
    name: "My Documents",
    route: "/my-documents",
    icon: "/icons/file.png",
  },
  {
    name: "My Courses",
    route: "/my-courses",
    icon: "/icons/book.png",
  },
  {
    name: "My Orders",
    route: "/orders",
    icon: "/icons/invoice.png",
  },
  {
    name: "Password",
    route: "/password",
    icon: "/icons/security.png",
  },
];
