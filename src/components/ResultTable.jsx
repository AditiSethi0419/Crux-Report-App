// src/components/ResultTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

export default function ResultTable({ rows }) {
  const columns = [
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'fcp', headerName: 'FCP (ms)', flex: 1 },
    { field: 'lcp', headerName: 'LCP (ms)', flex: 1 },
    { field: 'cls', headerName: 'CLS', flex: 1 },
    { field: 'inp', headerName: 'INP (ms)', flex: 1 },
  ];

  const avg = (key) =>
    (rows.reduce((acc, r) => acc + (r[key] || 0), 0) / rows.length).toFixed(2);
  const sum = (key) =>
    rows.reduce((acc, r) => acc + (r[key] || 0), 0).toFixed(2);

  return (
    <>
      <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Summary:</Typography>
        <Typography>Avg LCP: {avg('lcp')} ms | Sum LCP: {sum('lcp')} ms</Typography>
        <Typography>Avg FCP: {avg('fcp')} ms | Sum FCP: {sum('fcp')} ms</Typography>
      </Box>
    </>
  );
}
