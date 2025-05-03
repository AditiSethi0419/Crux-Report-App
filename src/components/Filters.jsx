// src/components/Filters.jsx
import { TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';

export default function Filters({ onFilter, onReset }) {
  const [threshold, setThreshold] = useState('');

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      <TextField
        label="LCP > Threshold (ms)"
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
      />
      <Button
        variant="outlined"
        onClick={() => onFilter('lcp', (val) => val > Number(threshold))}
      >
        Apply Filter
      </Button>
      <Button variant="text" onClick={onReset}>Reset</Button>
    </Stack>
  );
}
