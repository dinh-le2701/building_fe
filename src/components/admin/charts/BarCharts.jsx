/* eslint-disable no-unused-vars */
import React, { PureComponent, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Thông tin tổng',
      uv: 1,
      pv: 6,
      amt: 3,
      b: 2,
      d: 2
    }
  ];

  const hi = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [apartments, setApartments] = useState([]);
  }

export default class Example extends PureComponent {

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <Bar dataKey="amt" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="b" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <Bar dataKey="d" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

            </BarChart>
        );
    }
}
