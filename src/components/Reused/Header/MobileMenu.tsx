import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { scroller } from "react-scroll/modules";
import { navItems } from "../../../staticData/navlinks";

type IProps = {
  open: boolean;
  onClose: () => void;
  onOpen: (e: any) => void;
};

const MobileMenu = ({ open, onClose, onOpen }: IProps) => {
  const router = useRouter();

  const scrollTarget = (target) => scroller.scrollTo(target, { smooth: true });

  const scrollToPage = async (target) => {
    if (router.pathname !== "/") {
      await router.push("/");
    }
    scrollTarget(target);
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box sx={{ width: 300 }}>
        <Box sx={{ textAlign: "center", cursor: "pointer", my: 3 }}>
          <Image
            src="/images/logo.png"
            alt="One Quality Solutions"
            height={35}
            width={60}
            onClick={() => router.push("/")}
          />
        </Box>

        <List>
          {navItems?.map((item, i) => (
            <ListItem
              key={i}
              onClick={() => {
                if (item?.scrollLink) {
                  scrollToPage(item?.route);
                } else {
                  router.push(item?.route);
                }
                onClose();
              }}
              sx={{
                py: 0,
                color:
                  router.pathname === item?.route
                    ? "primary.main"
                    : "text.black",
              }}
            >
              <ListItemButton
                sx={{
                  py: 1.5,
                }}
              >
                {item?.icon && (
                  <ListItemIcon
                    sx={{
                      "& svg": {
                        color:
                          router.pathname === item?.route && "primary.main",
                      },
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={item?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default MobileMenu;
