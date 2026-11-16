const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const resourceList = document.getElementById("resourceList");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");
console.log("Search:", searchInput);
console.log("Category:", categoryFilter);
console.log("Availability:", availabilityFilter);

function filterResources() {
    const term = 
    String(searchInput.value || "").trim().toLowerCase();
    console.log("Search input:", searchInput);
    const category = categoryFilter.value;
    const availability = availabilityFilter.value;

    return resources.filter(function (item) {
        const matchesTerm =
        item.title.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term);
        String(item.title ?? "").toLowerCase().includes(term)||
        String(item.author ?? "").toLowerCase().includes(term);
        console.log("Search value:", searchInput.value);
        item.title.toLowerCase().includes(term) ||

        item.author.toLowerCase().includes(term);
     const matchesCategory = category === "all" || item.category === category;
     const matchesAvailability =
      availability === "all" ||
      (availability === "available" && item.available === true) ||
      (availability === "borrowed" && item.available === false);

      return matchesTerm && matchesCategory && matchesAvailability;
    });
}
function sortResources(list) {
    return list.slice().sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
}
function renderResources() {
    const results = sortResources(filterResources());
    resourceList.innerHTML = "";

    if (results.length === 0) {
        emptyMessage.hidden = false;
        resultCount.textContent = "0 resources found.";
        return;
    }

    emptyMessage.hidden = true;
    resultCount.textContent = results.length + " resource(s) found.";

    results.forEach(function (item) {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML =
        "<h3>" + item.title + "</h3>" +
        "<p>Author: " + item.author + "</p>" +
        "<p>Category: " + item.category + "</p>" +
        "<p>Location: " + item.location + "</p>" +
        '<p class="status ' + (item.available ? "available" : "borrowed") + '">' +
        (item.available ? "Available" : "Borrowed") + "</p>" +
        '<a class="btn"  href="reserve.html?id=' + item.id + '">' +
        (item.available ? "Reserve" : "Join waiting list") + "</a>";
        resourceList.appendChild(card);
    });
}
 
searchInput.addEventListener("input", renderResources);
categoryFilter.addEventListener("change", renderResources);
availabilityFilter.addEventListener("change", renderResources);

renderResources();


    




