
import React, { useState } from 'react';


import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';
import BarChart from './BarChartComponent';
import AreaChart from './AreaChartComponent';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;