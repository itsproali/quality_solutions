import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { scroller } from "react-scroll/modules";
import { navItems, userMenus } from "../../../staticData/navlinks";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../../hooks/useCart";

const Header = () => {
  const { data: cartItems } = useCart();
  const cartCount = cartItems?.length || 0;
  const [mobileMenu, setMobileMenu] = React.useState(null);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenUserClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data: session } = useSession();

  const handleOpenMobileMenu = (event) => {
    setMobileMenu(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenu(null);
  };

  const scrollTarget = (target) => scroller.scrollTo(target, { smooth: true });

  const scrollToPage = async (target) => {
    if (router.pathname !== "/") {
      await router.push("/");
    }
    scrollTarget(target);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid #E8E8E8",
      }}
    >
      <Container fixed>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", cursor: "pointer" },
            }}
          >
            <Image
              src="/images/logo.png"
              alt="One Quality Solutions"
              height={35}
              width={60}
              onClick={() => router.push("/")}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MobileMenu
              open={Boolean(mobileMenu)}
              onClose={handleCloseMobileMenu}
              onOpen={handleOpenMobileMenu}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", cursor: "pointer" },
            }}
          >
            <Image
              src="/images/logo.png"
              alt="One Quality Solutions"
              height={35}
              width={60}
              onClick={() => router.push("/")}
            />
          </Typography>

          {/* Nav Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 5,
            }}
          >
            {navItems?.map((item, i) => (
              <CustomMenuButton
                key={i}
                onClick={() => {
                  item.scrollLink ? scrollToPage(item?.route) : null;
                }}
                active={router.pathname === item?.route}
              >
                <Link href={item.scrollLink ? "/" : item?.route}>
                  {item.name}
                </Link>
              </CustomMenuButton>
            ))}
          </Box>

          {/* Nav Right */}
          <Box sx={{ flexGrow: 0 }}>
            {session?.accessToken ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  aria-label="cart"
                  onClick={() => router.push("/cart")}
                >
                  <Badge
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -1,
                        top: 2,
                        border: `2px solid white`,
                        padding: "0 4px",
                      },
                    }}
                    badgeContent={cartCount}
                    color="error"
                  >
                    <Image
                      src="/icons/cart.png"
                      alt="cart"
                      height={25}
                      width={25}
                    />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={handleOpenUserClick}
                  sx={{ border: "7px solid #E6F0FF", width: 50, height: 50 }}
                >
                  <Avatar
                    sx={{ bgcolor: "primary.main" }}
                    alt={session?.user?.name}
                    src={session?.user?.image}
                  >
                    {session?.user?.name[0]}
                  </Avatar>
                </IconButton>
              </Stack>
            ) : (
              <Link href="/login">
                <Button
                  sx={{
                    py: 1,
                    px: 4,
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                  variant="contained"
                  color="primary"
                >
                  Log in
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleOpenUserClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            px: 2,
            py: 1,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "primary.main",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              border: "7px solid #E6F0FF",
              width: 50,
              height: 50,
            }}
            alt={session?.user?.name}
            src={session?.user?.image}
          >
            {session?.user?.name[0]}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              {session?.user?.name}
            </Typography>
            <Typography variant="body2" fontSize={12}>
              {session?.user?.email}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {userMenus?.map((menu, index) => (
          <Link href={`${menu.route}`} key={index}>
            <MenuItem
              sx={{
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#E6F0FF",
                },
              }}
              onClick={handleOpenUserClose}
            >
              <Image src={menu.icon} alt={menu.name} height={20} width={20} />
              <Typography variant="body1">{menu.name}</Typography>
            </MenuItem>
          </Link>
        ))}
        <Divider sx={{ my: 2 }} />
        <MenuItem
          onClick={() => {
            handleOpenUserClose();
            signOut({
              callbackUrl: `/login`,
              redirect: true,
            });
          }}
          sx={{
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            py: 1.5,
            color: "error.main",
            "&:hover": {
              bgcolor: "error.lighter",
            },
          }}
        >
          <Image src="/icons/logout.png" alt="icon" height={20} width={20} />
          <Typography variant="body1">Log Out</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
export default Header;

const CustomMenuButton = ({ onClick, active, ...rest }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        marginTop: "16px",
        marginBottom: "16px",
        color: active ? "primary.main" : "primary.darker",
        fontSize: "1.1rem",
        marginRight: "5px",
        fontWeight: 600,
      }}
      {...rest}
    ></Button>
  );
};

// const CustomMenuButton = styled(Button)({
//   marginTop: "16px",
//   marginBottom: "16px",
//   color: "#002359",
//   // display: "block",
//   // fontFamily: "'Playfair Display', serif",
//   fontFamily: "'Manrope', 'Poppins', sans-serif",
//   textTransform: "capitalize",
//   fontSize: "1.1rem",
//   marginRight: "5px",
//   fontWeight: 600,
// });
