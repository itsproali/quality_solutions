import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { IUser } from "../../Interfaces/Account.interface";
import { UserService } from "../../services/UserService";
import { useEffect } from "react";
import { months, years } from "../../staticData/calender_info";
import { useSingleUser } from "../../hooks/useUser";
import moment from "moment";

// --------Form---------
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/Reused/HookForm/FormProvider";
import RHFTextField from "../../components/Reused/HookForm/RHFTextField";
import RHFSelect from "../../components/Reused/HookForm/RHFSelect";

type IProps = {
  open: boolean;
  onClose: () => void;
};

type IData = {
  name: string;
  phone: string;
  gender: string;
  date: string;
  month: string;
  year: string;
};

const ProfileUpdateModal = ({ open, onClose }: IProps) => {
  const { data: session } = useSession();
  const { data: user } = useSingleUser();
  const queryClient = useQueryClient();

  const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().optional(),
    gender: Yup.string().optional(),
    date: Yup.string().optional(),
    month: Yup.string().optional(),
    year: Yup.string().optional(),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateProfileSchema),
  });

  const {
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);
    setValue("gender", user?.gender);
    setValue("date", moment(user?.dateOfBirth).format("D"));
    setValue("month", moment(user?.dateOfBirth).format("MMMM"));
    setValue("year", moment(user?.dateOfBirth).format("YYYY"));
  }, [setValue, user]);

  // Update User Profile
  const { mutateAsync: updateProfile, isLoading: updateLoading } = useMutation(
    (user: Partial<IUser>) =>
      UserService.updateUser(user, session?.accessToken),
    {
      onSuccess: (data) => {
        toast.success("Profile Updated Successfully");
        queryClient.invalidateQueries(["user"]);
      },
      onError: (error: any) => {
        toast.error("Error Updating Profile");
      },
    }
  );

  const onSubmit: SubmitHandler<IData> = async (data) => {
    // merge date, month, year to dateOfBirth
    const dateOfBirth = moment(
      `${data?.date} ${data?.month} ${data?.year}`,
      "D MMMM YYYY"
    ).toISOString();

    console.log(data, dateOfBirth);
    updateProfile({
      name: data?.name,
      phone: data?.phone,
      gender: data?.gender,
      dateOfBirth,
    });
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Edit Information</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ minWidth: { xs: "100%", md: 500 } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="name"
            label="Full Name"
            helperText={errors?.name?.message}
            fullWidth
            sx={{ mb: 3 }}
          />

          <RHFTextField
            name="phone"
            label="Phone No"
            helperText={errors?.phone?.message}
            fullWidth
            sx={{ mb: 3 }}
          />

          <RHFSelect
            name="gender"
            label="Gender"
            helperText={errors?.gender?.message}
            sx={{ mb: 3 }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </RHFSelect>

          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 2 }}>Date Of Birth</Typography>
            <Stack direction="row" spacing={2}>
              <RHFSelect
                name="date"
                label="Date"
                helperText={errors?.date?.message}
              >
                {Array.from(Array(31).keys()).map((date) => (
                  <MenuItem key={date} value={date + 1}>
                    {date + 1}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                name="month"
                label="Month"
                helperText={errors?.month?.message}
              >
                {months?.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                name="year"
                label="Year"
                helperText={errors?.year?.message}
              >
                {years?.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Box>

          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 10 }}
            disabled={updateLoading}
            startIcon={updateLoading && <CircularProgress size={20} />}
          >
            Submit
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
