import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import PostService from "../services/post.service";
import GoogleAutocomplete from "./GoogleAutocomplete";

const PostForm = () => {
  const [credentials, setCredentials] = useState({});

  const createPost = async formData => {
    await PostService.create(formData);
  };

  const onDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      console.log("credentials :", credentials);
      setCredentials({ ...credentials, uploadFiles: acceptedFiles });
    },
    [credentials]
  );

  useEffect(() => {
    if (credentials) console.log(credentials);
  }, [credentials]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", credentials.title);
    formData.append("content", credentials.content);
    console.log(credentials);

    credentials.uploadFiles.forEach(file => {
      formData.append("photos", file);
    });
    formData.append("autocomplete[formatted_address]", credentials.autocomplete.formatted_address);
    console.log("credentials :", credentials);
    console.log("formData : ", formData.get("photos"));
    createPost(formData);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root, .MuiButton-root": {
          mb: 2
        }
      }}
      onSubmit={handleSubmit}>
      <TextField label="Title" name="title" variant="outlined" onChange={handleChange} />
      <TextField
        label="Content"
        name="content"
        variant="outlined"
        multiline
        rows={4}
        onChange={handleChange}
      />
      <GoogleAutocomplete />
      <Box
        {...getRootProps()}
        sx={{
          backgroundColor: "#f0f0f0",
          border: "2px dashed #ccc",
          borderRadius: 5,
          mb: 2,
          p: 5,
          textAlign: "center",
          cursor: "pointer"
        }}
        name="photos">
        <input {...getInputProps()} />
        <Typography variant="body1">
          Déposez vos fichiers ici, ou cliquez pour les sélectionner
        </Typography>
        <ul>{files}</ul>
      </Box>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default PostForm;
