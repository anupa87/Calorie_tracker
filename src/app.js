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
// add form

const addInputs = (foodName, carbs, protein, fat) => {
  // event.preventDefault();
  console.log(foodName, carbs, protein, fat);
  if (foodName !== "Please select") {
    postInput(foodName, carbs, protein, fat);
    snackbar.show("Food added successfully");
  } else {
    snackbar.show("Please enter your inputs");
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
API.get("anupa88").then((data) => {
  let dataF = data.documents;
  let fields = dataF.map((element) => element.fields);
  fields.forEach((element) => {
    console.log("fat " + element.fat.integerValue);
    console.log("protein " + element.protein.integerValue);
    console.log("carbs " + element.carbs.integerValue);
    console.log("foodName " + element.foodName.stringValue);
  });

  console.log(fields);
});
// snackbar

// calculate calorie
const carbsCalorie = carbs * 4;
const proteinCalorie = protein * 4;
const fatCalorie = fat * 9;

// createChartCanvas(carbsCalorie, proteinCalorie, fatCalorie);
const createChart = (carbs, protein, fat) => {
  let myChart = document.querySelector("#myChart").getContext("2d");
  myChart = newChart(ctx, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "# Percentage",
          data: [carbs, protein, fat],
          backgroundColor: ["Blue", "Blue", "Blue"],
          borderColor: ["white", "white", "white"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// logTotalCalorie();
// renderCard();
// API.get("anupa88").then((data) => fetchCards(data.documents));
// posting data to firebase API

// event listener
form.addEventListener("submit", addInputs(foodName, carbs, protein, fat));
