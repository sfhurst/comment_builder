// :::: (Textarea Expansion) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Expand the textareas when pasted or typed in
function expandTextarea(event, textareaName) {
  // Extract the unique part of the textarea name (e.g., txt01 from txt01-textarea)
  const baseId = textareaName.split('-')[0];

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
  var buttonClass = button.getAttribute('data-button-class'); // The data button class of the clicked target

  // Remove "active" class from all buttons in the same button class
  var buttons = document.getElementsByClassName(buttonClass);
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace(' active', ''); // Remove active class
  }

  // Show the selected tab's content and add "active" class to the clicked button
  button.className += ' active'; // Add active class to the clicked button
}

// Add event listeners to the header buttons (main tabs)
document
  .querySelectorAll(
    '.navigation-buttons, .quantity-buttons, .severity-buttons, .template-buttons'
  )
  .forEach(function (button) {
    button.addEventListener('focus', openTab); // Add click event to trigger openTab
  });

// :::: (Arrow Buttons) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const toggleFocusActivation = 'focus'; // Set to "focus" or "activate"

// Track the number of times the Control key is pressed // :::: (Ctrl, Ctrl) //
let toggleArrow = 'navigation';

function handleElementAction(element) {
  if (element.tagName.toLowerCase() === 'a') return; // Skip activation for links
  if (element.id === 'button-map-link') return; // Skip activation if the ID is "button-map-link"
  if (element.id === 'searchID') return; // Skip activation if the ID is "searchID"
  if ('rating' in element.dataset) return; // Skip activation if the data attribute is rating

  element.focus();
  if (element.tagName.toLowerCase() === 'textarea') {
    element.selectionStart = element.value.length;
    element.selectionEnd = element.value.length;
  }
}

function getVisibleElements(rowClass) {
  return Array.from(document.querySelectorAll(`.${rowClass}`)).filter(
    (el) => el.offsetParent !== null
  );
}

function getAllRowClasses() {
  const allElements = document.querySelectorAll("[class*='row']");
  const rowClasses = new Set();

  allElements.forEach((el) => {
    if (el.offsetParent !== null) {
      el.classList.forEach((cls) => {
        if (cls.startsWith('row')) {
          rowClasses.add(cls);
        }
      });
    }
  });

  return Array.from(rowClasses).sort((a, b) => {
    const numA = parseInt(a.replace('row', ''));
    const numB = parseInt(b.replace('row', ''));
    return numA - numB;
  });
}

