// src/components/URLInput.jsx
import { TextField, Button } from '@mui/material';

export default function URLInput({ urls, setUrls, onSearch }) {
  return (
    <>
      <TextField
        label="Enter URLs (one per line)"
        multiline
        fullWidth
        minRows={4}
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={onSearch}>Search</Button>
    </>
  );
}
