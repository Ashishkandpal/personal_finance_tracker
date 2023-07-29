import React from "react";
import { Line, Pie } from "@ant-design/charts";

const ChartComponent = ({ sortedTransactions }) => {
  console.log(sortedTransactions);
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 500,
    autoFit: true,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };

  const spendingConfig = {
    data: Object.values(finalSpending),
    width: 500,
    autoFit: true,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
      <div className="line-chart">
        <h1>Your Analytics</h1>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="pie-chart">
        <h1>Your Spendings</h1>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
