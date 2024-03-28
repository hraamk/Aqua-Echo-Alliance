// JavaScript for progressive profile building

const promptmessage = document.getElementById("prompt-container");
const loadingmessage =  document.getElementById("loading-message");

let currentStep = 0;
let currenttitle = 0;

const names = ["personal details","Volunteering tasks","Qualifications","Availability and contact"]
const prompts = [
  {
    category: "user-name",
    prompt: "Enter your name and username separated by a comma (,)",
  },
  {
    category: "user-age",
    prompt: "Enter your age",
  },
  {
    category: "user-gender",
    prompt: "Enter your gender",
  },
  {
    category: "user-agreement",
    prompt: "do you agree with pirvacy terms(yes/no)",
  },
  {
    category: "preferences",
    prompt: "Enter your preferences separated by a comma (,)",
  },
  {
    category: "interests",
    prompt: "Enter your interests or hobbies separated by a comma (,)",
  },
  {
    category: "contact",
    prompt: "Enter phone number",
  },
];

function showPrompt() {
  promptmessage.style.display = "flex";
  document.getElementById("custom-prompt").classList.remove("hidden");
  document.getElementById("prompt-content").innerHTML = `
    <h1> ${names[currenttitle]} </h1>
    <label for="prompt-input">${prompts[currentStep].prompt}</label>
    <input type="text" id="prompt-input">
    <div class="button-container">
    <button id="submit-button" onclick="submitPrompt()">Submit</button>
    <button id="cancel-button" onclick="cancelPrompt()">Cancel</button>
    <button id="back-button" onclick="goBack()">Back</button>
  </div>
    <div class="progress-bar">
    <div class="progress" style="width: ${(currentStep / prompts.length) * 100}%"></div>
    <div class="progress-text">${Math.round((currentStep / prompts.length) * 100)}%</div>
  </div>
  `;

  // Call cancelPrompt function when cancel button is clicked
  document.getElementById("cancel-button").addEventListener("click", cancelPrompt);

  const backButton = document.getElementById("back-button");
  if (currentStep === 0) {
    backButton.style.display = "none"; // Hide the button
  } else {
    backButton.style.display = "block"; // Show the button
  }
}

function cancelPrompt() {
  promptmessage.style.display = 'none';
  loadingmessage.style.display = 'block';
}

function submitPrompt() {
  const userInput = document.getElementById("prompt-input").value;
  if (userInput !== "") {
    const inputs = userInput.split(",").map((input) => input.trim()); // Split inputs by comma

    const category = prompts[currentStep].category;
    
    // Store the inputs in session storage
    sessionStorage.setItem(category, JSON.stringify(inputs));

    // Display the inputs in the profile
    document.getElementById(category).classList.remove("hidden");
    document.getElementById(category + "-info").innerText = inputs.join(", ");


    currentStep++;

    switch (currentStep) {
      case 4:
        currenttitle++;
        break;
      case 5:
        currenttitle++;
        break;
      case 6:
        currenttitle++;
        break;
    }

    if (currentStep < prompts.length) {
      showPrompt(); // Show the prompt for the next step
    } else {
      document.getElementById("loading-message").classList.add("hidden");
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
