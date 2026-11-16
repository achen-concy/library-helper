const form = document.getElementById("reserveForm");
const formMessage = document.getElementById("formMessage");
const resourceSelect = document.getElementById("resourceId");
const pickupDate = document.getElementById("pickupDate");

function populateResources() {
  const chosenId = new URLSearchParams(window.location.search).get("id");

  resourceSelect.innerHTML = '<option value="">-- Select --</option>';

  resources.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.title + (item.available ? "" : " (waiting list)");
    if (String(item.id) === chosenId) opt.selected = true;
    resourceSelect.appendChild(opt);
  });
}

function setError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
  document.getElementById(fieldId).setAttribute("aria-invalid", message ? "true" : "false");
}

function validateReservationForm() {
  let valid = true;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const userType = document.getElementById("userType").value;
  const resource = resourceSelect.value;
  const date = pickupDate.value;

  setError("fullName", "");
  setError("email", "");
  setError("userType", "");
  setError("resourceId", "");
  setError("pickupDate", "");

  if (name.length < 3) {
    setError("fullName", "Enter your full name (at least 3 characters).");
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter a valid email address.");
    valid = false;
  }
  if (userType === "") {
    setError("userType", "Select who you are.");
    valid = false;
  }
  if (resource === "") {
    setError("resourceId", "Choose a resource.");
    valid = false;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date === "") {
    setError("pickupDate", "Choose a pick-up date.");
    valid = false;
  } else if (date < today) {
    setError("pickupDate", "The date cannot be in the past.");
    valid = false;
  }

  return valid;
}

function generateReference() {
  return "RES-" + Math.floor(1000 + Math.random() * 9000);
}

function submitReservation(event) {
  event.preventDefault();
  formMessage.hidden = false;

  if (!validateReservationForm()) {
    formMessage.className = "message message-error";
    formMessage.textContent = "Please fix the errors below and try again.";
    return;
  }

  const book = resources.find(function (resource) {
    return resource.id === Number(resourceSelect.value);
  });

  formMessage.className = "message message-success";
  formMessage.textContent =
    "Request received! Reference " + generateReference() + ' for "' + book.title + '". ' +
    (book.available
      ? "Pick up on " + pickupDate.value + "."
      : "You are on the waiting list.");

  form.reset();
  populateResources();
}

form.addEventListener("submit", submitReservation);
pickupDate.min = new Date().toISOString().split("T")[0];
populateResources();
