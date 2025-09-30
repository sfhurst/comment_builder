// :::: (Textarea Expansion) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Expand the textareas when pasted or typed in
function expandTextarea(event, textareaName) {
  // Extract the unique part of the textarea name (e.g., txt01 from txt01-textarea)
  const baseId = textareaName.split("-")[0];

  // Create the IDs for both textarea and review textarea
  const textareaId = `${baseId}-textarea`;

  // Use requestAnimationFrame to sync the update
  requestAnimationFrame(() => {
    // Get the elements for both textareas (if they exist)
    const textareaElem = document.getElementById(textareaId);

    // Check if the textarea elements exist and update their replicated values
    if (textareaElem) {
      textareaElem.parentNode.dataset.replicatedValue = textareaElem.value;
    }
  });
}

// :::: (Activate Button On Click) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Handles the display of content for each tab based on button clicks

function openTab(evt) {
  var button = evt.currentTarget; // The clicked button
  var buttonClass = button.getAttribute("data-button-class"); // The data button class of the clicked target
  
  
  // Remove "active" class from all buttons in the same button class
  var buttons = document.getElementsByClassName(buttonClass);
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(" active", ""); // Remove active class
  }

  // Show the selected tab's content and add "active" class to the clicked button
  button.className += " active"; // Add active class to the clicked button

}

// Add event listeners to the header buttons (main tabs)
document.querySelectorAll(".navigation-buttons, .quantity-buttons, .severity-buttons, .template-buttons").forEach(function (button) {
  button.addEventListener("focus", openTab); // Add click event to trigger openTab
});

// :::: (Arrow Buttons) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const toggleFocusActivation = "focus"; // Set to "focus" or "activate"

// Track the number of times the Control key is pressed // :::: (Ctrl, Ctrl) //
let toggleArrow = "navigation";

function handleElementAction(element) {
  if (element.tagName.toLowerCase() === "a") return; // Skip activation for links
  if (element.id === "button-map-link") return; // Skip activation if the ID is "button-map-link"
  if (element.id === "searchID") return; // Skip activation if the ID is "searchID"
  if ("rating" in element.dataset) return; // Skip activation if the data attribute is rating

  element.focus();
  if (element.tagName.toLowerCase() === "textarea") {
    element.selectionStart = element.value.length;
    element.selectionEnd = element.value.length;
  }
}

function getVisibleElements(rowClass) {
  return Array.from(document.querySelectorAll(`.${rowClass}`)).filter((el) => el.offsetParent !== null);
}

function getAllRowClasses() {
  const allElements = document.querySelectorAll("[class*='row']");
  const rowClasses = new Set();

  allElements.forEach((el) => {
    if (el.offsetParent !== null) {
      el.classList.forEach((cls) => {
        if (cls.startsWith("row")) {
          rowClasses.add(cls);
        }
      });
    }
  });

  return Array.from(rowClasses).sort((a, b) => {
    const numA = parseInt(a.replace("row", ""));
    const numB = parseInt(b.replace("row", ""));
    return numA - numB;
  });
}

