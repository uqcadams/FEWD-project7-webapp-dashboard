// AUTHOR: Chris Adams
// DATE: 29/06/2021
// NOTES: JS is sectioned into six components with individual commentary within each.

/* #region  ALERTS */
// Establishes the base notification alert features displayed on the dashboard. When the notification bell is clicked, an alert is inserted into the innerHTML of the main dashboard. The unread notification icon is turned off, and a popup notification panel displays a number of messages for the user. Additional click events are added to close the alert and notification panel. 
const notificationBell = document.getElementById("notification-bell");
const alertBanner = document.getElementById("alerts");
const notificationIcon = document.getElementById("notifications-icon");
const notificationPanel = document.getElementById("overlay");
const notificationPanelClose = document.getElementById("close");

notificationBell.addEventListener("click", () => {
  if (alertBanner.style.display !== "none") {
    alertBanner.innerHTML = `
      <div class="alert-banner">
        <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
        <p class="alert-banner-close">X</p>
      </div>
      `;
  }
  alertBanner.style.display = "block";
  notificationIcon.style.backgroundColor = "transparent";
  notificationPanel.style.visibility = "visible";
});

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alerts.style.display = "none";
  }
});

notificationPanelClose.addEventListener("click", () => {
  notificationPanel.style.visibility = "hidden";
});

/* #endregion */
/* #region  SEARCH BAR */
// Simulates user search input within the field. An alert provides feedback to the user when the enter button is hit, informs them of what they're searching for, and then clears the text field.

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    alert(`Searching for ${searchBar.value}`);
    searchBar.value = "";
  }
});

// Learning Notes: Not sure why this one was so hard to figure out for me! I was navigating a lot of deprecated JS features, but finally figured it out. The biggest challenge was ultimately figuring out that user entries into the input field are values and not textContent. Whoosh!

/* #endregion */
/* #region  CHART.JS STYLING */
// Styles the charts within the main dashboard.
let trafficChart = document.getElementById("trafficChart").getContext("2d");
let trafficDailyChart = document.getElementById("trafficDailyChart").getContext("2d");
let mobileUsersChart = document.getElementById("mobileUsersChart").getContext("2d");

Chart.defaults.font.family = "Lato";
Chart.defaults.font.size = 18;
Chart.defaults.font.color = "#000";
Chart.defaults.plugins.legend.display = false;

/* #region  Chart Data */
// Establishes input data for charts
let hourlyLabel = ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
let hourlyData = [75, 125, 100, 200, 150, 175, 125, 185, 225, 150, 250, 75];

let dailyLabel = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
let dailyData = [1750, 250, 100, 2000, 1500, 1750, 1250];

let weeklyLabel = ["Week 1", "Week 2", "Week 3", "Week 4"];
let weeklyData = [9150, 6250, 8000, 7500];

let monthlyLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthlyData = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500, 1];

let mobileLabel = ["Desktop", "Tablet", "Phones"];
let mobileData = [2000, 550, 500];
/* #endregion */

/* #region  Option Variables */
// Establishes style options for charts
const mobileOptions = {
  aspectRatio: 2,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        boxWidth: 20,
        fontStyle: "bold",
      },
    },
  },
};
/* #endregion */

let trafficChartCanvas = new Chart(trafficChart, {
  type: "line",
  data: {
    labels: weeklyLabel,
    datasets: [
      {
        label: "Traffic",
        data: weeklyData,
        backgroundColor: "rgba(116, 119, 191, .3)",
        borderWidth: 1,
        fill: true,
        tension: 0.3,
        hoverBackgroundColor: "rgba(129, 201, 143, .6)",
      },
    ],
  },
});

let trafficDailyChartCanvas = new Chart(trafficDailyChart, {
  type: "bar",
  data: {
    labels: dailyLabel,
    datasets: [
      {
        label: "Traffic",
        data: dailyData,
        backgroundColor: "rgba(116, 119, 191, .3)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(129, 201, 143, .6)",
      },
    ],
  },
});

let mobileUsersChartCanvas = new Chart(mobileUsersChart, {
  type: "doughnut",
  data: {
    labels: mobileLabel,
    datasets: [
      {
        label: "# of Users",
        data: mobileData,
        backgroundColor: ["#7477BF", "#78CF82", "#51B6C8"],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#FFF",
        hoverBackgroundColor: "rgba(129, 201, 143, 1)",
      },
    ],
  },
  options: mobileOptions,
});

/* #endregion */
/* #region  TOGGLE CHARTS */
// Allows the user to customise the data sources displayed on the main traffic chart. Click events on the chart headings applies and removes an active state to provide user feedback as to which chart is currently showing.
let trafficToggles = document.querySelectorAll(".traffic-nav-link");

trafficToggles.forEach((element) => {
  element.addEventListener("click", (e) => {
    let activeOn = document.querySelectorAll(".active");
    
    activeOn.forEach((element) => {
      element.classList.remove("active");
    });

    element.className += " active";

    if (element.textContent == "Hourly") {
      trafficChartCanvas.data.datasets[0].data = hourlyData;
      trafficChartCanvas.data.labels = hourlyLabel;
    } else if (element.textContent == "Daily") {
      trafficChartCanvas.data.datasets[0].data = dailyData;
      trafficChartCanvas.data.labels = dailyLabel;
    } else if (element.textContent == "Weekly") {
      trafficChartCanvas.data.datasets[0].data = weeklyData;
      trafficChartCanvas.data.labels = weeklyLabel;
    } else if (element.textContent == "Monthly") {
      trafficChartCanvas.data.datasets[0].data = monthlyData;
      trafficChartCanvas.data.labels = monthlyLabel;
    }

    trafficChartCanvas.update();

  });
});
/* #endregion */
/* #region  MESSAGE USER */
// Input validation for user messaging system. Alerts the user when fields are missing, and passes the value of the user input field into a customised notifcation.
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
/* #region  SETTINGS / LOCAL STORAGE */
// Stores custom user settings in local storage when the save button is clicked. Settings are reset to default when the cancel button is clicked.

const emailNotifications = document.getElementById("emailNotifications");
const profilePublic = document.getElementById("profilePublic");
const timeZone = document.getElementById("timezone");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

// Save button click event. Stores settings in local storage.
save.addEventListener("click", () => {
  localStorage.setItem("emailNotifications", emailNotifications.checked);
  localStorage.setItem("publicProfile", profilePublic.checked);
  localStorage.setItem("timeZone", timeZone.value);
});

// Cancel button click event. Resets settings to default and clears local storage.
cancel.addEventListener("click", () => {
  emailNotifications.checked = false;
  profilePublic.checked = false;
  timeZone.value = "default";
  localStorage.clear();
});
/* #endregion */
