
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-md border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p 
            key={`item-${index}`}
            className="text-sm" 
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const Chart = ({ type, data, height = 300, config = {} }) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {data.datasets && data.datasets.map((dataset, index) => (
                <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {data.datasets && data.datasets.map((dataset, index) => (
              <Area 
                key={index}
                type="monotone" 
                dataKey="value" 
                data={dataset.data.map((value, i) => ({ name: data.labels[i], value }))}
                name={dataset.name}
                stroke={COLORS[index % COLORS.length]} 
                fillOpacity={1} 
                fill={`url(#color${index})`} 
              />
            ))}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data.labels.map((label, i) => ({ 
            name: label,
            ...data.datasets.reduce((acc, dataset, j) => ({ 
              ...acc, 
              [dataset.name]: dataset.data[i] 
            }), {})
          }))} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {data.datasets && data.datasets.map((dataset, index) => (
              <Bar 
                key={index}
                dataKey={dataset.name} 
                fill={COLORS[index % COLORS.length]} 
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            ))}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={data.labels.map((label, i) => ({ 
            name: label,
            ...data.datasets.reduce((acc, dataset, j) => ({ 
              ...acc, 
              [dataset.name]: dataset.data[i] 
            }), {})
          }))} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {data.datasets && data.datasets.map((dataset, index) => (
              <Line 
                key={index}
                type="monotone" 
                dataKey={dataset.name} 
                stroke={COLORS[index % COLORS.length]} 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );
        
      case 'pie':
        const pieData = data.labels.map((label, i) => ({ 
          name: label,
          value: data.datasets[0].data[i]
        }));
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        );
        
      case 'radar':
        const radarData = data.labels.map((label, i) => ({ 
          subject: label,
          A: data.datasets[0].data[i],
          fullMark: 100
        }));
        
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid className="stroke-gray-200 dark:stroke-gray-700" />
            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
            <PolarRadiusAxis stroke="#94a3b8" />
            <Radar name={data.datasets[0].name} dataKey="A" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </RadarChart>
        );
        
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