window.addEventListener('keydown', function (event) {
  let activeElement = document.activeElement;
  let rowClass = Array.from(activeElement.classList).find((cls) =>
    cls.startsWith('row')
  );
  if (!rowClass) return;

  const elements = getVisibleElements(rowClass);
  const index = elements.indexOf(activeElement);
  const allRows = getAllRowClasses();
  const rowIndex = allRows.indexOf(rowClass);

  if (event.code === 'ArrowRight') {
    let activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === 'textarea') {
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

  if (event.code === 'ArrowLeft') {
    let activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === 'textarea') {
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

  if (event.code === 'ArrowDown' && toggleArrow !== 'default') {
    const activeElement = document.activeElement;

    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === 'textarea') {
      const cursorPosition = activeElement.selectionStart; // Get the cursor position
      const textLength = activeElement.value.length; // Get the text length

      // If the cursor is at the end, check if it's the last row and jump to the first row
      if (cursorPosition === textLength) {
        if (rowIndex === allRows.length - 1) {
          // It's the last row, so focus the first element in Row1
          const firstRowElements = getVisibleElements(allRows[0]);
          if (firstRowElements.length) {
            // Try to find the active element
            const activeElement = Array.from(firstRowElements).find((el) =>
              el.classList.contains('active')
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
            const activeElement = nextRowArray.find((el) =>
              el.classList.contains('active')
            );
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
        const activeButton = nextRow.find(
          (el) =>
            el.tagName.toLowerCase() === 'button' &&
            el.classList.contains('active')
        );
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

  if (event.code === 'ArrowUp' && toggleArrow !== 'default') {
    const activeElement = document.activeElement;
    // Check if the active element is a textarea
    if (activeElement.tagName.toLowerCase() === 'textarea') {
      const textarea = activeElement;
      const cursorPosition = textarea.selectionStart;
      // If the cursor is at the beginning of the textarea, proceed with normal behavior
      if (cursorPosition === 0) {
        const prevRowIndex = (rowIndex - 1 + allRows.length) % allRows.length;
        const prevRowElements = getVisibleElements(allRows[prevRowIndex]);
        if (prevRowElements.length) {
          // Focus the element with "active" class, or first element if none
          const prevRowArray = Array.from(prevRowElements);
          const elementToFocus =
            prevRowArray.find((el) => el.classList.contains('active')) ||
            prevRowArray[0];
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
        const elementToFocus =
          prevRowArray.find((el) => el.classList.contains('active')) ||
          prevRowArray[0];
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

// :::: (Array Work) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Global array of report entries
let reportEntries = [
  {
    id: Date.now(), // unique enough for this purpose
    rating: 5,
    quantity: 'Some',
    severity: 'Minor',
    defect: '',
    location: '',
    details: '',
    template: 'T1',
    comment: 'Some minor defects.',
  },
];

// Track active entry
let activeIndex = 0;

// Add a new entry
function addReportEntry() {
  // Optional: log the current active entry
  console.log('Active report entry:', reportEntries[activeIndex]);
  console.log(activeIndex);

  // Step 1: Add new entry with defaults
  const newEntry = {
    id: Date.now(), // unique identifier
    rating: 5,
    quantity: 'Some',
    severity: 'Minor',
    defect: '',
    location: '',
    details: '',
    template: 'T1',
    comment: 'Some minor defects.',
  };
  reportEntries.push(newEntry);
  activeIndex = reportEntries.length - 1; // focus on new entry

  // Step 2: Set active class on default quantity/severity buttons
  const quantityButtons = document.querySelectorAll(
    '[data-button-class="quantity-buttons"]'
  );
  const severityButtons = document.querySelectorAll(
    '[data-button-class="severity-buttons"]'
  );
  const templateButtons = document.querySelectorAll(
    '[data-button-class="template-buttons"]'
  );

  quantityButtons.forEach((btn) => btn.classList.remove('active'));
  severityButtons.forEach((btn) => btn.classList.remove('active'));
  templateButtons.forEach((btn) => btn.classList.remove('active'));

  const defaultQty = Array.from(quantityButtons).find(
    (btn) => btn.textContent.trim() === 'Some'
  );
  const defaultSev = Array.from(severityButtons).find(
    (btn) => btn.textContent.trim() === 'Minor'
  );
  const defaultTemp = Array.from(templateButtons).find(
    (btn) => btn.textContent.trim() === 'T1'
  );

  if (defaultQty) defaultQty.classList.add('active');
  if (defaultSev) defaultSev.classList.add('active');
  if (defaultTemp) defaultTemp.classList.add('active');

  // Step 3: Clear textareas for defect, location, and details
  const defectBox = document.getElementById('txt01-textarea');
  const locationBox = document.getElementById('txt02-textarea');
  const detailsBox = document.getElementById('txt03-textarea');
  const finalBox = document.getElementById('txt04-textarea');

  if (defectBox) defectBox.value = '';
  if (locationBox) locationBox.value = '';
  if (detailsBox) detailsBox.value = '';
  if (finalBox) finalBox.value = '';

  // Step 4: Update the report the report
  updateReport();
  // Optional: log the current active entry
  // console.log('Active report entry:', reportEntries[activeIndex]);
  console.log('Active report entry:', reportEntries);
  // console.log(activeIndex);
}

function cycleReportEntry() {
  // Optional: log the current active entry
  console.log('Active report entry:', reportEntries[activeIndex]);
  console.log(activeIndex);
  if (reportEntries.length === 0) return;

  // Step 1: move to next entry
  activeIndex = (activeIndex + 1) % reportEntries.length;
  const entry = reportEntries[activeIndex];

  // Populate textareas
  document.getElementById('txt01-textarea').value = entry.defect;
  document.getElementById('txt02-textarea').value = entry.location;
  document.getElementById('txt03-textarea').value = entry.details;

  // Step 2: buttons
  const quantityButtons = Array.from(
    document.querySelectorAll('[data-button-class="quantity-buttons"]')
  );
  const severityButtons = Array.from(
    document.querySelectorAll('[data-button-class="severity-buttons"]')
  );
  const templateButtons = Array.from(
    document.querySelectorAll('[data-button-class="template-buttons"]')
  );
  // Remove all active classes
  quantityButtons.forEach((btn) => btn.classList.remove('active'));
  severityButtons.forEach((btn) => btn.classList.remove('active'));
  templateButtons.forEach((btn) => btn.classList.remove('active'));
  // Helper to match ignoring case and trimming spaces
  const matchButton = (buttons, value) =>
    buttons.find(
      (btn) =>
        btn.textContent.trim().toLowerCase() === value.trim().toLowerCase()
    );
  const qtyBtn = matchButton(quantityButtons, entry.quantity);
  const sevBtn = matchButton(severityButtons, entry.severity);
  const tempBtn = matchButton(templateButtons, entry.template);
  if (qtyBtn) {
    qtyBtn.classList.add('active');
    qtyBtn.focus();
  }
  if (sevBtn) {
    sevBtn.classList.add('active');
    sevBtn.focus();
  }
  if (tempBtn) {
    tempBtn.classList.add('active');
    tempBtn.focus();
  }

  // Step 4: update report
  updateReport();

  // Put focus back on the "changeDefectButton"
  const changeBtn = document.getElementById('changeDefectButton');
  if (changeBtn) changeBtn.focus();

  // Optional: log the current active entry
  // console.log('Active report entry:', reportEntries[activeIndex]);
  console.log('Active report entry:', reportEntries);
  // console.log(activeIndex);
}

function deleteActiveReportEntry() {
  if (reportEntries.length > 1) {
    // Remove the current active entry
    reportEntries.splice(activeIndex, 1);

    // Move activeIndex to previous entry or 0 if we were at start
    activeIndex = Math.max(activeIndex - 1, 0);

    // Load the new active entry
    cycleReportEntry();
  } else {
    // Only one entry left – temporarily add a default entry to preserve structure
    addReportEntry();
    // Load the entry we want to delete
    cycleReportEntry();
    // call yourself
    deleteActiveReportEntry();
  }

  updateReport();

  // Put focus back on the "changeDefectButton"
  const changeBtn = document.getElementById('removeDefectButton');
  if (changeBtn) changeBtn.focus();
}

function copyAndClose() {
  const defectBox = document.getElementById('txt04-textarea');
  if (!defectBox) return;

  const textToCopy = defectBox.value;

  // Copy to clipboard
  navigator.clipboard.writeText(textToCopy).then(
    () => {
      // Successfully copied, then close the tab
      window.close();
    },
    (err) => {
      console.error('Failed to copy text: ', err);
      // Still attempt to close tab even if copy fails
      window.close();
    }
  );
}

// :::: (Comment Order Rating) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function getRating(quantity, severity) {
  const q = quantity.toLowerCase();
  const s = severity.toLowerCase();

  // handle severity X and insignificant = always 0
  if (s === 'x' || s === 'insignificant' || s === '') return 0;

  // inherent
  if (s === 'inherent') {
    if (q === 'x' || q === 'none') return 1;
    if (q === 'isolated') return 1;
    if (q === 'some') return 2;
    if (q === 'widespread') return 3;
  }

  // minor
  if (s === 'minor') {
    if (q === 'x' || q === 'none') return 4;
    if (q === 'isolated') return 4;
    if (q === 'some') return 5;
    if (q === 'widespread') return 6;
  }

  // moderate
  if (s === 'moderate') {
    if (q === 'x' || q === 'none') return 7;
    if (q === 'isolated') return 7;
    if (q === 'some') return 8;
    if (q === 'widespread') return 9;
  }

  // major
  if (s === 'major') {
    if (q === 'x' || q === 'none') return 10;
    if (q === 'isolated') return 10;
    if (q === 'some') return 11;
    if (q === 'widespread') return 12;
  }

  // fallback if nothing matches
  return 0;
}

// :::: (Set Template Text On Focus) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// map each template name to the actual template string you want to show
const templateMap = {
  T1: '<Quantity> <severity> defects; <details>.',
  T2: 'The <location> has <quantity> <severity> <defect>: <details>.',
  T3: 'There is <quantity> <severity> <defect> in the <location>: <details>.',
  T4: '<Quantity> <severity> <defect> is present in the <location>: <details>.',
  T5: '<Quantity> <severity> defects are present; there is <defect> in the <location>: <details>.',
  T6: '<Quantity> <severity> <defect> in the <location>: <details>.',
  T7: '<Location>: <quantity> <severity> <defect>; <details>.',
};
document.querySelectorAll('.template-buttons').forEach((btn) => {
  btn.addEventListener('focus', () => {
    const span = document.getElementById('template-text');
    const text = templateMap[btn.textContent.trim()];
    if (text) span.textContent = text;
  });
});

// :::: (Template Functions) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const pluralLocationsList = [
  'abutment backwalls',
  'abutments',
  'approach slabs',
  'arch rings',
  'attenuators',
  'backwalls',
  'barrels',
  'barrier walls',
  'beam ends',
  'beams',
  'bearings',
  'box beams',
  'breast walls',
  'bridge railings',
  'columns',
  'concrete barrier walls',
  'copings',
  'cover plates',
  'crash walls',
  'curbs',
  'curtain walls',
  'diaphragms',
  'downspouts',
  'end bents',
  'expansion joints',
  'floor beams',
  'girders',
  'guardrails',
  'headwalls',
  'interior piers',
  'joints',
  'MSE walls',
  'pier caps',
  'pier columns',
  'pier walls',
  'piers',
  'pin-and-hinge assemblies',
  'retaining walls',
  'shelf plates',
  'sidewalks',
  'slopewalls',
  'spandrel walls',
  'splice plates',
  'stay-in-place forms',
  'stringers',
  'stiffeners',
  'terminal joints',
  'transition railings',
  'wingwalls',
];

const pluralDefectsList = [
  'cracks',
  'diagonal cracks',
  'horizontal cracks',
  'longitudinal cracks',
  'map cracks',
  'patches',
  'pattern cracks',
  'random cracks',
  'rideability issues',
  'shallow-depth spalls',
  'shallow-depth spalls with delamination',
  'shallow-depth spalls with delamination and exposed rebar',
  'shallow-depth spalls with exposed rebar',
  'spalls',
  'surface dulling',
  'transverse cracks',
  'vertical cracks',
];

const singularDefectsList = [
  'bend',
  'corrosion hole',
  'crack',
  'deformation',
  'diagonal crack',
  'discontinuity',
  'failure',
  'fracture',
  'horizontal crack',
  'longitudinal crack',
  'missing bolt',
  'patch',
  'pothole',
  'random crack',
  'rust hole',
  'rust spot',
  'scour hole',
  'shallow-depth spall',
  'shallow-depth spall with delamination',
  'shallow-depth spall with delamination and exposed rebar',
  'shallow-depth spall with exposed rebar',
  'spall',
  'surface defect',
  'transverse crack',
  'vertical crack',
  'void',
];

const planLocationList = [
  'Beam 1',
  'Beam 2',
  'Beam 3',
  'Beam 4',
  'Beam 5',
  'Beam 6',
  'Beam 7',
  'Beam 8',
  'Beam 9',
  'Beam 10',
  'Beam 11',
  'Beam 12',
  'Beam 13',
  'Beam 14',
  'Beam 15',
  'Beam 16',
  'Beam 17',
  'Beam 18',
  'Beam 19',
  'Beam 20',
  'Span A',
  'Span B',
  'Span C',
  'Span D',
  'Span E',
  'Span F',
  'Span G',
  'Span H',
  'Span I',
  'Span J',
  'Span K',
  'Span L',
  'Span M',
  'Span N',
  'Span O',
  'Span P',
  'Span Q',
  'Span R',
  'Span S',
  'Span T',
  'Span U',
  'Span V',
  'Span W',
  'Span X',
  'Span Y',
  'Span Z',
  'Girder 1',
  'Girder 2',
  'Girder 3',
  'Girder 4',
  'Girder 5',
  'Girder 6',
  'Girder 7',
  'Girder 8',
  'Girder 9',
  'Girder 10',
  'Girder 11',
  'Girder 12',
  'Girder 13',
  'Girder 14',
  'Girder 15',
  'Girder 16',
  'Girder 17',
  'Girder 18',
  'Girder 19',
  'Girder 20',
  'Pier 2',
  'Pier 3',
  'Pier 4',
  'Pier 5',
  'Pier 6',
  'Pier 7',
  'Pier 8',
  'Pier 9',
  'Pier 10',
  'Pier 11',
  'Pier 12',
  'Pier 13',
  'Pier 14',
  'Pier 15',
  'Pier 16',
  'Pier 17',
  'Pier 18',
  'Pier 19',
  'Pier 20',
  'Column 1',
  'Column 2',
  'Column 3',
  'Column 4',
  'Column 5',
  'Column 6',
  'Column 7',
  'Column 8',
  'Column 9',
  'Column 10',
  'Column 11',
  'Column 12',
  'Column 13',
  'Column 14',
  'Column 15',
  'Column 16',
  'Column 17',
  'Column 18',
  'Column 19',
  'Column 20',
  'Bearing 1',
  'Bearing 2',
  'Bearing 3',
  'Bearing 4',
  'Bearing 5',
  'Bearing 6',
  'Bearing 7',
  'Bearing 8',
  'Bearing 9',
  'Bearing 10',
  'Bearing 11',
  'Bearing 12',
  'Bearing 13',
  'Bearing 14',
  'Bearing 15',
  'Bearing 16',
  'Bearing 17',
  'Bearing 18',
  'Bearing 19',
  'Bearing 20',
];

// plural check helper
function isPluralLocation(location) {
  const lowerLoc = location.toLowerCase();
  return pluralLocationsList.some((plural) => lowerLoc.includes(plural));
}

// plural check helper
function isPluralDefect(defect) {
  const lowerLoc = defect.toLowerCase();
  return pluralDefectsList.some((plural) => lowerLoc.includes(plural));
}

// singular check helper
function isSingularDefect(defect) {
  const lowerLoc = defect.toLowerCase();
  return singularDefectsList.some((singular) => lowerLoc.includes(singular));
}

// plan items helper
function isPlanLocation(location) {
  const lowerLoc = location.toLowerCase();
  return planLocationList.some((plan) => lowerLoc.includes(plan.toLowerCase()));
}

// Function to get the active button text for a given data-button-class
function getActiveButtonText(buttonClass) {
  const activeButton = document.querySelector(
    `button[data-button-class="${buttonClass}"].active`
  );
  return activeButton ? activeButton.textContent.trim().toLowerCase() : '';
}

let setIndex = 0;
// --- Build Report ---
function buildReport() {
  let quantity = getActiveButtonText('quantity-buttons');
  if (quantity === 'x') quantity = '';
  let severity = getActiveButtonText('severity-buttons');
  if (severity === 'x') severity = '';
  const templateText = getActiveButtonText('template-buttons');
  const templateNumberMatch = templateText.match(/\d+$/);
  const templateNumber = templateNumberMatch
    ? parseInt(templateNumberMatch[0], 10)
    : 1;
  const defect = document.getElementById('txt01-textarea').value.trim();
  const location = document.getElementById('txt02-textarea').value.trim();
  const details = document.getElementById('txt03-textarea').value.trim();
  const locationHasHave = isPluralLocation(location) ? 'have' : 'has';
  const defectIsAre = isPluralDefect(defect) ? 'are' : 'is';
  const set = templateSets[setIndex];
  // --- Select correct template group ---
  let templateGroup;
  if (!location && !details) {
    templateGroup = set.noDetailsLocation; // both blank
  } else if (!location) {
    templateGroup = set.noLocation; // location blank
  } else if (!details) {
    templateGroup = set.noDetails; // details blank
  } else {
    templateGroup = set.withDetails; // both present
  }
  const templateFn = templateGroup[templateNumber] || templateGroup.default;
  // --- Build the base report ---
  let report = templateFn(
    quantity,
    severity,
    defect,
    location,
    details,
    locationHasHave,
    defectIsAre
  );
  // --- Singular defect override ---
  // const isSingular = isSingularDefect(defect);
  const activeQuantityButton = document.querySelector(
    '[data-button-class="quantity-buttons"].active'
  );
  const defectTrimmed = defect.trim().toLowerCase();
  // Exact full match only — no partials like "spalling"
  const singularMatch = singularDefectsList.some(
    (d) => defectTrimmed === d.toLowerCase()
  );
  if (
    singularMatch &&
    activeQuantityButton?.textContent.trim().toLowerCase() === 'isolated'
  ) {
    switch (templateNumber) {
      case 1:
      case 7:
        break;
      case 2:
      case 3:
      case 4:
      case 6:
        report = report.replace(/\bisolated\b/i, 'an isolated');
        break;
      case 5:
        report = report
          .replace(/\bdefects,\s*mainly\b/i, 'defect, a')
          .replace(/\bisolated\b/i, 'an isolated');
        break;
    }
  }
  // --- Plan defect override ---
  const isPlan = isPlanLocation(location);
  if (isPlan) {
    // Now adjust text in the final sentence
    switch (templateNumber) {
      case 1:
      case 7:
        // (none)
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        report = report.replace(/\bthe\b/i, '');
        break;
    }
  }
  // --- Cleanup ---
  report = report.replace(/\s{2,}/g, ' ');
  report = report.replace(/\.{2,}/g, '.');
  if (report.trim().length > 0) {
    report = report.replace(/^\s+/, '');
    const first = report.charAt(0).toUpperCase();
    const rest = report.slice(1);
    report = first + rest;
  }
  // --- Update global array ---
  let entry = reportEntries[activeIndex];
  entry.quantity = quantity;
  entry.severity = severity;
  entry.defect = defect;
  entry.location = location;
  entry.details = details;
  entry.template = `T${templateNumber}`;
  entry.comment = report;
  // rating update
  const activeId = reportEntries[activeIndex].id;
  const rating = getRating(quantity, severity);
  reportEntries[activeIndex].rating = rating;
  reportEntries[activeIndex].comment = report;
  // sort worst → best
  reportEntries.sort((a, b) => b.rating - a.rating);
  // restore activeIndex by ID
  activeIndex = reportEntries.findIndex((defect) => defect.id === activeId);
  // --- Final joined report ---
  const finalReport = reportEntries.map((e) => e.comment).join(' ');
  return finalReport;
}

// Function to update txt04-textarea
function updateReport() {
  const reportArea = document.getElementById('txt04-textarea');
  reportArea.value = buildReport();
}

function normalizeLocationCase() {
  const locationBox2 = document.getElementById('txt02-textarea');
  if (!locationBox2) return;
  const typed = locationBox2.value.trim();
  if (!typed) return;
  // Match canonical list case-insensitively
  const match = pluralLocationsList.find(
    (loc) => loc.toLowerCase() === typed.toLowerCase()
  );
  if (match) {
    locationBox2.value = match; // replace with proper case
  }
}

const locationBox2 = document.getElementById('txt02-textarea');
locationBox2.addEventListener('blur', normalizeLocationCase);
// Optional: for accepting predictive text via arrow/tab
locationBox2.addEventListener('keydown', (e) => {
  if (
    e.code === 'ArrowRight' ||
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowUp' ||
    e.code === 'ArrowDown' ||
    e.code === 'Tab'
  ) {
    setTimeout(normalizeLocationCase, 0); // run after the browser updates value
  }
});

// Add event listeners to all template buttons
document
  .querySelectorAll('.quantity-buttons, .severity-buttons, .template-buttons')
  .forEach((button) => {
    button.addEventListener('click', () => {
      updateReport();
    });
    button.addEventListener('focus', () => {
      updateReport();
    });
  });
// Add event listeners to textareas for live typing updates
['txt01-textarea', 'txt02-textarea', 'txt03-textarea'].forEach((id) => {
  const textarea = document.getElementById(id);
  textarea.addEventListener('input', updateReport);
});
// Initialize on page load
window.addEventListener('DOMContentLoaded', updateReport);

// :::: (Template Functions) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Your lists
const defectsList = [
  'abrasion',
  'an area of',
  'beam end deterioration',
  'bearing misalignment',
  'chalking',
  'collision damage',
  'corrosion',
  'cracking',
  'cracking and delamination',
  'cracking with efflorescence',
  'deep spalling',
  'deformation',
  'delamination',
  'deterioration',
  'diagonal cracking',
  'differential settlement',
  'efflorescence',
  'efflorescence buildup',
  'erosion',
  'honeycombing',
  'horizontal cracking',
  'horizontal cracking with efflorescence',
  'leakage',
  'longitudinal cracking',
  'longitudinal cracking with efflorescence',
  'map cracking',
  'map cracking with efflorescence',
  'out-of-plane bending',
  'pack rust',
  'paint peeling',
  'patching',
  'pattern cracking',
  'pattern cracking with efflorescence',
  'pitting',
  'random cracking',
  'rideability issues',
  'rust scaling',
  'rutting',
  'scaling',
  'scour',
  'section loss',
  'settlement',
  'shallow-depth spalling',
  'shallow-depth spalling with delamination',
  'shallow-depth spalling with delamination and exposed rebar',
  'shallow-depth spalling with exposed rebar',
  'shallow tining',
  'slump',
  'spalling',
  'surface dulling',
  'surface spalling',
  'transverse cracking',
  'transverse cracking with efflorescence',
  'undermining',
  'uniform settlement',
  'vertical cracking',
  'wear',
];
const locationsList = [
  'abutment backwalls',
  'abutments',
  'approach slabs',
  'approach span',
  'arch ring',
  'attenuators',
  'backwalls',
  'barrel',
  'barrier walls',
  'beam ends',
  'beams',
  'bearing pad',
  'bearings',
  'box',
  'box beams',
  'breast wall',
  'bridge railing',
  'bridge seat',
  'channel',
  'cheek wall',
  'columns',
  'coping',
  'concrete barrier walls',
  'cover plate',
  'crash walls',
  'cross bracing',
  'curbs',
  'curtain wall',
  'deck',
  'deck underside',
  'diaphragms',
  'downspouts',
  'east abutment',
  'east approach slab',
  'east railing',
  'end bents',
  'expansion joints',
  'floor beams',
  'footing',
  'girders',
  'guardrail',
  'headwalls',
  'interior piers',
  'invert',
  'joint nosing',
  'joints',
  'lower chord',
  'lower flange',
  'MSE walls',
  'north abutment',
  'north approach slab',
  'north railing',
  'overlay',
  'pier caps',
  'pier columns',
  'pier walls',
  'piers',
  'pin-and-hinge assemblies',
  'retaining walls',
  'riprap',
  'shelf plates',
  'sidewalks',
  'south abutment',
  'south approach slab',
  'south railing',
  'slopewall',
  'spandrel wall',
  'splice plates',
  'stay-in-place forms',
  'stringers',
  'stiffeners',
  'substructure',
  'superstructure',
  'terminal joint',
  'thin deck overlay',
  'top of the deck',
  'transition railing',
  'underside of the deck',
  'wearing surface',
  'west abutment',
  'west approach slab',
  'west railing',
  'wingwall',
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
  // collect all matches (case-insensitive)
  state.matches = list.filter((item) =>
    item.toLowerCase().startsWith(beforeCaret.toLowerCase())
  );

  if (state.matches.length > 0 && beforeCaret.length > 0) {
    const match = state.matches[state.index] || state.matches[0];

    // preserve the exact typed case for the prefix
    textarea.value = beforeCaret + match.slice(beforeCaret.length);

    textarea.selectionStart = beforeCaret.length;
    textarea.selectionEnd = match.length;
    state.lastTyped = beforeCaret;
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
    lastTyped: '',
  };
  textarea.addEventListener('input', () => {
    state.index = 0;
    autoComplete(textarea, list, state);
  });
  textarea.addEventListener('keydown', (e) => {
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;
    const val = textarea.value;
    // Accept suggestion on Tab or ArrowRight
    if (
      (e.key === 'Tab' || e.key === 'ArrowRight') &&
      selStart !== selEnd &&
      selStart === state.lastTyped.length &&
      selEnd === val.length
    ) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd; // collapse to end
    }
    // Backspace: only override if caret is at end and selection is the suggestion
    if (
      e.key === 'Backspace' &&
      selStart !== selEnd &&
      selStart === state.lastTyped.length &&
      selEnd === val.length
    ) {
      e.preventDefault();
      state.lastTyped = state.lastTyped.slice(0, -1);
      textarea.value = state.lastTyped;
      textarea.selectionStart = textarea.selectionEnd = state.lastTyped.length;
      state.index = 0;
      autoComplete(textarea, list, state);
    }
    // Delete: only override if caret is at end and selection is the suggestion
    if (
      e.key === 'Delete' &&
      selStart !== selEnd &&
      selStart === state.lastTyped.length &&
      selEnd === val.length
    ) {
      e.preventDefault();
      textarea.value = state.lastTyped;
      textarea.selectionStart = textarea.selectionEnd = state.lastTyped.length;
      state.matches = [];
      state.index = 0;
    }
    // Alt: cycle through matches
    if (e.key === 'Alt' && state.matches.length > 1) {
      e.preventDefault();
      state.index = (state.index + 1) % state.matches.length;
      textarea.value = state.matches[state.index];
      textarea.selectionStart = state.lastTyped.length;
      textarea.selectionEnd = state.matches[state.index].length;
    } else if (e.key === 'Alt') {
      e.preventDefault();
    }
    updateReport();
  });
}
// hook up your textareas
const defectBox = document.getElementById('txt01-textarea');
if (defectBox) attachAutoComplete(defectBox, defectsList);
const locationBox = document.getElementById('txt02-textarea');
if (locationBox) attachAutoComplete(locationBox, locationsList);

// :::: (Typing Shortcuts For Quantity/Severity Pairs) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Map of hotkeys to sequences of combos
const hotkeyCombos = {
  9: [
    {
      quantity: 'Isolated',
      severity: 'Inherent',
      details: 'no deficiencies or significant defects found',
    },
  ],
  8: [
    {
      quantity: 'Some',
      severity: 'Inherent',
      details: 'no deficiencies or significant defects found',
    },
    {
      quantity: 'Widespread',
      severity: 'Inherent',
      details: 'no deficiencies or significant defects found',
    },
    {
      quantity: 'Isolated',
      severity: 'Minor',
      details: 'no deficiencies or significant defects found',
    },
  ],
  7: [{ quantity: 'Some', severity: 'Minor' }],
  6: [
    { quantity: 'Widespread', severity: 'Minor' },
    { quantity: 'Isolated', severity: 'Moderate' },
  ],
  5: [
    {
      quantity: 'Some',
      severity: 'Moderate',
      details: 'strength and performance are not affected',
    },
  ],
  4: [
    {
      quantity: 'Widespread',
      severity: 'Moderate',
      details: 'strength and/or performance are affected',
    },
    {
      quantity: 'Isolated',
      severity: 'Major',
      details: 'strength and/or performance are affected',
    },
  ],
  x: [
    { quantity: 'X', severity: 'Minor' },
    { quantity: 'Some', severity: 'X' },
    { quantity: 'X', severity: 'X' },
  ],
};
// Track indices per key so each hotkey cycles separately
const hotkeyIndex = {};
// Collect all hotkey detail strings for cleanup
const allHotkeyDetails = [];
Object.values(hotkeyCombos).forEach((comboArr) => {
  comboArr.forEach((c) => {
    if (c.details) allHotkeyDetails.push(c.details);
  });
});
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
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
    // Initialize index for first press
    if (!hotkeyIndex[key] && hotkeyIndex[key] !== 0) hotkeyIndex[key] = 0;
    const combos = hotkeyCombos[key];
    const combo = combos[hotkeyIndex[key]];
    // Increment index for next press, wrap to 0 if at end
    hotkeyIndex[key] = (hotkeyIndex[key] + 1) % combos.length;
    // Focus quantity button
    const qtyBtn = Array.from(
      document.querySelectorAll('[data-button-class="quantity-buttons"]')
    ).find((btn) => btn.textContent.trim() === combo.quantity);
    if (qtyBtn) qtyBtn.focus();
    // Focus severity button
    const sevBtn = Array.from(
      document.querySelectorAll('[data-button-class="severity-buttons"]')
    ).find((btn) => btn.textContent.trim() === combo.severity);
    if (sevBtn) sevBtn.focus();
    // Handle details textarea
    const detailsBox = document.getElementById('txt03-textarea');
    if (detailsBox) {
      let currentText = detailsBox.value;
      // Remove any previously added hotkey details
      allHotkeyDetails.forEach((d) => {
        const regex = new RegExp(d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        currentText = currentText.replace(regex, '');
      });
      // Clean up extra spaces
      currentText = currentText.replace(/\s{2,}/g, ' ').trim();
      // Append new details if present
      if (combo.details) {
        currentText = currentText
          ? `${currentText}; ${combo.details}`
          : combo.details;
      }
      // ALWAYS clean up duplicate or trailing semicolons
      currentText = currentText
        .replace(/;;+/g, ';')
        .replace(/^\s*;\s*|\s*;\s*$/g, '');
      detailsBox.value = currentText;
    }
    // Update the report after hotkey
    updateReport();
  }
});

// :::: (Add Defect) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const buttonAdd = document.getElementById('addDefectButton');
// Handle a real click
buttonAdd.addEventListener('click', function (evt) {
  openTab(evt); // calls your existing openTab function
  addReportEntry();
});
// Optional: explicitly handle Enter or Space if needed (usually not necessary)
buttonAdd.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter' || evt.code === 'Space') {
    evt.preventDefault(); // prevent scrolling for Space
    openTab({ currentTarget: buttonAdd }); // simulate a click
    addReportEntry();
  }
});

// :::: (Change Defect) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const buttonChange = document.getElementById('changeDefectButton');
// Handle a real click
buttonChange.addEventListener('click', function (evt) {
  openTab(evt); // calls your existing openTab function
  cycleReportEntry();
});
// Optional: explicitly handle Enter or Space if needed (usually not necessary)
buttonChange.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter' || evt.code === 'Space') {
    evt.preventDefault(); // prevent scrolling for Space
    openTab({ currentTarget: buttonChange }); // simulate a click
    cycleReportEntry();
  }
});

// :::: (Remove Defect) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const buttonRemove = document.getElementById('removeDefectButton');
// Handle a real click
buttonRemove.addEventListener('click', function (evt) {
  openTab(evt); // calls your existing openTab function
  deleteActiveReportEntry();
});
// Optional: explicitly handle Enter or Space if needed (usually not necessary)
buttonRemove.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter' || evt.code === 'Space') {
    evt.preventDefault(); // prevent scrolling for Space
    openTab({ currentTarget: buttonRemove }); // simulate a click
    deleteActiveReportEntry();
  }
});

