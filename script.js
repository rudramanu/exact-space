const submitButton = document.getElementById("submit-button");
const jsonFormContainer = document.getElementById("json-form-container");

// Initialize CodeMirror
const codeEditor = CodeMirror.fromTextArea(
  document.getElementById("json-input"),
  {
    mode: "javascript", // Set the mode to JavaScript
    theme: "default", // Set the theme to the default theme
    lineNumbers: true, // Show line numbers
    indentUnit: 2, // Use 2 spaces for indentation
    autofocus: true, // Automatically focus on the CodeMirror editor
  }
);

// Add an event listener to the submit button
submitButton.addEventListener("click", async () => {
  const json = codeEditor.getValue();

  try {
    // Send a POST request to the /api/submit endpoint
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });

    const isValidJSON = await response.json();

    if (isValidJSON) {
      // Generate and display an HTML form from the JSON data
      const formHTML = generateFormHTML(json);
      jsonFormContainer.innerHTML = formHTML;
    } else {
      jsonFormContainer.innerHTML = "<p>Invalid JSON input.</p>";
    }
  } catch (error) {
    jsonFormContainer.innerHTML = "<p>Invalid JSON input.</p>";
  }
});

// Function to generate an HTML form from JSON data
function generateFormHTML(json) {
  const parsedJSON = JSON.parse(json);
  const jsonKeys = Object.keys(parsedJSON);

  let formHTML = `<form>`;
  jsonKeys.forEach((key) => {
    formHTML += `
      <label for="${key}">${key}:</label>
      <input type="text" id="${key}" value="${parsedJSON[key]}"><br>`;
  });
  formHTML += `</form>`;

  return formHTML;
}