window.addEventListener("keydown", function (event) {
  let activeElement = document.activeElement;
  let rowClass = Array.from(activeElement.classList).find((cls) => cls.startsWith("row"));
  if (!rowClass) return;

  const elements = getVisibleElements(rowClass);
  const index = elements.indexOf(activeElement);
  const allRows = getAllRowClasses();
  const rowIndex = allRows.indexOf(rowClass);

  if (event.code === "ArrowRight") {
    let activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === "textarea") {
      const textarea = activeElement;
      const cursorPosition = textarea.selectionEnd;

      // If the cursor is at the end of the textarea, proceed with normal behavior
      if (cursorPosition === textarea.value.length) {
        // const nextIndex = (index + 1) % elements.length;
        // elements[nextIndex].focus();
        // handleElementAction(elements[nextIndex]);
        // event.preventDefault();
      } else {
        // If the cursor is not at the end, allow the natural behavior (move cursor right)
        if (textarea.selectionEnd === textarea.value.length) {
          textarea.selectionStart = 0; // Set cursor to the start
        }
      }
    } else {
      // Normal behavior if not in a textarea
      const nextIndex = (index + 1) % elements.length;
      elements[nextIndex].focus();
      handleElementAction(elements[nextIndex]);
      event.preventDefault();
    }
  }

  if (event.code === "ArrowLeft") {
    let activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === "textarea") {
      const textarea = activeElement;
      const cursorPosition = textarea.selectionStart;

      // If the cursor is at the beginning of the textarea, proceed with normal behavior
      if (cursorPosition === 0) {
        // const nextIndex = (index - 1 + elements.length) % elements.length;
        // elements[nextIndex].focus();
        // handleElementAction(elements[nextIndex]);
        // event.preventDefault();
      } else {
        // If the cursor is not at the beginning, allow the natural behavior (move cursor left)
        if (textarea.selectionStart === 0) {
          textarea.selectionEnd = textarea.value.length; // Set cursor to the end
        }
      }
    } else {
      // Normal behavior if not in a textarea
      const nextIndex = (index - 1 + elements.length) % elements.length;
      elements[nextIndex].focus();
      handleElementAction(elements[nextIndex]);
      event.preventDefault();
    }
  }

  if (event.code === "ArrowDown" && toggleArrow !== "default") {
    const activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === "textarea") {
      const cursorPosition = activeElement.selectionStart; // Get the cursor position
      const textLength = activeElement.value.length; // Get the text length

      // If the cursor is at the end, check if it's the last row and jump to the first row
      if (cursorPosition === textLength) {
        if (rowIndex === allRows.length - 1) {
          // It's the last row, so focus the first element in Row1
          const firstRowElements = getVisibleElements(allRows[0]);
          if (firstRowElements.length) {
          // Try to find the active element
          const activeElement = Array.from(firstRowElements).find(el =>
          el.classList.contains("active")
          );
          const elementToFocus = activeElement || firstRowElements[0];
          elementToFocus.focus();
          handleElementAction(elementToFocus);
          }
        } else {
          // Move focus to the first element in the next row
          const nextRowIndex = (rowIndex + 1) % allRows.length;
          const nextRowElements = getVisibleElements(allRows[nextRowIndex]);
          if (nextRowElements.length) {
            const nextRowArray = Array.from(nextRowElements);
            // Find the element with "active" class
            const activeElement = nextRowArray.find(el => el.classList.contains("active"));
            const elementToFocus = activeElement || nextRowArray[0]; // fallback to first element
            elementToFocus.focus();
            handleElementAction(elementToFocus);
          }
        }
        event.preventDefault();
      }
      // If the cursor is not at the end, allow natural ArrowDown behavior
      else {
        return; // Let the browser handle the default behavior
      }
    } else {
      // Normal behavior for non-textarea elements
      const nextRowIndex = (rowIndex + 1) % allRows.length;
      const nextRow = getVisibleElements(allRows[nextRowIndex]);

      if (nextRow.length) {
        // Check if there's an active button in the next row
        const activeButton = nextRow.find((el) => el.tagName.toLowerCase() === "button" && el.classList.contains("active"));
        if (activeButton) {
          activeButton.focus(); // Focus the active button
          handleElementAction(activeButton);
        } else {
          nextRow[0].focus(); // If no active button, focus the first visible element
          handleElementAction(nextRow[0]);
        }
      }
      event.preventDefault();
    }
  }

  if (event.code === "ArrowUp" && toggleArrow !== "default") {
   const activeElement = document.activeElement;
   // Check if the active element is a textarea
   if (activeElement.tagName.toLowerCase() === "textarea") {
       const textarea = activeElement;
       const cursorPosition = textarea.selectionStart;
       // If the cursor is at the beginning of the textarea, proceed with normal behavior
       if (cursorPosition === 0) {
           const prevRowIndex = (rowIndex - 1 + allRows.length) % allRows.length;
           const prevRowElements = getVisibleElements(allRows[prevRowIndex]);
           if (prevRowElements.length) {
               // Focus the element with "active" class, or first element if none
               const prevRowArray = Array.from(prevRowElements);
               const elementToFocus = prevRowArray.find(el => el.classList.contains("active")) || prevRowArray[0];
               elementToFocus.focus();
               handleElementAction(elementToFocus);
           }
           event.preventDefault();
       }
   } else {
       // Normal behavior if not in a textarea
       const prevRowIndex = (rowIndex - 1 + allRows.length) % allRows.length;
       const prevRowElements = getVisibleElements(allRows[prevRowIndex]);
       if (prevRowElements.length) {
           // Focus the element with "active" class, or first element if none
           const prevRowArray = Array.from(prevRowElements);
           const elementToFocus = prevRowArray.find(el => el.classList.contains("active")) || prevRowArray[0];
           elementToFocus.focus();
           handleElementAction(elementToFocus);
       }
       event.preventDefault();
   }
  }
});

