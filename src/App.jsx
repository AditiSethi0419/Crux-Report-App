// src/App.jsx
import { Container, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import useCruxData from './hooks/useCruxData';
import URLInput from './components/URLInput';
import Filters from './components/Filters';
import ResultTable from './components/ResultTable';

function App() {
  const [urls, setUrls] = useState('');
  const { data, loadCruxData, filterData, resetFilters, loading } = useCruxData();

  const handleSearch = () => {
    const lines = urls
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    loadCruxData(lines);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Chrome UX Report Viewer</Typography>
      <URLInput urls={urls} setUrls={setUrls} onSearch={handleSearch} />
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <>
          <Filters onFilter={filterData} onReset={resetFilters} />
          <ResultTable rows={data} />
        </>
      )}
    </Container>
  );
}

export default App;
