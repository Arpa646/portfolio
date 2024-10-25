import { Car, Cog, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "@/app/(dashboardLayout)/layout/layout-context";


export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
            <Cog />
            <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
          </Link>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
          <SidebarItem
              title="Main Home"
              icon={<Home />}
              isActive={pathname === "/"}
              href="/"
            />

            <SidebarMenu title="Main Menu">
            <SidebarItem
              title="DashBorad Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
              <SidebarItem
                title="AddBlog"
                icon={<Home />}
                isActive={pathname === "/dashboard/addrecipie"}
                href="/dashboard/addrecipie"
              />
              <SidebarItem
                title="AddProject"
                icon={<Home />}
                isActive={pathname === "/dashboard/addProject"}
                href="/dashboard/addProject"
              />
              <SidebarItem
                title="AddSkill"
                icon={<Home />}
                isActive={pathname === "/dashboard/addskill"}
                href="/dashboard/addskill"
              />
              <SidebarItem
                title="AddExperience"
                icon={<Home />}
                isActive={pathname === "/dashboard/addexperience"}
                href="/dashboard/addexperience"
              />

              <SidebarItem
                isActive={pathname === "/dashboard/myprofile"}
                title="Myprofile"
                icon={<Car />}
                href="/dashboard/myprofile"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/getpremiumuser"}
                title="GetPremiumUser"
                icon={<Car />}
                href="/dashboard/getpremiumuser"
              />
             
           
             
           
            </SidebarMenu>

         
          </div>
        </div>
      </div>
    </aside>
  );
};
