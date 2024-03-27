// JavaScript for progressive profile building


const names = {
  "basic-info": "Personal Details",
  "preferences": "Volunteering Tasks",
  "interests": "Qualifications",
  "other": "Contact"
};

const prompts = [
  { category: "basic-info", prompt: "Enter your name and username separated by a comma (,)" },
  { category: "preferences", prompt: "Enter your preferences separated by a comma (,)" },
  { category: "interests", prompt: "Enter your interests or hobbies separated by a comma (,)" },
  { category: "other", prompt: "Enter any additional information separated by a comma (,)" }
];

let currentStep = 0;

function showPrompt() {
  document.getElementById('custom-prompt').classList.remove('hidden');
  document.getElementById('prompt-content').innerHTML = `

    <div class="progress-bar">
      <div class="progress" style="width: ${(currentStep / prompts.length) * 100}%"></div>
    </div>
    <label for="prompt-input">${prompts[currentStep].prompt}</label>
    <input type="text" id="prompt-input">
    <button onclick="submitPrompt()">Submit</button>
    <button onclick="goBack()" id="back-button">Back</button>
  `;

  const backButton = document.getElementById('back-button');
  if (currentStep === 0) {
    backButton.style.display = 'none'; // Hide the button
  } else {
    backButton.style.display = 'block'; // Show the button
  }
}

function submitPrompt() {
  const userInput = document.getElementById('prompt-input').value;
  if (userInput !== '') {
    const inputs = userInput.split(',').map(input => input.trim()); // Split inputs by comma
    document.getElementById(prompts[currentStep].category).classList.remove('hidden');
    document.getElementById(prompts[currentStep].category + '-info').innerText = inputs.join(', '); // Display inputs with comma separation
    currentStep++;
    if (currentStep < prompts.length) {
      showPrompt(); // Show the prompt for the next step
    } else {
      document.getElementById('loading-message').classList.add('hidden');
      document.getElementById('profile').classList.remove('hidden');
      document.getElementById('prompt-container').classList.remove('hidden');
      document.getElementById('custom-prompt').style.display = 'none';
  
    }
  } else {
    // If user leaves the input empty, show a message
    alert('Please enter a value.');
  }
}

function goBack() {
  if (currentStep > 0) {
    currentStep--;
    showPrompt();
  }
}

// Show the initial prompt when the page loads
document.addEventListener('DOMContentLoaded', function() {
  showPrompt();
});
