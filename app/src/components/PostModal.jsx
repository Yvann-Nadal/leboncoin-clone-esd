import { Backdrop, Box, Button, Fade, Grid, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import PostService from "../services/post.service";

SwiperCore.use([Navigation, Pagination]);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1500,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

const PostModal = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div>
      <Button onClick={handleOpen} variant="contained">
        Open modal
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                border: "2px solid black"
              }}
              style={{ height: "100%" }}>
              {post.uploadFiles?.length > 0 ? (
                post.uploadFiles.map(photo => (
                  <Box key={photo.Key}>
                    <Grid item xs={12} md={6}>
                      <img src={photo.Location} alt="" style={{ width: "100%" }} />
                    </Grid>
                  </Box>
                ))
              ) : (
                <Box>
                  <Typography variant="body1">No photos</Typography>
                </Box>
              )}
            </Box>
            <Box>
              <Typography variant="h3">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="body1">{post.formatted_address}</Typography>
            </Box>
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={swiper => console.log(swiper)}
              className="mySwiper">
              {/* <SwiperSlide>
                <img src={post.uploadFiles[0]?.Location} alt="Slide 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={post.uploadFiles[1]?.Location} alt="Slide 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={post.uploadFiles[2]?.Location} alt="Slide 3" />
              </SwiperSlide> */}
            </Swiper>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PostModal;
