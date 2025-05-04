// src/App.jsx
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import useCruxData from './hooks/useCruxData';
import URLInput from './components/URLInput';
import Filters from './components/Filters';
import ResultTable from './components/ResultTable';
import InsightsBox from './components/InsightsBox'; // ✅ Added import for InsightsBox

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

  const invalidUrls = data.filter((d) => !d.hasData);

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
          {/* ✅ Moved this section just below the table */}
          {invalidUrls.length > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              No CrUX data found for: {invalidUrls.map(d => d.url).join(', ')}
            </Alert>
          )}
          <InsightsBox data={data} /> {/* ✅ Added InsightsBox component */}
        </>
      )}
    </Container>
  );
}

export default App;
