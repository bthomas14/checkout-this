/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react';
import React, {useEffect, useState} from 'react';
import {Bar, BarChart, LabelList, Tooltip, XAxis, YAxis} from 'recharts';

import {Review} from '../types';

const CustomTooltip: React.FunctionComponent<any> = (props) => {
  const {active, payload, label} = props;
  if (active && payload && payload.length) {
    return (
      <div css={{backgroundColor: '#fff', borderRadius: '3px', border: '1px solid #ccc', padding: '4px 8px'}}>
        <p css={{fontSize: '12px'}}>
          {label} stars represents {payload[0].value}% of ratings
        </p>
      </div>
    );
  }

  return null;
};

const ReviewChart: React.FunctionComponent<{reviews: Review[]}> = ({reviews}) => {
  const [chartData, setChartData] = useState<Array<{rating: number; reviewCount: number; percentOfTotal: number}>>([]);

  useEffect(() => {
    const barChartMap: Map<number, number> = new Map();
    barChartMap.set(1, 0);
    barChartMap.set(2, 0);
    barChartMap.set(3, 0);
    barChartMap.set(4, 0);
    barChartMap.set(5, 0);

    reviews.forEach((review) => {
      let tmp = barChartMap.get(review.rating) ?? 0;
      tmp += 1;
      barChartMap.set(review.rating, tmp);
    });

    const data = Array.from(barChartMap.entries()).map((entry) => {
      return {
        rating: Number(entry[0]),
        reviewCount: entry[1],
        percentOfTotal: Math.round((entry[1] / reviews.length) * 100),
      };
    });
    setChartData(data);
  }, [reviews]);

  const totalRating = (reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <div css={{border: '1px solid #cecfd9', borderRadius: '4px', padding: '20px'}}>
      <div css={{marginBottom: '20px', textAlign: 'center'}}>
        <div css={{fontWeight: '600', marginBottom: '5px'}} data-testid="avg-rating">
          {totalRating} stars out of 5
        </div>
        <div data-testid="rating-count">{reviews.length} reviews</div>
      </div>
      <BarChart
        data={chartData}
        layout="vertical"
        width={400}
        height={200}
        barGap={2}
        margin={{top: 10, right: 10, left: 10, bottom: 10}}
        data-testid="review-chart"
      >
        <XAxis dataKey="percentOfTotal" type="number" axisLine={false} hide={true} interval={0} height={30} />
        <YAxis
          dataKey="rating"
          type="number"
          domain={[1, 5]}
          axisLine={false}
          reversed={true}
          tickLine={false}
          interval={0}
          tickFormatter={(val) => `${val} star`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="percentOfTotal" fill="#2bd4db" barSize={20}>
          <LabelList dataKey="percentOfTotal" position="outside" formatter={(val: number) => `${val}%`} />
        </Bar>
      </BarChart>
    </div>
  );
};

export default ReviewChart;
