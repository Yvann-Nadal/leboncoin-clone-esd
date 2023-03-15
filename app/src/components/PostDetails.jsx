import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/post.service";

const PostDetails = ({ posts }) => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const getCurrentPost = async () => {
    await PostService.getOne(id).then(response => {
      setPost(response);
    });
  };

  useEffect(() => {
    if (id) {
      getCurrentPost();
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log("post : ", post);
    }
  }, [post]);

  return (
    <Box>
      <Box
        sx={{
          border: "2px solid black",
          borderRadius: 2,
          mb: 5,
          p: 2,
          cursor: "pointer"
        }}>
        <Typography variant="h3">{post.title}</Typography>
        <Typography variant="body1">{post.content}</Typography>
        {post.uploadFiles?.length > 0 ? (
          post.uploadFiles.map(photo => (
            <Box key={photo.Key}>
              <img src={photo.Location} alt="" />
            </Box>
          ))
        ) : (
          <Box>
            <Typography variant="body1">No photos</Typography>
          </Box>
        )}
        {/* <Box key={photo.id}>
          <img src={photo.Location} alt="test" style={{ height: 100 }} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default PostDetails;
