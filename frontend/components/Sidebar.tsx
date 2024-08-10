"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

import {
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  PackageSearch,
  PencilRuler,
  ShoppingBasket,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
// import logoWhiteImage from "../assets/mit_logo_white.png";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });


const Sidebar = () => {
  const pathName = usePathname();
  const params = useParams();

  const [mounted, setMounted] = useState<boolean>(false);

  const routes = [
    {
      label: "Dashboard",
      href: "/seller/dashboard",
      icon: LayoutDashboardIcon,
      color: "text-sky-500",
      active: pathName === `/seller/dashboard`
    },
    {
      key: 'products',
      href: `/seller/products`,
      label: 'Product',
      icon: PackageSearch,
      color: "text-red-500",
      active:
      pathName === `/seller/products/${params.productId}` ||
      pathName === `/seller/products` ||
      pathName === `/seller/products/new`,
    },
    {
      key: 'Categories',
      href: `/seller/categories`,
      label: 'Categories',
      icon: LogOutIcon,
      color: "text-green-500",
      active:
      pathName === `/seller/categories` ||
      pathName === `/seller/categories/${params.categoryId}` ||
      pathName === `/seller/categories/new`,
    },
    {
      key: 'Sizes',
      href: `/seller/sizes`,
      label: 'Size',
      icon: PencilRuler,
      color: "text-teal-500",
      active:
      pathName === `/seller/sizes` ||
        pathName === `/seller/sizes/${params.sizeId}` ||
        pathName === `/seller/sizes/new`,
      },
      {
        key: 'Colors',
        href: `/seller/colors`,
        label: 'Color',
        icon: Palette,
        color: "text-violet-500",
        active:
        pathName === `/seller/color/${params.colorId}` ||
        pathName === `/seller/colors` ||
        pathName === `/seller/colors/new`,
      },
      {
        key: 'orders',
        href: `/seller/orders`,
        label: 'Order',
        icon: ShoppingBasket,
        color: "text-amber-500",
        active:
        pathName === `/seller/orders/${params.orderId}` ||
        pathName === `/seller/orders` ||
        pathName === `/seller/orders/new`,
    },
    {
      key: 'Settings',
      href: `/seller/settings`,
      label: 'Settings',
      icon: SettingsIcon,
      color: "text-amber-500",
      active: pathName === `/seller/settings`,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: LogOutIcon,
      color: "text-gray-700",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4 py-4 flex flex-col w-full h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-2">
        <div className="flex items-center justify-center w-full mr-2">
          <Link href="/">
            {/* <Image
              src={logoWhiteImage}
              className="cursor-pointer"
              alt="logo"
              width={190}
              height={55}
            /> */}
            <p>Hello</p>
          </Link>
        </div>
        <div className="space-y-1 mt-8">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
               <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
