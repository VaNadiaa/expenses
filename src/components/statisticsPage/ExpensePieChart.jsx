import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const colors = [
  "#00d6fa",
  "#66a7ff",
  "#ab94fa",
  "#dd8cf7",
  "#ff84b8",
  "#ff6f61",
  "#ff8a65",
  "#ffb74d",
  "#ffca28",
  "#4caf50",
  "#ff5722",
  "#3f51b5",
  "#9c27b0",
  "#ffc107",
  "#03a9f4",
  "#8bc34a",
  "#e91e63",
  "#673ab7",
  "#ff9800",
  "#cddc39",
  "#9e9e9e",
];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  value,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={18}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        tabIndex="-1"
        className="outline-none"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        tabIndex="-1"
        className="outline-none stroke-white"
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={18}
        fontWeight="bold"
      >{`${value} руб.`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export const ExpensePieChart = ({
  firstDate,
  getDateRange,
  showRange,
  secondDate,
}) => {
  const products = useSelector((state) => state.products);
  const [dataChart, setDataChart] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // массив объектов расходов по дате
    const getChart = products
      .map((product) => {
        const datesKey = Object.keys(product)[0];
        if (datesKey === firstDate) {
          return product[datesKey].map(({ category, price }) => ({
            name: category,
            value: +price,
          }));
        }
        return null;
      })
      .flat()
      .filter(Boolean);
    // массив объектов расходов по промежутку дат
    const getDataPeriodTime = () => {
      const dateRange = getDateRange();
      const dataArray = [];
      products.forEach((product) => {
        for (let date of dateRange) {
          if (Object.keys(product)[0] === date) {
            dataArray.push(product[date]);
          }
        }
      });
      const newDataArray = dataArray.flat();
      return newDataArray.map(({ category, price }) => ({
        name: category,
        value: +price,
      }));
    };

    const dataToCombine = showRange ? getDataPeriodTime() : getChart;

    // группировка категорий в одну
    const combinedData = (data) => {
      return data.reduce((acc, { name, value }) => {
        const existing = acc.find((item) => item.name === name);
        if (existing) {
          existing.value += value;
        } else {
          acc.push({ id: nanoid(6), name, value });
        }
        return acc;
      }, []);
    };
    const combined = combinedData(dataToCombine);
    setDataChart(combined);

    const sumValue = combined.reduce((sum, item) => sum + item.value, 0);
    setTotalValue(sumValue);
  }, [products, firstDate, secondDate, showRange]);

  const getStatisticsList = dataChart.map((dataProduct) => (
    <li
      key={dataProduct.id}
      className="flex justify-between text-lg sm:text-2xl border-b-2 mb-4 break-all"
    >
      <span className="mr-1">{dataProduct.name}</span>
      <span>{`${dataProduct.value.toFixed(2)} руб.`}</span>
    </li>
  ));

  return (
    <>
      <p className="col-span-3 text-xl sm:text-2xl font-normal mb-5">
        Всего потрачено: <span className="font-bold">{totalValue}</span> руб.
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 mb-10 h-full gap-5">
        <div className="hidden min-h-[400px] sm:min-w-[550px] sm:flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={dataChart}
                cx="50%"
                cy="50%"
                innerRadius={115}
                outerRadius={145}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(data, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(0)}
              >
                {dataChart.map((entry, index) => (
                  <Cell
                    className="outline-none stroke-white"
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="content-center">{getStatisticsList}</ul>
      </div>
    </>
  );
};
