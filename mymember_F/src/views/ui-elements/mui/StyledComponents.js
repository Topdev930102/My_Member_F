

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#f8f8f8",
  borderRadius: "2px",
  "& .css-vlt2i1-MuiFormLabel-root-MuiInputLabel-root": {
    fontSize: "1.3em",
    fontWeight: "500",
    backgroundColor: "#fff",
  },
  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
    height: "0.7em",
    padding: "16.5px 2px",
  },
  "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
    padding: "2px",
  },
  "& .css-1laqsz7-MuiInputAdornment-root": {
    marginLeft: "0px",
  },
}));