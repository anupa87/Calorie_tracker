import { FetchWrapper } from "./fetch-wrapper.js";
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import chart from "chart.js/auto";

// selectors
const form = document.querySelector("#form");
const foodName = document.querySelector("#foodName");
const carbs = document.querySelector("#carbs");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");
const addBtn = document.querySelector("#addBtn");
const chartCanvas = document.querySelector("#myChart");
const cards = document.querySelector(".cards");

// fetch API
const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);
// add form
const addInputs = (e) => {
  e.preventDefault();
  const foodNameInput = foodName.value;
  const carbsInput = carbs.value;
  const proteinInput = protein.value;
  const fatInput = fat.value;
  console.log(fatInput);

  if (foodNameInput !== "Please select" && carbs && protein && fat) {
    snackbar.show("Food added successfully");
  } else {
    snackbar.show("Please enter your inputs");
  }
  postInput(foodNameInput, carbsInput, proteinInput, fatInput);
};

// Post data to API
const postInput = (foodNameInput, carbsInput, proteinInput, fatInput) => {
  console.log(foodNameInput, carbsInput, proteinInput, fatInput);
  const body = {
    fields: {
      foodName: {
        stringValue: foodNameInput,
      },
      carbs: {
        integerValue: carbsInput,
      },
      protein: {
        integerValue: proteinInput,
      },
      fat: {
        integerValue: fatInput,
      },
    },
  };
  API.post("anupa88", body);
};
// calculate calorie and create myChart
const carbsCalorie = carbs * 4;
const proteinCalorie = protein * 4;
const fatCalorie = fat * 9;
createChartCanvas(carbsCalorie, proteinCalorie, fatCalorie);

logTotalCalorie();
renderCard();
// API.get("anupa88").then((data) => fetchCards(data.documents));
// posting data to firebase API

// event listener
form.addEventListener("submit", addInputs);
