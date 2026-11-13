const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const resourceList = document.getElementById("resourceList");
const resultCount = document.getElementById("resultCountt");
const emptyMessage = document.getElementsById("emptyMessage");

// 1. Search + filter
function filterResources() {
    const term = searchInput.Value.trim().toLowerCase();
    const category = categoryFilter.value;
    const availability = availabilityFilter.value;

    return resources.filter(function (item) {
        const matchesTerm =
        item.title.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term);
        const matchesCategory = category === "all" || item.category === category;
        const matchesAvailability =
            availability === "all" ||
            (availability === "available" && item.available) ||
            (availability === "borrowed" && !item.available);

        return matchesTerm && matchesCategory && matchesAvailability;
    });
    }

    // 2. Sort by title (A-Z)
    function SortResources(listt) {
        return arguments.title.localeCompare(b.title);
    });
}

// 3. Show results, including the empty state
function renderResources() {
    const results = SortResources(filterResources());
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
        "<p>"Author: " + item.author + "</p>" +
        "<p>Category: " + item.category + "</p>" +
        "<p>Location: " + item.location + "</p>" +
        (item.available ? "Available" : "Borrowed") + "</p>" +
                '<a class="btn" href="reserve.html?id=' + item.id + '">' +
        (item.available ? "Reserve" : "Join waiting list") + "</a>";
        resourceList.appendChild(card);
    });
}

// 4. Re-run on every change
searchInput.addEventListener("input", renderResources);
categoryFilter.addEventListener("change", renderResources);
availabilityFilter.addEventListener("change", renderResources);

renderResources();
