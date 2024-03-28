// JavaScript for progressive profile building

const promptmessage = document.getElementById("prompt-container");
const loadingmessage = document.getElementById("loading-message");

let currentStep = 0;
let currenttitle = 0;

const titles = [
  "Personal Information",
  "Volunteer Experience",
  "Environmental Awareness",
  "Preferences",
  "Other Activities"
];

const prompts = [
  // Personal Information
  { category: "full-name", prompt: "Enter your full name:" },
  { category: "email", prompt: "Enter your email address:" },
  { category: "age", prompt: "Enter your age:" },
  { category: "gender", prompt: "Enter your gender:" },

  // Volunteer Experience
  {
    category: "volunteer-details",
    prompt:
      "Have you volunteered for any environmental or marine conservation activities before? If yes, please provide details:",
  },
  {
    category: "skills-expertise",
    prompt:
      "What skills or expertise do you have that could contribute to marine conservation efforts? (e.g., research, advocacy, fundraising):",
  },

  // Environmental Awareness
  {
    category: "environmental-actions",
    prompt:
      "What actions do you currently take to reduce your environmental footprint? (e.g., recycling, reducing single-use plastic):",
  },
  {
    category: "information-source",
    prompt:
      "How do you stay informed about marine conservation issues? (e.g., news articles, social media, documentaries):",
  },

  // Preferences
  {
    category: "activity-interests",
    prompt:
      "What type of marine conservation activities are you most interested in participating in? (e.g., beach cleanups, coral reef restoration, marine wildlife monitoring):",
  },
  {
    category: "volunteering-frequency",
    prompt:
      "How frequently would you like to volunteer for marine conservation activities? (e.g., weekly, monthly, occasionally):",
  },
  {
    category: "medical-conditions",
    prompt:
    "Do you have any medical conditions or special considerations we should be aware of?",
  },
  {
    category: "inspiration",
    prompt:
    "What inspired you to get involved in marine conservation?",
  },

];


function showPrompt() {
  console.log("buhhhiujhuhi")
  promptmessage.style.display = "flex";
  document.getElementById("custom-prompt").classList.remove("hidden");
  document.getElementById("prompt-content").innerHTML = `
    <h1> ${titles[currenttitle]} </h1>
    <label for="prompt-input">${prompts[currentStep].prompt}</label>
    <input type="text" id="prompt-input">
    <div class="button-container">
    <button id="submit-button" onclick="submitPrompt()">Submit</button>
    <button id="cancel-button" onclick="cancelPrompt()">Cancel</button>
    <button id="back-button" onclick="goBack()">Back</button>
  </div>
    <div class="progress-bar">
    <div class="progress" style="width: ${
      (currentStep / prompts.length) * 100
    }%"></div>
    <div class="progress-text">${Math.round(
      (currentStep / prompts.length) * 100
    )}%</div>
  </div>
  `;

  // Call cancelPrompt function when cancel button is clicked
  document
    .getElementById("cancel-button")
    .addEventListener("click", cancelPrompt);

  const backButton = document.getElementById("back-button");
  if (currentStep === 0) {
    backButton.style.display = "none"; // Hide the button
  } else {
    backButton.style.display = "block"; // Show the button
  }
}

function cancelPrompt() {
  promptmessage.style.display = "none";
  loadingmessage.style.display = "block";
  sessionStorage.clear();
}
function submitPrompt() {
  const userInput = document.getElementById("prompt-input").value;
  if (userInput !== "") {
    const input = userInput.trim();

    const category = prompts[currentStep].category;
    console.log(category)

    // Store the input in session storage
    sessionStorage.setItem(category, JSON.stringify(input));

    // Display the input in the profile
    document.getElementById(category).classList.remove("hidden");
    document.getElementById(category + "-info").innerText = input;

    currentStep++;

    if (currentStep < prompts.length) {
      showPrompt(); // Show the prompt for the next step
    } else {
      // If all prompts are completed, hide the loading message and show the profile
      loadingmessage.classList.add("hidden");
      document.getElementById("profile").classList.remove("hidden");
      document.getElementById("prompt-container").classList.remove("hidden");
      document.getElementById("custom-prompt").style.display = "none";
    }
  } else {
    // If user leaves the input empty, show a message
    alert("Please enter a value.");
  }
}


function goBack() {
  if (currentStep > 0) {
    currentStep--;
    showPrompt();
  }
}

// Function to show profile-building elements after clicking the button
document.getElementById("create-user").addEventListener("click", function () {
  loadingmessage.classList.add("hidden");
  showPrompt();
});
