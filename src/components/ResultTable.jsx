import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function ResultTable({ rows }) {
  const renderCell = (params) =>
    params.value != null ? params.value : 'N/A';

  const columns = [
    { field: 'url', headerName: 'URL', flex: 1 },
    { field: 'fcp', headerName: 'FCP (ms)', flex: 1, renderCell },
    { field: 'lcp', headerName: 'LCP (ms)', flex: 1, renderCell },
    { field: 'cls', headerName: 'CLS', flex: 1, renderCell },
    { field: 'inp', headerName: 'INP (ms)', flex: 1, renderCell },
  ];

  const thresholds = {
    lcp: 2500,
    fcp: 1800,
    inp: 200,
    cls: 0.1,
  };

  const validRows = rows;

  const getRowClassName = (params) => {
    const { lcp, fcp, cls, inp } = params.row;
    if (
      (lcp && lcp > thresholds.lcp) ||
      (fcp && fcp > thresholds.fcp) ||
      (cls && cls > thresholds.cls) ||
      (inp && inp > thresholds.inp)
    ) {
      return 'poor-performance';
    }
    return '';
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={validRows}  
          columns={columns}
          disableRowSelectionOnClick
          getRowClassName={getRowClassName}
          sx={{
            '& .poor-performance': {
              bgcolor: 'rgba(255, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 0, 0, 0.2)',
              },
            },
          }}
        />
      </Box>
    </>
  );
}
