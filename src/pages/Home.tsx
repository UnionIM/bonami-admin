import React from "react";
import BonamiController from "../controllers/BonamiController";
import useFetchData from "../hooks/useFetchData";
import {
  Box,
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

Chart.register(CategoryScale, BarElement, LinearScale, Tooltip, ArcElement);

const Home = () => {
  const { data: stat } = useFetchData(BonamiController.getStatistics, [], []);
  const { data: graph } = useFetchData(BonamiController.getGraphData, [], []);

  const findMostOrderedCategory = (orderedItems: IOrderedCategory[]) => {
    let mostOrderedCategory: IOrderedCategory = orderedItems[0];
    orderedItems.forEach((el) => {
      if (el.orderedItems > mostOrderedCategory.orderedItems) {
        mostOrderedCategory = el;
      }
    });
    return mostOrderedCategory;
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

  const labels = graph?.map((el) => {
    const date = new Date(el.date);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      1 + date.getMonth() < 10
        ? "0" + (1 + date.getMonth())
        : 1 + date.getMonth();
    return day + "-" + month + "-" + date.getFullYear();
  });
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: graph?.map((el) => el.amount),
        backgroundColor: colorful.blue,
      },
    ],
  };

  return (
    <Box p={"32px"} display={"flex"}>
      <Grid container flex={1}>
        <Card sx={{ height: "100%" }}>
          {stat ? (
            <>
              <Typography fontSize={"20px"}>Category statistic</Typography>
              <Typography mt={"21px"}>
                Total categories: {stat.amountOfCategories}
              </Typography>
              <Typography mt={"15px"}>
                Most ordered category:{" "}
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
            <CircularProgress />
          )}
        </Card>
        <Card sx={{ marginLeft: "32px" }}>
          {stat ? (
            <>
              <Typography fontSize={"20px"}>Order statistic</Typography>
              <Typography textAlign={"center"}>
                Total orders:{" "}
                {stat.orderStatistic.amountOfCanceledOrders +
                  stat.orderStatistic.amountOfDeliveredOrders +
                  stat.orderStatistic.amountOfPendingOrders}
              </Typography>
              <Grid container flexDirection={"column"}>
                <Grid container gap={"10px"}>
                  <Grid
                    container
                    sx={{ width: "unset" }}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    <GraphColorIcon color={colorful.green} />
                    <Typography sx={{ lineHeight: "unset" }}>
                      Delivered: {stat.orderStatistic.amountOfDeliveredOrders}
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
                      Pending: {stat.orderStatistic.amountOfPendingOrders}
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
                    Canceled: {stat.orderStatistic.amountOfCanceledOrders}
                  </Typography>
                </Grid>
              </Grid>
              <Doughnut data={doughnutData} />
              <Typography>Total profit of delivered orders:</Typography>
              <Typography
                color={colorful.green}
                fontSize={"64px"}
                textAlign={"center"}
              >
                {stat.orderStatistic.profitOfDeliveredOrders} ₴
              </Typography>
              <Typography>Total profit of pending orders:</Typography>
              <Typography
                color={colorful.yellow}
                fontSize={"64px"}
                textAlign={"center"}
              >
                {stat.orderStatistic.profitOfPendingOrders} ₴
              </Typography>
            </>
          ) : (
            <CircularProgress />
          )}
        </Card>
        <Card sx={{ ml: "32px" }}>
          {graph ? (
            <>
              <Typography>Orders graph</Typography>
              <Bar data={barChartData} />
            </>
          ) : (
            <CircularProgress />
          )}
        </Card>
      </Grid>
    </Box>
  );
};

export default Home;
