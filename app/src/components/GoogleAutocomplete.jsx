import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const GoogleAutocomplete = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [credentials, setCredentials] = useState({});

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
    console.log("autocomplete", autocomplete);
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = {
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id
        // Ajoutez d'autres détails que vous souhaitez récupérer ici
      };
      console.log("place", location);
      setCredentials({ ...credentials, autocomplete: location });

      console.log("credentials", credentials);
    }
  };

  return (
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
        name="autocomplete"
        onChange={handlePlaceChange}></TextField>
    </Box>
  );
};

export default GoogleAutocomplete;
