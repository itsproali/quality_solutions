import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import PasswordField from "../../components/Reused/Account/PasswordField";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/UserService";
import { useSession } from "next-auth/react";

const Password = () => {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePass, isLoading } = useMutation(
    (data: { oldPassword: string; newPassword: string }) =>
      UserService.changePassword(data, session?.accessToken),
    {
      onSuccess: (data) => {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError(error: any) {
        toast.error((error?.message as string) || "Password change failed");
      },
    }
  );

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.warning("Passwords didn't match");
      return;
    }
    changePass({ oldPassword: currentPassword, newPassword });
  };

  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight={600}>
          Password
        </Typography>

        <Typography variant="body2" color="textSecondary">
          You can change your password here. Please note that once you change
          your password, you won&apos;t be able to access your account using old
          password.
        </Typography>
      </Box>

      <Box sx={{ mt: 10, maxWidth: { xs: "100%", md: 400 } }}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <PasswordField
            name="currentPassword"
            label="Current Password"
            onChange={(e: any) => setCurrentPassword(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ my: 1 }}>
          <PasswordField
            name="newPassword"
            label="New Password"
            onChange={(e: any) => setNewPassword(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ my: 1 }}>
          <PasswordField
            name="confirmPassword"
            label="Confirm Password"
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Change Password
        </Button>
      </Box>
    </>
  );
};

export default Password;