// :::: (Copy & Close) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const buttonClose = document.getElementById('copyCloseButton');
// Handle a real click
buttonClose.addEventListener('click', function (evt) {
  openTab(evt); // calls your existing openTab function
  copyAndClose();
});
// Optional: explicitly handle Enter or Space if needed (usually not necessary)
buttonClose.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter' || evt.code === 'Space') {
    evt.preventDefault(); // prevent scrolling for Space
    openTab({ currentTarget: buttonClose }); // simulate a click
    copyAndClose();
  }
});

// :::: (Change Template Defaults) // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Function to cycle template set
function cycleTemplateSet() {
  setIndex = (setIndex + 1) % templateSets.length;
  updateReport(); // rebuild using the new template set
}
// Select all template buttons
const templateButtons = document.querySelectorAll(
  '[data-button-class="template-buttons"]'
);
// Attach listeners to each
templateButtons.forEach((btn) => {
  // Handle click
  btn.addEventListener('click', (evt) => {
    openTab(evt); // your existing tab behavior
    cycleTemplateSet();
  });
  // Handle Enter or Space keys
  btn.addEventListener('keydown', (evt) => {
    if (evt.code === 'Enter' || evt.code === 'Space') {
      evt.preventDefault(); // prevent default spacebar scroll
      cycleTemplateSet();
    }
  });
});
