import { Box, Popover } from "@mui/material";
import React from "react";
import { ServiceMenuButton } from "./Header";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ArrowRightIcon = dynamic(() => import("@mui/icons-material/ArrowRight"), {
  ssr: false,
});

const MenuPop = ({
  popId,
  openPop,
  anchorElement,
  onClosePop,
  subCategoris,
  title,
  onClickPop,
  type,
  onParentClose,
}) => {
  const router = useRouter();
  return (
    <Box>
      <Box>
        <ServiceMenuButton
          aria-describedby={popId}
          onClick={onClickPop}
          endIcon={<ArrowRightIcon />}
        >
          {title}
        </ServiceMenuButton>
      </Box>
      {/* <Popover
        id={popId}
        open={openPop}
        anchorEl={anchorElement}
        onClose={onClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ ".MuiPaper-root": { px: 2, py: 1 } }}
      >
        {subCategoris.map((subCategory) => (
          <Box key={subCategory.id}>
            <ServiceMenuButton
              onClick={() => {
                router.push(type === "service" ? `/services/${subCategory.slug}` : `/products/${subCategory.slug}`);
                onClosePop();
                onParentClose();
              }}
            >
              {subCategory.title}
            </ServiceMenuButton>
          </Box>
        ))}
      </Popover> */}
    </Box>
  );
};

export default MenuPop;
