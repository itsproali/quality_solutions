import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { useSingleUser } from "../../hooks/useUser";
import ProfileUpdateModal from "./ProfileUpdateModal";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: user } = useSingleUser();

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={600}>
          Account Information
        </Typography>

        <Button
          variant="outlined"
          sx={{
            px: 3,
            color: "grey.800",
            borderColor: "grey.400",
            fontWeight: 600,
            borderRadius: 2,
          }}
          startIcon={
            <Image src="/icons/edit.png" alt="edit" width={15} height={15} />
          }
          onClick={() => setOpenModal(true)}
        >
          Edit
        </Button>
      </Stack>

      <Box
        sx={{
          mt: 4,
          borderRadius: 3,
          bgcolor: "white",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Name */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Full Name
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
              {user?.name}
            </Typography>
          </Box>
        </Stack>
        <Divider />

        {/* Email */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Email
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
              {user?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />

        {/* Phone */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Phone no
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
              {user?.phone}
            </Typography>
          </Box>
        </Stack>
        <Divider />

        {/* Gender */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Gender
            </Typography>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mt: 1, textTransform: "capitalize" }}
            >
              {user?.gender}
            </Typography>
          </Box>
        </Stack>
        <Divider />

        {/* Date of Birth */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3 }}
        >
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Date of Birth
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
              {moment(user?.dateOfBirth).format("LL")}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <ProfileUpdateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Profile;
