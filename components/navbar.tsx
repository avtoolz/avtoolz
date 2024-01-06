"use client";
import { siteConfig } from "@/config/site";
import { useIsMounted } from "@/hooks/use-is-mounted";

import { Tools } from "@/libs/tools";
import { ToolCategory } from "@/types/tool";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spacer,
} from "@nextui-org/react";
import {
  ChevronDown,
  ChevronDownIcon,
  LinkIcon,
} from "@nextui-org/shared-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { Key, useRef } from "react";
import { GithubIcon, Logo } from "./icons";
import ThemeSwitch from "./theme-switch_bkp";
import ThemeToggle from "./theme-toggle";

export const XNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const ref = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();
  const menuItems = ["All Tools", "PDF Tools", "Image Tools"];

  const handleVersionChange = (key: Key) => {
    if (key === "v1") {
      const newWindow = window.open(
        "https://avtoolz-v1.vercel.app/",
        "_blank",
        "noopener,noreferrer"
      );

      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <Navbar ref={ref} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Logo size={26} />
          <Spacer x={2} />
          <h1 className="font-bold text-inherit">aVToolz</h1>
          <Spacer x={2} />

          {ref.current ? (
            <Dropdown placement="bottom-start" portalContainer={ref.current}>
              <AnimatePresence>
                {isMounted && (
                  <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                  >
                    <DropdownTrigger>
                      <Button
                        className="hidden text-xs h-6 w-[74px] py-1 min-w-fit sm:flex gap-0.5 bg-default-400/20 dark:bg-default-500/20"
                        endContent={<ChevronDownIcon className="text-tiny" />}
                        radius="full"
                        size="sm"
                        variant="flat"
                      >
                        v2
                      </Button>
                    </DropdownTrigger>
                  </motion.div>
                )}
              </AnimatePresence>
              <DropdownMenu
                aria-label="aVToolz versions"
                defaultSelectedKeys={["latest"]}
                selectionMode="single"
                onAction={handleVersionChange}
              >
                <DropdownItem key="latest">v2 (latest)</DropdownItem>
                <DropdownItem key="v1" endContent={<LinkIcon />}>
                  v1 (deprecated)
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-[74px]" />
          )}
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar Items */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                PDF Tools
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={"PDF Tools"}
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {Tools.filter((tool) =>
              tool.category.includes(ToolCategory.PDF)
            ).map((tool) => (
              <DropdownItem
                key={tool.title}
                // description={tool.description}
                startContent={tool.icon}
                // onPress={() => {
                //   open(tool.href, "_self");
                // }}
              >
                {tool.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Image Tools
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={"Image Tools"}
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {Tools.filter((tool) =>
              tool.category.includes(ToolCategory.IMAGE)
            ).map((tool) => (
              <DropdownItem
                key={tool.title}
                // description={tool.description}
                startContent={tool.icon}
                // onPress={() => {
                //   open(tool.href, "_self");
                // }}
              >
                {tool.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeToggle />

          {/* TODO: Implement auth button */}
          {/* <AuthButton /> */}
        </NavbarItem>

        <NavbarContent className="sm:hidden" justify="end">
          {/* TODO: Implement auth button on mobile */}
          {/* <NavbarItem>
            <AuthButton />
          </NavbarItem> */}
          <NavbarItem>
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="text-default-500" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="w-full h-full pt-1"
            />
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="primary" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
