import { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  BookmarkIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";

export default function SideBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [role] = useRole();
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const renderSidebarItems = () => {
    switch (role) {
      case "admin":
        return (
          <List>
            <NavLink to="/dashboard" end activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Profile
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/add-package" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <CubeTransparentIcon className="h-5 w-5" />
                </ListItemPrefix>
                Host Events
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/manage-users" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <PlusIcon className="h-5 w-5" />
                </ListItemPrefix>
                Manage Users
              </ListItem>
            </NavLink>
          </List>
        );
      case "student":
        return (
          <List>
            <NavLink to="/dashboard" end activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Profile
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/my-bookings" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <BookmarkIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Events
              </ListItem>
            </NavLink>
            {/* <NavLink to="/dashboard/my-wishlist" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <HeartIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Wishlist
              </ListItem>
            </NavLink> */}
            <NavLink to="/dashboard/request-to-admin" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                </ListItemPrefix>
                Request to Admin
              </ListItem>
            </NavLink>
          </List>
        );
      case "moderator":
        return (
          <List>
            <NavLink to="/dashboard" end activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Profile
              </ListItem>
            </NavLink>
            <NavLink to="/dashboard/announce" activeClassName="active">
              <ListItem>
                <ListItemPrefix>
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                </ListItemPrefix>
                Post Announcement
              </ListItem>
            </NavLink>
          </List>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center glassbg">
        <div className="flex gap-2 items-center ">
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <p>Click to open Dashboard</p>
        </div>
        <div>
          <NavLink to={'/'} className="mr-1 bg-info cursor-pointer rounded-full px-3 py-1 text-black font-bold">Home</NavLink>
        </div>
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Dashboard
            </Typography>
          </div>
          {renderSidebarItems()}
        </Card>
      </Drawer>
    </div>
  );
}
