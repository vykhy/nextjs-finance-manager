import React, { useEffect, useMemo, useState } from "react";
import IMonthlyData from "@/interfaces/IMonthlyData";
import axios from "axios";
import { useProjectContext } from "@/context/ProjectContext";
import { Typography } from "@mui/material";
import Chart from "react-google-charts";

function MonthlyGraph() {
  const { selectedProject } = useProjectContext();
  const { monthlyData, isLoading, error } = useMonthlyData({
    projectId: selectedProject,
  });
  const chartData = useMemo(() => {
    return [
      ["Month", "Income", "Expenses", "Net Gain"],
      ...monthlyData.map((monthData) => [
        monthData.month,
        Number(monthData.inflow),
        Number(monthData.outflow),
        Number(monthData.inflow) - Number(monthData.outflow),
      ]),
    ];
  }, [monthlyData]);
  return (
    <Chart
      chartType="LineChart"
      columns={monthlyData.map((item) => item.month)}
      data={chartData}
      width="100%"
      height="500px"
      options={{
        title: "Monthly Summary",
        curveType: "function",
        legend: { position: "bottom" },
      }}
    ></Chart>
  );
}

export default MonthlyGraph;

type useMonthlyDataPropTypes = {
  projectId: number;
};

const useMonthlyData = ({ projectId }: useMonthlyDataPropTypes) => {
  const [monthlyData, setMonthlyData] = useState<Array<IMonthlyData>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMonthlyData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/project/${projectId}/monthlyData`
        );
        setMonthlyData(response.data.data);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (!projectId) return;
    getMonthlyData();
  }, [projectId]);

  const processedMonthlyData = useMemo(() => {
    return monthlyData?.map((item) => {
      const month = getMonthName(Number(item.month.split("-")[1]));
      const monthStr = `${month} ${item.month.split("-")[0]}`;
      return { ...item, month: monthStr };
    });
  }, [monthlyData]);

  return { monthlyData: processedMonthlyData, error, isLoading };
};

function getMonthName(monthNumber: number): string {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "short" });
}
