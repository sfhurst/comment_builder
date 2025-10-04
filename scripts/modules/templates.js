// --- Template Sets ---
// You can add more sets: templateSets[1], templateSets[2], etc.

// prettier-ignore
const templateSets = [
 {
   withDetails: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects: ${details}.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}: ${details}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect} in the ${location}: ${details}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present in the ${location}: ${details}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect} in the ${location}: ${details}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} in the ${location}: ${details}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${location}: ${quantity} ${severity} ${defect}; ${details}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}: ${details}.`
   },
   noLocation: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects: ${details}.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}: ${details}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect}: ${details}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present: ${details}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect}: ${details}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}: ${details}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}; ${details}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}: ${details}.`
   },
   noDetails: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect} in the ${location}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present in the ${location}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect} in the ${location}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} in the ${location}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${location}: ${quantity} ${severity} ${defect}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}.`
   },
   noDetailsLocation: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`
   },
 },

 {
   withDetails: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects; ${details}.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}; ${details}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect} in the ${location}; ${details}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present in the ${location}; ${details}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect} in the ${location}; ${details}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} in the ${location}; ${details}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${location}: ${quantity} ${severity} ${defect}; ${details}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}; ${details}.`
   },
   noLocation: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects; ${details}.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}; ${details}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect}; ${details}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present; ${details}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect}; ${details}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}; ${details}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}; ${details}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}; ${details}.`
   },
   noDetails: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect} in the ${location}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present in the ${location}.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect} in the ${location}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} in the ${location}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${location}: ${quantity} ${severity} ${defect}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `The ${location} ${locationHasHave} ${quantity} ${severity} ${defect}.`
   },
   noDetailsLocation: {
     1: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects.`,
     2: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     3: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `There ${defectIsAre} ${quantity} ${severity} ${defect}.`,
     4: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect} ${defectIsAre} present.`,
     5: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} defects, mainly ${defect}.`,
     6: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     7: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`,
     default: (quantity, severity, defect, location, details, locationHasHave, defectIsAre) =>
       `${quantity} ${severity} ${defect}.`
   },
 },
];
