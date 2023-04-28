import React, { useEffect } from "react";
import Router from "./Router";
import { notification } from 'antd'
import "./components/@vuexy/rippleButton/RippleButton";
import "antd/es/spin/style/css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "prismjs/themes/prism-tomorrow.css";
import "antd/dist/antd.css";
import "./globle.scss";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { SOCKET_CONNECTER_IO } from "./redux/actions/socket.io";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
const App = (props) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    SOCKET_CONNECTER_IO().on("newEmail", (data) => {
      console.log("data is", data);
      if(data){
        api.info({
          message: `${data?.reqName} sent a message`,
          description:
            data?.message,
          placement: 'bottomRight',
        });  
      }
      else{
        api.info({
          message: `New message arrived`,
          description:
            "Customer sent a new message",
          placement: 'bottomRight',
        });  
      }
    })
  })
  return (
    <>
      {contextHolder}
      <Router />;
    </>
    
  )
};
export default App;
