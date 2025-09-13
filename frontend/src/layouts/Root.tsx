
import {
  Button,
  Drawer,
  // DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { FiHome, FiUsers, FiMenu, FiLogOut, FiX } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";

import { Navigate, NavLink, Outlet, useLocation } from "react-router";

import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";

const Root = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();


  const handleClose = () => setIsOpen(false);


  const { user, status, logout } = useAuth();

  // Resize drawer
  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };


    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout the user
  const handleLogout = async () => {
    try {
      await logout();

    } catch (e) {
      console.log('failed to logout', e);
    }
  }


  // Checking if user is authenticated
  if (status === 'idle') {
    return <div className="flex items-center justify-center min-h-screen">
      <Spinner size="xl" />
    </div>
  }

  if (status === 'unauthorized') {

    return <Navigate to={'/login'} />
  }



  // Close the drawer during navigation in mobile 
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };


  return (
    <>
      <div className=" w-full py-14  md:py-10   items-center justify-center relative">

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden absolute right-4 top-5 flex items-center justify-center cursor-pointer">
          <FiMenu color="black " size={20} />
        </button>


        <div className="px-4  md:pl-[350px] max-w-[1600px]">
          <Outlet />
          <Footer />
        </div>

      </div>
      <Drawer className="bg-blue-50 not-dark:bg-blue-50"
        backdrop={false}

        open={isOpen} onClose={handleClose}>

        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-gray-50 pt-20 h-[70vh] w-full [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <div className="px-4 py-3 border-b border-gray-200 text-center">
                  <p className="font-semibold text-2xl text-gray-800">{user?.name}</p>
                  <p className="text-gray-600 text-xl">{user?.email}</p>
                  <p className="text-gray-500 text-xs">
                    {user?.is_admin ? "Admin" : "User"}
                  </p>
                </div>
              </div>
              <div>

                <SidebarItems>
                  <SidebarItemGroup className="px-5">
                    <SidebarItem as="p" icon={FiHome} active={location.pathname === '/'}>
                      <NavLink onClick={handleLinkClick} className="block w-full no-underline" to="/">
                        Dashboard
                      </NavLink>
                    </SidebarItem>
                    <SidebarItem as="p" icon={FaRegBuilding} active={location.pathname === '/companies'}>
                      <NavLink onClick={handleLinkClick} className="block w-full no-underline" to="/companies">
                        Companies
                      </NavLink>
                    </SidebarItem>



                    <SidebarItem as="p" icon={FiUsers} active={location.pathname === '/employees'}>
                      <NavLink onClick={handleLinkClick} className="block w-full no-underline" to="/employees">
                        Employees
                      </NavLink>
                    </SidebarItem>



                  </SidebarItemGroup>

                  <SidebarItemGroup>

                    <SidebarItem as="p" >
                      <Button color={'red'} title="Click" onClick={handleLogout} >
                        <FiLogOut /> Logout
                      </Button>

                      <button onClick={() => setIsOpen(false)} className="md:hidden  left-2 top-3  absolute flex items-center z-10 justify-center cursor-pointer">
                        <FiX color="black " size={20} />
                      </button>

                    </SidebarItem>
                  </SidebarItemGroup>

                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  );
}

export default (Root);