// :::: (Set Starting Focus) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

window.addEventListener('DOMContentLoaded', () => {
  // Find the element in the first row with the "active" class
  const startingButton = document.querySelector('.row1.active');
  if (startingButton) {
    startingButton.focus();
  }
});

// :::: (Set Template Text On Focus) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// map each template name to the actual template string you want to show
const templateMap = {
 "Template 1": "The <location> has <quantity> <severity> <defect>: <details>.",
 "Template 2": "There is <quantity> <severity> <defect> in the <location>: <details>.",
 "Template 3": "<quantity> <severity> <defect> is present in the <location>: <details>.",
 "Template 4": "<location>: <quantity> <severity> <defect>; <details>.",
 "Template 5": "<quantity> <severity> <defect> in the <location>: <details>."
};
document.querySelectorAll('.template-buttons').forEach(btn => {
 btn.addEventListener('focus', () => {
   const span = document.getElementById('template-text');
   const text = templateMap[btn.textContent.trim()];
   if (text) span.textContent = text;
 });
});

// :::: (Template Functions) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const pluralLocationsList = [
  "abutments",
  "approach slabs",
  "arch rings",
  "barrels",
  "barrier walls",
  "beam ends",
  "beams",
  "bearings",
  "bridge railings",
  "columns",
  "concrete barrier walls",
  "crash walls",
  "curbs",
  "curtain walls",
  "diaphragms",
  "downspouts",
  "end bents",
  "expansion joints",
  "floorbeams",
  "girders",
  "headwalls",
  "interior piers",
  "joints",
  "pier caps",
  "pier columns",
  "pier walls",
  "piers",
  "retaining walls",
  "sidewalks",
  "spandrel walls",
  "stringers",
  "terminal joints",
  "wingwalls",
];

// plural check helper
function isPluralLocation(location) {
 const lowerLoc = location.toLowerCase();
 return pluralLocationsList.some(plural => lowerLoc.includes(plural));
}

// Function to get the active button text for a given data-button-class
function getActiveButtonText(buttonClass) {
 const activeButton = document.querySelector(
   `button[data-button-class="${buttonClass}"].active`
 );
 return activeButton ? activeButton.textContent.trim().toLowerCase() : "";
}

