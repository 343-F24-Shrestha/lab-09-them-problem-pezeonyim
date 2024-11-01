///////////////////////////////////////////////////////////////////////////////
// you shouldn't need to edit this first little bit
function toggleLoader(subject) {
  document.getElementById(`${subject}-loader`).classList.toggle('hidden');
}

function noCommaToTheTop(s) {
  return s.replaceAll("'", '');
}

function updateRadio(options) {
  const form = document.getElementById('just-bc');
  form.innerHTML = '';
  let yous = '';
  for (let opt of options) {
    yous += `<label for="${noCommaToTheTop(opt)}"><input type="radio" name="you" id="${noCommaToTheTop(opt)}">${opt}</label>`;
  }
  form.innerHTML = yous;
}

// this ends the little bit you shouldn't need to edit.
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// below is code that you may need to edit

function getYous() {
  return ["poppin'", "packin'"];
}

function getThey(you) {
  const options = {
    "poppin'": "stoppin'",
    "packin'": "lackin'",
  };
  let result = null;
  if (options[you]) {
    result = options[you];
  }
  return result;
}

async function init(ev) {
  toggleLoader('you'); // Show loader
  const options = await getOptions(); 
  updateRadio(options); // Update radio buttons
  toggleLoader('you'); // Hide loader

  // Add event listeners to the radio buttons
  document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener('change', changed);
  });
}

async function changed(ev) {
  console.debug('fyi, this is what a change event looks like', ev);
  const you = ev.target.parentElement.textContent.trim(); // Get the selected radio button’s value

  toggleLoader('they'); // Show loader 
  const they = await getThemProblem(you); // Get the matching value
  const output = document.getElementById('they'); // Select the output element
  output.textContent = they; //
  toggleLoader('they'); // Hide loader
}

document.addEventListener("DOMContentLoaded", init);