import cookie from "cookie";
import { getSession } from "next-auth/react";
import Router from "next/router";

const cookieParser = (req) => {
  cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

export const privateRoute = async (context) => {
  const { req, res, asPath } = context;

  const isServer = !!req;
  const isBrowser = !req;

  // const data = cookieParser(req);
  const data = await getSession(context);

  if (isServer) {
    if (!data?.accessToken) {
      res?.writeHead(302, {
        Location: `/login?from=${encodeURIComponent(asPath || "/")}`,
      });
      res?.end();
    }
  }

  if (isBrowser) {
    if (!data?.accessToken) {
      await Router.replace(`/login?from=${encodeURIComponent(asPath || "/")}`);
    }
  }

  return { userAuth: { auth: data?.accessToken ? true : null } };
};

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getCategoryName = (category, categories) => {
  const categoryData = categories?.find((item) => item._id == category);
  return categoryData?.title;
};
