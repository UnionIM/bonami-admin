import React, { useEffect, useState } from "react";
import BonamiController from "../controllers/BonamiController";
import useFetchData from "../hooks/useFetchData";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { IOrderedCategory } from "../models/bonami-server-response";
import { colorful, gray } from "../design/colors";
import GraphColorIcon from "../components/UI/GraphColorIcon";
import {
  Chart,
  ArcElement,
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import RangeDatePicker from "../components/UI/Inputs/RangeDatePicker";
import { Dayjs } from "dayjs";
import { IAlertState } from "../models/bonami-client";
import MyAlert from "../components/UI/MyAlert";

Chart.register(CategoryScale, BarElement, LinearScale, Tooltip, ArcElement);

const Home = () => {
  const [dateStart, setDateStart] = useState<Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
  const [recalculateLoading, setRecalculateLoading] = useState<boolean>(false);

  const [openSnackBar, setOpenSnackBar] = useState<IAlertState>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const [graphData, setGraphData] = useState<{
    labels: string[];
    data: number[];
  } | null>(null);

  const { data: stat } = useFetchData(BonamiController.getStatistics, [], []);
  const { data: graph } = useFetchData(BonamiController.getGraphData, [], []);

  useEffect(() => {
    if (graph) {
      const epochStart = new Date(dateStart?.toString() || "").valueOf();
      const epochEnd = new Date(dateEnd?.toString() || "").valueOf();
      const filteredData = graph.filter((el) => {
        return !(el.date < epochStart || el.date > epochEnd);
      });
      setGraphData({
        labels: filteredData?.map((el) => {
          const date = new Date(el.date);
          const day =
            date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          const month =
            1 + date.getMonth() < 10
              ? "0" + (1 + date.getMonth())
              : 1 + date.getMonth();
          return day + "-" + month + "-" + date.getFullYear();
        }),
        data: filteredData?.map((el) => el.amount),
      });
    }
  }, [graph, dateEnd, dateStart]);

  const findMostOrderedCategory = (orderedItems: IOrderedCategory[]) => {
    let mostOrderedCategory: IOrderedCategory = orderedItems[0];
    orderedItems.forEach((el) => {
      if (el.orderedItems > mostOrderedCategory.orderedItems) {
        mostOrderedCategory = el;
      }
    });
    return mostOrderedCategory;
  };

  const recalculateHandler = () => {
    setRecalculateLoading(true);
    BonamiController.recalculateProfit()
      .then((res) => setRecalculateLoading(false))
      .catch((e) =>
        setOpenSnackBar({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        })
      );
  };

  const doughnutData = {
    responsive: false,
    labels: ["Delivered", "Pending", "Canceled"],
    datasets: [
      {
        label: "Amount",
        data: [
          stat?.orderStatistic.amountOfDeliveredOrders,
          stat?.orderStatistic.amountOfPendingOrders,
          stat?.orderStatistic.amountOfCanceledOrders,
        ],
        backgroundColor: [colorful.green, colorful.yellow, colorful.red],
      },
    ],
  };

  const barChartData = {
    labels: graphData?.labels,
    datasets: [
      {
        label: "Кількість",
        data: graphData?.data,
        backgroundColor: colorful.blue,
      },
    ],
  };
  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        max: Math.max.apply(null, graphData?.data ? graphData?.data : [0]) + 2,
      },
    },
  };

  return (
    <Box p={"32px"} display={"flex"}>
      <Grid container flex={1} justifyContent={"center"}>
        <Card sx={{ height: "100%", width: "350px" }}>
          {stat ? (
            <>
              <Typography fontSize={"20px"}>Статистика категорій</Typography>
              <Typography mt={"21px"}>
                Усього категорій: {stat.amountOfCategories}
              </Typography>
              <Typography mt={"15px"}>
                Найбільш замовлена категорія :{" "}
                {
                  findMostOrderedCategory(stat.orderedCategories).categoryName
                    .ua
                }
              </Typography>
              <Divider sx={{ borderColor: gray.default, m: "15px 0" }} />
              {stat.orderedCategories.map((el) => (
                <Grid
                  container
                  justifyContent={"space-between"}
                  sx={{
                    width: "unset",
                  }}
                  key={el.categoryName.en}
                >
                  <Typography>{el.categoryName.ua}</Typography>
                  <Typography>{el.orderedItems}</Typography>
                </Grid>
              ))}
            </>
          ) : (
            <CircularProgress sx={{ m: "320px 140px" }} />
          )}
        </Card>
        <Card sx={{ marginLeft: "32px" }}>
          {stat ? (
            <>
              <Typography fontSize={"20px"}>Статистика замовлень</Typography>
              <Typography textAlign={"center"}>
                Усього замовлень:{" "}
                {stat.orderStatistic.amountOfCanceledOrders +
                  stat.orderStatistic.amountOfDeliveredOrders +
                  stat.orderStatistic.amountOfPendingOrders}
              </Typography>
              <Grid container flexDirection={"column"}>
                <Grid container gap={"10px"} justifyContent={"center"}>
                  <Grid
                    container
                    sx={{ width: "unset" }}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    <GraphColorIcon color={colorful.green} />
                    <Typography sx={{ lineHeight: "unset" }}>
                      Доставлено: {stat.orderStatistic.amountOfDeliveredOrders}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    sx={{ width: "unset" }}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    <GraphColorIcon color={colorful.yellow} />
                    <Typography sx={{ lineHeight: "unset" }}>
                      В очікуванні: {stat.orderStatistic.amountOfPendingOrders}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{ width: "unset" }}
                  alignItems={"center"}
                  margin={"0 auto"}
                  gap={"5px"}
                >
                  <GraphColorIcon color={colorful.red} />
                  <Typography sx={{ lineHeight: "unset" }}>
                    Відмінено: {stat.orderStatistic.amountOfCanceledOrders}
                  </Typography>
                </Grid>
              </Grid>
              <Doughnut data={doughnutData} />
              <Typography>
                Загальний прибуток від доставлених замовлень:
              </Typography>
              <Typography
                color={colorful.green}
                fontSize={"64px"}
                textAlign={"center"}
              >
                {stat.orderStatistic.profitOfDeliveredOrders} ₴
              </Typography>
              <Typography>
                Загальний прибуток від замовлень в очікуванні:
              </Typography>
              <Typography
                color={colorful.yellow}
                fontSize={"64px"}
                textAlign={"center"}
              >
                {stat.orderStatistic.profitOfPendingOrders} ₴
              </Typography>
              <Grid container justifyContent={"center"}>
                <Button variant={"contained"} onClick={recalculateHandler}>
                  {recalculateLoading ? "ЗАЧЕКАЙТЕ..." : "ПЕРЕРАХУВАТИ"}
                </Button>
              </Grid>
            </>
          ) : (
            <CircularProgress sx={{ m: "320px 140px" }} />
          )}
        </Card>
        <Card sx={{ ml: "32px", width: "400px" }}>
          {graphData ? (
            <>
              <Typography mb={"20px"}>Графік заказів</Typography>
              <RangeDatePicker
                dateEnd={dateEnd}
                dateStart={dateStart}
                setDateEnd={setDateEnd}
                setDateStart={setDateStart}
                setOpenSnackBar={setOpenSnackBar}
                width={"100%"}
              />
              <br />
              <Box sx={{ height: "410px" }}>
                <Bar data={barChartData} options={barChartOptions} />
              </Box>
            </>
          ) : (
            <CircularProgress sx={{ m: "320px 140px" }} />
          )}
        </Card>
      </Grid>
      <MyAlert state={openSnackBar} setState={setOpenSnackBar} />
    </Box>
  );
};

export default Home;
