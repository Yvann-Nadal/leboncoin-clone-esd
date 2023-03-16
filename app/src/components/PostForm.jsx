import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import PostService from "../services/post.service";

const PostForm = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [credentials, setCredentials] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4z19Ujnn3veXS-coXR4XaTmEovmwdP8w&libraries=places";
    script.onload = () => {
      const address = document.getElementById("address");
      const newAutocomplete = new window.google.maps.places.Autocomplete(address);
      setAutocomplete(newAutocomplete);
    };
    document.body.appendChild(script);
  }, []);

  const handlePlaceChange = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const countryComponent = place.address_components.find(component =>
        component.types.includes("country")
      );
      const postalCodeComponent = place.address_components.find(component =>
        component.types.includes("postal_code")
      );
      setCredentials({
        ...credentials,
        formatted_address: place.formatted_address,
        city: place.name,
        country: countryComponent ? countryComponent.long_name : "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        postal_code: postalCodeComponent ? postalCodeComponent.long_name : ""
      });
    }
    console.log("place change", credentials);
  };

  const createPost = async formData => {
    await PostService.create(formData);
  };

  const onDrop = useCallback(
    acceptedFiles => {
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
    console.log("submit credentials", credentials);
    if (credentials.uploadFiles) {
      credentials.uploadFiles.forEach(file => {
        formData.append("photos", file);
      });
    }
    formData.append("formatted_address", credentials.formatted_address);
    formData.append("city", credentials.city);
    formData.append("country", credentials.country);
    formData.append("lat", credentials.lat);
    formData.append("lng", credentials.lng);
    formData.append("postal_code", credentials.postal_code);
    createPost(formData);
    navigate("/");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ".MuiInputBase-root, .MuiButton-root": {
            mb: 2
          }
        }}>
        <TextField
          type="text"
          id="address"
          name="location"
          onChange={handlePlaceChange}></TextField>
      </Box>
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