// Function to build the report string
function buildReport() {
 let quantity = getActiveButtonText("quantity-buttons");
 if (quantity === "x") quantity = "";
 let severity = getActiveButtonText("severity-buttons");
 if (severity === "x") severity = "";
 const templateText = getActiveButtonText("template-buttons");
 const templateNumberMatch = templateText.match(/\d+$/);
 const templateNumber = templateNumberMatch ? parseInt(templateNumberMatch[0], 10) : 1;
 const defect = document.getElementById("txt01-textarea").value.trim();
 const location = document.getElementById("txt02-textarea").value.trim();
 const details = document.getElementById("txt03-textarea").value.trim();
 // decide has/have now
 const hasWord = isPluralLocation(location) ? "have" : "has";
 let report = "";
 if (details !== "") {
   switch (templateNumber) {
     case 1:
       report = `The ${location} ${hasWord} ${quantity} ${severity} ${defect}: ${details}.`;
       break;
     case 2:
       report = `There is ${quantity} ${severity} ${defect} in the ${location}: ${details}.`;
       break;
     case 3:
       report = `${quantity.charAt(0).toUpperCase() + quantity.slice(1).toLowerCase()} ${severity} ${defect} is present in the ${location}: ${details}.`;
       break;
     case 4:
       report = `${location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()}: ${quantity} ${severity} ${defect}; ${details}.`;
       break;
     case 5:
       report = `${quantity.charAt(0).toUpperCase() + quantity.slice(1).toLowerCase()} ${severity} ${defect} in the ${location}: ${details}.`;
       break;
     default:
       report = `The ${location} ${hasWord} ${quantity} ${severity} ${defect}: ${details}.`;
   }
 } else {
   switch (templateNumber) {
     case 1:
       report = `The ${location} ${hasWord} ${quantity} ${severity} ${defect}.`;
       break;
     case 2:
       report = `There is ${quantity} ${severity} ${defect} in the ${location}.`;
       break;
     case 3:
       report = `${quantity.charAt(0).toUpperCase() + quantity.slice(1).toLowerCase()} ${severity} ${defect} is present in the ${location}.`;
       break;
     case 4:
       report = `${location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()}: ${quantity} ${severity} ${defect}.`;
       break;
     case 5:
       report = `${quantity.charAt(0).toUpperCase() + quantity.slice(1).toLowerCase()} ${severity} ${defect} in the ${location}.`;
       break;
     default:
       report = `The ${location} ${hasWord} ${quantity} ${severity} ${defect}.`;
   }
 }
 // clean up spaces and periods
 report = report.replace(/\s{2,}/g, ' ');
 report = report.replace(/\.{2,}/g, '.');
 return report;
}

// Function to update txt04-textarea
function updateReport() {
 const reportArea = document.getElementById("txt04-textarea");
 reportArea.value = buildReport();
}

// Add event listeners to all template buttons
document.querySelectorAll(
 ".quantity-buttons, .severity-buttons, .template-buttons"
).forEach(button => {
 button.addEventListener("click", () => {
   updateReport();
 });
 button.addEventListener("focus", () => {
   updateReport();
 });
});
// Add event listeners to textareas for live typing updates
["txt01-textarea", "txt02-textarea", "txt03-textarea"].forEach(id => {
 const textarea = document.getElementById(id);
 textarea.addEventListener("input", updateReport);
});
// Initialize on page load
window.addEventListener("DOMContentLoaded", updateReport);


