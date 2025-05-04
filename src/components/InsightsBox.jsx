import { Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#4caf50', '#f44336', '#9e9e9e'];

export default function InsightsBox({ data }) {
  const total = data.length;
  const withData = data.filter(d => d.hasData).length;
  const withoutData = total - withData;

  const passThresholds = {
    lcp: 2500,
    fcp: 1800,
    inp: 200,
    cls: 0.1,
  };

  const passed = data.filter(d => {
    return (
      d.hasData &&
      d.lcp <= passThresholds.lcp &&
      d.fcp <= passThresholds.fcp &&
      d.inp <= passThresholds.inp &&
      d.cls <= passThresholds.cls
    );
  }).length;

  const failed = withData - passed;

  const chartData = [
    { name: 'Passed', value: passed },
    { name: 'Failed', value: failed },
    { name: 'No Data', value: withoutData }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </Box>
  );
}
