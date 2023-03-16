import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import PostModal from "../components/PostModal";

const PostPageDetails = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={() => navigate("/")}>
        Go back
      </Button>
      <Typography variant="h2">Post Details</Typography>
      <PostDetails posts={posts} />
      <PostModal posts={posts} />
    </Box>
  );
};

export default PostPageDetails;