// :::: (Template Functions) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Your lists
const defectsList = [
  "abrasion",
  "beam end deterioration",
  "bearing misalignment",
  "collision damage",
  "corrosion",
  "cracking",
  "cracking and delamination",
  "deformation",
  "delamination",
  "deterioration",
  "diagonal cracking",
  "efflorescence",
  "efflorescence buildup",
  "erosion",
  "honeycombing",
  "leakage",
  "longitudinal cracking",
  "longitudinal cracking with efflorescence",
  "map cracking",
  "map cracking with efflorescence",
  "out-of-plane bending",
  "pack rust",
  "paint peeling",
  "pattern cracking",
  "pattern cracking with efflorescence",
  "pitting",
  "random cracking",
  "rideability issues",
  "rust scaling",
  "scaling",
  "scour",
  "section loss",
  "settlement",
  "shallow-depth spalling",
  "shallow-depth spalling with delamination",
  "shallow-depth spalling with delamination and exposed rebar",
  "shallow-depth spalling with exposed rebar",
  "shallow tining",
  "slump",
  "spalling",
  "surface dulling",
  "transverse cracking",
  "transverse cracking with efflorescence",
  "undermining",
  "vertical cracking",
  "wear",
];
const locationsList = [
  "abutments",
  "approach slabs",
  "arch ring",
  "barrel",
  "barrier walls",
  "beam ends",
  "beams",
  "bearings",
  "bridge railing",
  "columns",
  "concrete barrier walls",
  "crash walls",
  "curbs",
  "curtain wall",
  "deck",
  "deck underside",
  "diaphragms",
  "downspouts",
  "east",
  "east abutment",
  "east approach slab",
  "end bents",
  "expansion joints",
  "floorbeams",
  "girders",
  "headwalls",
  "interior piers",
  "joints",
  "north",
  "north abutment",
  "north approach slab",
  "pier caps",
  "pier columns",
  "pier walls",
  "piers",
  "retaining walls",
  "sidewalks",
  "south",
  "south abutment",
  "south approach slab",
  "spandrel wall",
  "stringers",
  "substructure",
  "superstructure",
  "terminal joints",
  "top of the deck",
  "underside of the deck",
  "wearing surface",
  "west",
  "west abutment",
  "west approach slab",
  "wingwalls",
];

// reusable function with backspace + alt support
function autoComplete(textarea, list, state) {
 const val = textarea.value;
 const caret = textarea.selectionStart;
 // only do autocomplete if caret is at the end of the value
 if (caret !== val.length) {
   // user is editing in the middle — cancel suggestions
   state.index = 0;
   state.matches = [];
   state.lastTyped = val.slice(0, caret);
   return; // do nothing else
 }
 const beforeCaret = val.slice(0, caret);
 // collect all matches that start with what was typed
 state.matches = list.filter(item =>
   item.toLowerCase().startsWith(beforeCaret.toLowerCase())
 );
 if (state.matches.length > 0 && beforeCaret.length > 0) {
   const match = state.matches[state.index] || state.matches[0];
   textarea.value = match;
   textarea.selectionStart = beforeCaret.length;
   textarea.selectionEnd = match.length;
   state.lastTyped = beforeCaret; // remember actual typed portion
 } else {
   state.index = 0;
   state.matches = [];
   state.lastTyped = beforeCaret;
 }
 updateReport();
}
function attachAutoComplete(textarea, list) {
 const state = {
   matches: [],
   index: 0,
   lastTyped: ""
 };
 textarea.addEventListener("input", () => {
   state.index = 0;
   autoComplete(textarea, list, state);
 });
 textarea.addEventListener("keydown", e => {
 // Accept suggestion on Tab or ArrowRight
 if ((e.key === "Tab" || e.key === "ArrowRight") &&
     textarea.selectionStart !== textarea.selectionEnd) {
   e.preventDefault();
   textarea.selectionStart = textarea.selectionEnd;
 }
 // Backspace: step back one char from what user typed,
 // then immediately rerun autocomplete
 if (e.key === "Backspace" &&
     textarea.selectionStart !== textarea.selectionEnd) {
   e.preventDefault();
   state.lastTyped = state.lastTyped.slice(0, -1);
   textarea.value = state.lastTyped;
   textarea.selectionStart = textarea.selectionEnd = state.lastTyped.length;
   state.index = 0;
   autoComplete(textarea, list, state);
 }
 // Delete: remove the highlighted suggestion completely
 if (e.key === "Delete" &&
     textarea.selectionStart !== textarea.selectionEnd) {
   e.preventDefault();
   // just restore exactly what the user had typed so far
   textarea.value = state.lastTyped;
   textarea.selectionStart = textarea.selectionEnd = state.lastTyped.length;
   state.matches = [];
   state.index = 0;
   // no autocomplete here — you only typed lastTyped, so leave it alone
 }
 // Alt: cycle through matches
 if (e.key === "Alt" && state.matches.length > 1) {
   e.preventDefault();
   state.index = (state.index + 1) % state.matches.length;
   textarea.value = state.matches[state.index];
   textarea.selectionStart = state.lastTyped.length;
   textarea.selectionEnd = state.matches[state.index].length;
 } else if (e.key === "Alt") {
   e.preventDefault();
 }
});
}
// hook up your textareas
const defectBox = document.getElementById("txt01-textarea");
if (defectBox) attachAutoComplete(defectBox, defectsList);
const locationBox = document.getElementById("txt02-textarea");
if (locationBox) attachAutoComplete(locationBox, locationsList);

