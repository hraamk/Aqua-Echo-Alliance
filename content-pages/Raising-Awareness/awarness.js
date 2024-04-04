document.addEventListener("DOMContentLoaded", function () {

  // Wait for the HTML document to load completely

  //sections
  var introSection = document.getElementById("intro"); // Section
  var marineBiodiversitySection = document.getElementById(
    "marine-biodiversity"
  );
  var pollutionSection = document.getElementById("pollution");


  //headers
  var h1 = document.getElementById("scroll");
  var marinehead = document.getElementById("marine-head");
  var pollutionhead = document.getElementById("pollution-head");

  //content
  var introContent = document.getElementById("introseccontent"); // Intro content
  var marinecontent = document.getElementById("marinecontent"); // marine content

  // intro section animation
  window.addEventListener("scroll", function () {
    // Get the position of the intro section
    var introPosition = Math.abs(introSection.getBoundingClientRect().top);

    // Calculate the percentage of visibility of the intro section
    var visibilityPercentage = Math.max(
      0,
      Math.min(introPosition / window.innerHeight, 1)
    );

    // Smoothly transition font size based on visibility percentage
    h1.style.fontSize = 5 - visibilityPercentage * 12 + "em"; 

    // Smoothly transition border radius based on visibility percentage
    var borderRadius = 100 + visibilityPercentage * 400; // Transition from 50px to 0px based on visibility
    introSection.style.borderBottomLeftRadius = borderRadius + "px";
    introSection.style.borderBottomRightRadius = borderRadius + "px";

    // Check if the intro section is in the viewport
    if (introPosition < window.innerHeight && introPosition < 63) {
      h1.style.display = "block";
      h1.style.color = "";
      introContent.style.opacity = 0; // Change to desired color
    } else {
      h1.style.color = "#333"; // Reset to default color
      introContent.style.opacity = 1;
    }
  });

  // marine silde animation
  window.addEventListener("scroll", function () {
    var biodiversityPosition = Math.abs(
      marineBiodiversitySection.getBoundingClientRect().top
    );
    var scrollProgress = 1 - biodiversityPosition / window.innerHeight;

    // Calculate the font size dynamically
    var fontSize = 1 + scrollProgress * 3 + "em";

    // Apply the linear gradient background to the text only
    marinehead.style.background = `linear-gradient(to bottom, black ${
      scrollProgress * 100
    }%, #0077cc ${scrollProgress * 100}%)`;
    marinehead.style.color = "transparent"; // Make the text transparent
    marinehead.style.backgroundClip = "text"; // Apply background clip to text
    marinehead.style.fontSize = fontSize;

    // Update the opacity of marine content based on scroll progress
    marinecontent.style.opacity = scrollProgress;
    // Get the position of the pollution section
    var pollutionPosition = Math.abs(
      pollutionSection.getBoundingClientRect().top
    );
    var pollutionScrollProgress = 1 - pollutionPosition / window.innerHeight;

    // Calculate the font size dynamically for pollution section
    var pollutionFontSize = 3 + pollutionScrollProgress * 5 + "em";
    // Apply the linear gradient background to the text of pollution section
    pollutionhead.style.background = `linear-gradient(to top, #EE4B2B ${
      (pollutionScrollProgress) * 100
    }%, white ${(pollutionScrollProgress) * 100}%)`;
    pollutionhead.style.color = "transparent"; // Make the text transparent
    pollutionhead.style.backgroundClip = "text"; // Apply background clip to text
    pollutionhead.style.fontSize = pollutionFontSize;
    // Update the opacity of pollution content based on scroll progress
    pollutioncontent.style.opacity =  pollutionScrollProgress;
  });

  


});
