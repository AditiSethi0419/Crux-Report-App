// src/hooks/useCruxData.js
import { useState } from 'react';
import { fetchMultiple } from '../utils/cruxApi';

export default function useCruxData() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCruxData = async (urls) => {
    setLoading(true);
    const responses = await fetchMultiple(urls);
    
    const formatted = responses.map(({ origin, data, error }) => {
      const metrics = data?.record?.metrics || {};
      const get = (name) => metrics[name]?.percentiles?.p75 ?? null;
    
      return {
        id: origin,
        url: origin,
        fcp: get("first_contentful_paint"),
        lcp: get("largest_contentful_paint"),
        cls: get("cumulative_layout_shift"),
        inp: get("interaction_to_next_paint"),
        hasData: !!Object.keys(metrics).length && !error,
      };
    });
    

    setData(formatted);
    setFiltered(formatted);
    setLoading(false);
  };

  const filterData = (key, conditionFn) => {
    setFiltered(data.filter(row => conditionFn(row[key])));
  };

  const resetFilters = () => setFiltered(data);

  return { data: filtered, loadCruxData, filterData, resetFilters, loading };
}