// :::: (Typing Shortcuts For Quantity/Severity Pairs) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Map of hotkeys to sequences of combos
const hotkeyCombos = {
 '9': [
   { quantity: 'Isolated', severity: 'Inherent' }
 ],
 '8': [
   { quantity: 'Some', severity: 'Inherent' },
   { quantity: 'Widespread', severity: 'Inherent' },
   { quantity: 'Isolated', severity: 'Minor' }
 ],
 '7': [
   { quantity: 'Some', severity: 'Minor' }
 ],
 '6': [
   { quantity: 'Widespread', severity: 'Minor' },
   { quantity: 'Isolated', severity: 'Moderate' }
 ],
 '5': [
   { quantity: 'Some', severity: 'Moderate' }
 ],
 '4': [
   { quantity: 'Widespread', severity: 'Moderate' },
   { quantity: 'Isolated', severity: 'Major' }
 ],
 'x': [
   { quantity: 'X', severity: 'Minor' },
   { quantity: 'Some', severity: 'X' },
   { quantity: 'X', severity: 'X' }
 ]
};
// Track indices per key so each hotkey cycles separately
const hotkeyIndex = {};
document.addEventListener('keydown', e => {
 const key = e.key.toLowerCase(); // normalize to lower case
 // Only run if key is in our map and we’re not in a text field
 if (
   hotkeyCombos[key] &&
   document.activeElement &&
   !(
     document.activeElement.tagName === 'TEXTAREA' ||
     document.activeElement.tagName === 'INPUT' ||
     document.activeElement.isContentEditable
   )
 ) {
   e.preventDefault();
   // Set index to 0 if this is first time pressing this key
   if (!hotkeyIndex[key] && hotkeyIndex[key] !== 0) hotkeyIndex[key] = 0;
   const combos = hotkeyCombos[key];
   const combo = combos[hotkeyIndex[key]];
   // Increment index for next press, wrap to 0 if at end
   hotkeyIndex[key] = (hotkeyIndex[key] + 1) % combos.length;
   // Focus quantity button
   const qtyBtn = Array.from(
     document.querySelectorAll('[data-button-class="quantity-buttons"]')
   ).find(btn => btn.textContent.trim() === combo.quantity);
   if (qtyBtn) qtyBtn.focus();
   // Focus severity button
   const sevBtn = Array.from(
     document.querySelectorAll('[data-button-class="severity-buttons"]')
   ).find(btn => btn.textContent.trim() === combo.severity);
   if (sevBtn) sevBtn.focus();
 }
});








 // :::: (test click)

 const button = document.getElementById("copyCloseButton");
 // Handle a real click
 button.addEventListener("click", function(evt) {
   openTab(evt); // calls your existing openTab function
   alert("Click!");
 });
 // Optional: explicitly handle Enter or Space if needed (usually not necessary)
 button.addEventListener("keydown", function(evt) {
   if (evt.code === "Enter" || evt.code === "Space") {
     evt.preventDefault(); // prevent scrolling for Space
     openTab({ currentTarget: button }); // simulate a click
     alert("Enter!");
   }
 });
