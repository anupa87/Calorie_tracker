// Import modules
import { FetchWrapper } from "./fetch-wrapper.js";
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import chart from "chart.js/auto";

// selectors
const form = document.querySelector("#form");
const foodName = document.querySelector("#foodName").value;
const carbs = document.querySelector("#carbs").value;
const protein = document.querySelector("#protein").value;
const fat = document.querySelector("#fat").value;
const addBtn = document.querySelector("#addBtn");
const cards = document.querySelector(".cards");

// fetch API
const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

// Add Inputs
const addInputs = (event) => {
  event.preventDefault();

  const foodName = document.querySelector("#foodName").value;
  const carbs = document.querySelector("#carbs").value;
  const protein = document.querySelector("#protein").value;
  const fat = document.querySelector("#fat").value;

  if (foodName !== "Please select") {
    postInput(foodName, carbs, protein, fat);
    createChart(carbs, protein, fat);
    totalCalorieLog();
    renderCard();
    snackbar.show("Food added successfully");
  } else {
    snackbar.show("Please check your inputs");
  }
};

// Post data to API
const postInput = (foodName, carbs, protein, fat) => {
  console.log(foodName, carbs, protein, fat);
  const body = {
    fields: {
      foodName: {
        stringValue: foodName,
      },
      carbs: {
        integerValue: carbs,
      },
      protein: {
        integerValue: protein,
      },
      fat: {
        integerValue: fat,
      },
    },
  };
  API.post("anupa88", body);
};

// Get data
API.get("anupa88").then((data) => {
  let foodData = data.documents;
  let fields = foodData.map((element) => element.fields);
  fields.forEach((element) => {
    "fat " + element.fat.integerValue;
    "protein " + element.protein.integerValue;
    "carbs " + element.carbs.integerValue;
    "foodName " + element.foodName.stringValue;
  });
});

// Create chart
let ctx = document.querySelector("#myChart").getContext("2d");
let chart;
const createChart = (carbs, protein, fat) => {
  chart = new chart(ctx, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Intake in gram",
          data: [carbs, protein, fat],
          backgroundColor: ["orange", "orange", "orange"],
          borderColor: ["white", "white", "white"],
          borderWidth: 1,
        },
      ],
    },
  });
};
// myChart.innerHTML = chart;

// Show calorie log
const totalCalorieLogValue = document.querySelector(".calorieTotal");
let carbsCalorie = carbs * 4;
let proteinCalorie = protein * 4;
let fatCalorie = fat * 9;
let totalCalorie = carbs * 4 + protein * 4 + fatCalorie * 9;
console.log(carbsCalorie, proteinCalorie, fatCalorie, totalCalorie);

// logTotalCalorie();

// Show cards
// renderCard();

// API.get("anupa88").then((data) => fetchCards(data.documents));

// event listener
form.addEventListener("submit", addInputs);
