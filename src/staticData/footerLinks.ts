export type FooterLink = {
  name: string;
  url: string;
  icon?: string;
  scrollTo?: string;
};

export type FooterLinks = {
  title: string;
  links: FooterLink[];
};

export const footerLinks: FooterLinks[] = [
  {
    title: "About",
    links: [
      {
        name: "Terms & Conditions",
        url: "/terms-and-conditions",
      },
      {
        name: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        name: "Return and Refund Policy",
        url: "/return-and-refund-policy",
      },
    ],
  },
  {
    title: "Product",
    links: [
      {
        name: "Services",
        url: "/services",
      },
      {
        name: "GxP Documents",
        url: "/products",
      },
      {
        name: "Books",
        url: "/books",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About",
        url: "/about",
      },
      {
        name: "Blogs",
        url: "/blogs",
      },
      {
        name: "Contact Us",
        url: "/contact",
        scrollTo: "contact",
      },
    ],
  },
  {
    title: "Social Links",
    links: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/1qualitysolutions",
        icon: "/icons/facebook.png",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/one-quality-solutions-limited/about",
        icon: "/icons/linkedin.png",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com",
        icon: "/icons/youtube.png",
      },
    ],
  },
];
