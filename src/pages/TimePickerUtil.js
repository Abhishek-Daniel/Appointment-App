import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function TimePickerUtil(props) {
  React.useEffect(() => {}, [props.value]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={props.label}
        value={props.value}
        onChange={(newValue) => {
          props.setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
