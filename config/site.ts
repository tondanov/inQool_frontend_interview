export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "inQool interview",
  description: "Make working app",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Users",
      href: "/users",
    },
    {
      label: "Animals",
      href: "/animals",
    },
  ],
  navMenuItems: [
    {
      label: "Users",
      href: "/users",
    },
    {
      label: "Animals",
      href: "/animals",
    },
  ],
};
