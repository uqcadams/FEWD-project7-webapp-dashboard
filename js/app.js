/* #region  ALERTS */
const notificationBell = document.getElementById("notification-bell");
const alertBanner = document.getElementById("alerts");

notificationBell.addEventListener("click", () => {
  if (alertBanner.style.display !== "none") {
    alertBanner.innerHTML = 
      `
      <div class="alert-banner">
        <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
        <p class="alert-banner-close">X</p>
      </div>
      `;
  }
  alertBanner.style.display = "block";
});

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alerts.style.display = "none";
  }
});
/* #endregion */

/* #region  CHART.JS STYLING */
let trafficChart = document.getElementById("trafficChart").getContext("2d");
let trafficDailyChart = document
  .getElementById("trafficDailyChart")
  .getContext("2d");
let mobileUsersChart = document
  .getElementById("mobileUsersChart")
  .getContext("2d");

Chart.defaults.font.family = "Lato";
Chart.defaults.font.size = 18;
Chart.defaults.font.color = "#000";

let trafficChartCanvas = new Chart(trafficChart, {
  type: "line",
  data: {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31",
    ],
    datasets: [
      {
        label: "Traffic",
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: "rgba(116, 119, 191, .3)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    // plugins: {
    //   title: {
    //     display: true,
    //     text: "Traffic Overview",
    //   },
    // },
  },
});

let trafficDailyChartCanvas = new Chart(trafficDailyChart, {
  type: "bar",
  data: {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31",
    ],
    datasets: [
      {
        label: "Traffic",
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: "rgba(116, 119, 191, .3)",
        borderWidth: 1,
      },
    ],
  },
  options: {},
});

let mobileUsersChartCanvas = new Chart(mobileUsersChart, {
  type: "bar",
  data: {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31",
    ],
    datasets: [
      {
        label: "Traffic",
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
        hoverBackgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    ],
  },
  options: {},
});

/* #endregion */

/* #region  MESSAGE USER */
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener("click", () => {
  if (user.value === "" && message.value === "") {
    alert("Please fill out the user and message fields before sending!");
  } else if (user.value === "") {
    alert("Please fill out a user name!");
  } else if (message.value === "") {
    alert("Please fill out the message box!");
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});
/* #endregion */
