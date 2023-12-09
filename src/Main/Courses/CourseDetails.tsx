import AvTimerIcon from "@mui/icons-material/AvTimer";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICourse } from "../../Interfaces/Course.interface";
import { useCart } from "../../hooks/useCart";
import { useMyCourses } from "../../hooks/useCourses";
import authFetch from "../../services/AxiosCommon";
import isSameType from "../../utils/isSameType";

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Syllabus", value: "syllabus" },
  { label: "Course Instructor", value: "instructor" },
  { label: "Reviews", value: "reviews" },
  { label: "More Courses", value: "more" },
];

const CourseDetails = ({ course }: { course: ICourse }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { data: cartItems } = useCart();
  const { data: purchasedCourses } = useMyCourses();
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (session?.accessToken) {
      const cartItem = {
        user: session?.user._id,
        course: course._id,
        price: course.price_bdt,
        type: "tutorial",
      };

      if (!isSameType(cartItems, "tutorial")) {
        return;
      }

      try {
        setLoading(true);
        const response = await authFetch.post("/api/v1/cart", cartItem, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (response.status === 201) {
          toast.success("Added to cart");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };

  // Manage Purchased Courses
  useEffect(() => {
    if (purchasedCourses) {
      const isPurchased = purchasedCourses.some(
        (purchasedCourse: any) => purchasedCourse?.course?._id === course._id
      );
      setIsPurchased(isPurchased);
    }
  }, [purchasedCourses, course._id]);

  return (
    <Container fixed sx={{ py: 12, minHeight: "80vh" }}>
      {/*  */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, fontSize: { xs: 28, lg: 38 } }}
        >
          {course?.title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            lineHeight: 1.2,
            my: 4,
            maxWidth: 816,
            textAlign: "center",
            fontSize: { xs: 16, lg: 21 },
          }}
        >
          {/* {htmlToPlainText(course?.description?.slice(0, 200)) + "..."} */}
          Explore perioperative medicine and how you can improve care for the
          high risk surgical patient. Join this RCoA endorsed course.
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Rating value={4} readOnly />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            4.0
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
            (20 Reviews)
          </Typography>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        spacing={2}
        sx={{ my: 2 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 24, lg: 34 },
          }}
        >
          ৳ {course?.price_bdt}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: { xs: 18, lg: 22 },
            color: "grey.400",
            textDecoration: "line-through",
          }}
        >
          ৳ {course?.price_bdt * 1.5}
        </Typography>
      </Stack>

      {/* <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2, color: "error.main" }}
      >
        <AvTimerIcon color="error" />
        <Typography variant="body1" sx={{ fontWeight: 400 }}>
          <strong>5 hours</strong> left at this price!
        </Typography>
      </Stack> */}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {isPurchased ? (
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              px: 6,
            }}
            onClick={() => {
              router.push(`/my-courses/${course._id}`);
            }}
          >
            Start
          </Button>
        ) : (
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 600,
              px: 6,
            }}
            onClick={handleAddToCart}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            disabled={loading}
          >
            Enroll Now
          </Button>
        )}
      </Stack>

      {/* Course Description */}
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            aspectRatio: "1083/414",
            borderRadius: 2,
            position: "relative",
            objectFit: "cover",
          }}
        >
          <Image
            src={course?.image}
            alt={course?.title}
            layout="fill"
            blurDataURL={course?.image}
            placeholder="blur"
            style={{ borderRadius: "12px" }}
          />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            mt: 2,
            border: "1px solid",
            borderColor: "primary.light",
            p: 1.5,
            borderRadius: "8px",
          }}
        >
          {tabs?.map((item) => (
            <Button
              key={item?.value}
              size="large"
              variant={activeTab === item?.value ? "contained" : "text"}
              sx={{
                fontWeight: 700,
                color: activeTab === item?.value ? "white" : "text.secondary",
              }}
              onClick={() => setActiveTab(item?.value)}
            >
              {item?.label}
            </Button>
          ))}
        </Stack>

        <Box
          sx={{
            mt: 5,
            // fontWeight: 400,
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: course?.description }}
        />
      </Box>
    </Container>
  );
};

export default CourseDetails;
