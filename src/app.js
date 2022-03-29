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

  if (foodName !== "Please select" && carbs && protein & fat) {
    postInput(foodName, carbs, protein, fat);
    snackbar.show("Food added successfully");
    createChart(carbs, protein, fat);
    totalCalorieLogValue.innerText = totalCalorieLog(carbs, protein, fat);
  } else {
    snackbar.show("Please check your inputs");
  }
};

// Post data to API
const postInput = (foodName, carbs, protein, fat) => {
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
let chart;
let ctx = document.querySelector("#myChart").getContext("2d");
const createChart = (carbs, protein, fat) => {
  if (chart) {
    chart.destroy();
  }
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

const totalCalorieLogValue = document.querySelector(".calorieTotal");

// Show calorie log
const totalCalorieLog = (carbs, protein, fat) => {
  let totalCalorie = carbs * 4 + protein * 4 + fat * 9;
  return totalCalorie;
};

// Show cards
const renderCard = () => {
  const fieldsArray = API.get("anupa88").then((data) => {
    return data.documents.map((d) => d.fields);
  });
  fieldsArray.then((data) => {
    data.forEach((item) => {
      let cardDiv = document.createElement("div");
      cardDiv.className = "card";
      let cardBody = document.createElement("div");
      cardBody.classnName = "card-body";
      let cardTitle = document.createElement("h2");
      cardTitle.className = "card-title";
      cardTitle.innerHTML = item.foodName.stringValue;
      let cardSubtitle = document.createElement("h3");
      cardSubtitle.className = "card-subtitle";
      cardSubtitle.innerHTML =
        totalCalorieLog(
          item.carbs.integerValue,
          item.protein.integerValue,
          item.fat.integerValue
        ) + " calorie";

      let ul = document.createElement("ul");
      let li = document.createElement("li");
      let carbsLi = document.createElement("li");
      carbsLi.className = "carbs";
      carbsLi.innerText = "carbs";
      let carbsAmount = document.createElement("p");
      carbsAmount.className = "carbsAmount";
      carbsAmount.innerText = item.carbs.integerValue;
      let proteinLi = document.createElement("li");
      proteinLi.className = "protein";
      proteinLi.innerText = "protein";
      let proteinAmount = document.createElement("p");
      proteinAmount.className = "proteinAmount";
      proteinAmount.innerText = item.protein.integerValue;
      let fatLi = document.createElement("li");
      fatLi.className = "fat";
      fatLi.innerText = "fat";
      let fatAmount = document.createElement("p");
      fatAmount.className = "fatAmount";
      fatAmount.innerText = item.fat.integerValue;
      cards.appendChild(cardDiv);
      cardDiv.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardSubtitle);
      cardBody.appendChild(ul);
      ul.appendChild(li);
      li.appendChild(carbsLi);
      carbsLi.appendChild(carbsAmount);
      li.appendChild(proteinLi);
      li.appendChild(proteinAmount);
      li.appendChild(fatLi);
      li.appendChild(fatAmount);
    });
  });
};
renderCard();
// event listener
form.addEventListener("submit", addInputs);
