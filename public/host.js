let draftDeleteBtn;
let draftExportBtn;
let publishedDeleteBtn;
let publishedExportBtn;
let checkboxType = "draft";
document.addEventListener('DOMContentLoaded', () => {
  draftDeleteBtn = document.getElementById("draftDeleteBtn");
  draftExportBtn = document.getElementById("draftExportBtn");
  publishedDeleteBtn = document.getElementById("publishedDeleteBtn");
  publishedExportBtn = document.getElementById("publishedExportBtn");
});

function updateSelection() {
  const checkboxes = document.querySelectorAll(`.${checkboxType}-checkbox`);
  let selectedCount = 0;
  checkboxes.forEach(cb => {
    const row = cb.closest("tr");
    if (cb.checked) {
      row.classList.add("selected");
      selectedCount++;
    } else {
      row.classList.remove("selected");
    }
  });
  const show = selectedCount > 0;
  if (checkboxType === "draft") {
    draftDeleteBtn.style.display = draftExportBtn.style.display = show ? "inline-block" : "none";
  } else if (checkboxType === "published") {
    publishedDeleteBtn.style.display = publishedExportBtn.style.display = show ? "inline-block" : "none";
  }
}

document.querySelectorAll(".draft-checkbox").forEach(cb => {
  cb.addEventListener("change", () => {
    checkboxType = "draft";
    updateSelection();
  });
});

document.querySelectorAll(".published-checkbox").forEach(cb => {
  cb.addEventListener("change", () => {
    checkboxType = "published";
    updateSelection();
  });
});

function toggleGroup(groupId) {
  document.getElementById(groupId).classList.toggle("collapsed");
}

document.addEventListener("click", () => {
  document.getElementById("quizDropdown").style.display = "none";
  document.getElementById("sessionDropdown").style.display = "none";
});

let activeTab = "quiz";

document.querySelectorAll(".action-dots").forEach(dot => {
  dot.addEventListener("click", e => {
    e.stopPropagation();
    const quizDropdown = document.getElementById("quizDropdown");
    const sessionDropdown = document.getElementById("sessionDropdown");

    quizDropdown.style.display = sessionDropdown.style.display = "none";

    const rect = dot.getBoundingClientRect();
    const top = `${rect.bottom + window.scrollY}px`;
    const left = `${rect.right - 180 + window.scrollX}px`;

    if (activeTab === "quiz") {
      quizDropdown.style.top = top;
      quizDropdown.style.left = left;
      quizDropdown.style.display = "block";
    } else if (activeTab === "session") {
      sessionDropdown.style.top = top;
      sessionDropdown.style.left = left;
      sessionDropdown.style.display = "block";
    }
  });
});

const tabButtons = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(tab => {
  tab.addEventListener("click", () => {
    tabButtons.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selectedTabId = tab.dataset.tab;
    activeTab = selectedTabId.includes("session") ? "session" :
                selectedTabId.includes("questions") ? "questions" : "quiz";

    tabContents.forEach(content => {
      content.style.display = content.id === selectedTabId ? "block" : "none";
    });
  });
});

// ✅ Handle dropdown actions using delegation
document.getElementById("quizDropdown").addEventListener("click", function(e) {
  if (e.target.classList.contains("dropdown-item")) {
    handleQuizDropdownAction(e.target.innerText.trim());
  }
});

document.getElementById("sessionDropdown").addEventListener("click", function(e) {
  if (e.target.classList.contains("dropdown-item")) {
    handleSessionDropdownAction(e.target.innerText.trim());
  }
});

function handleSessionDropdownAction(action) {
  switch(action) {
    case "🕑 Start Session":
      console.log("Starting session...");
      break;
    case "📋 View Results":
      console.log("Viewing results...");
      break;
    case "📊 Session Insights":
      console.log("Viewing insights...");
      break;
    case "❌ Delete Session":
      console.log("Deleting session...");
      break;
    default:
      console.log("Unknown session dropdown action:", action);
  }
}

function handleQuizDropdownAction(action) {
  switch(action) {
    case "⬇ Import Questions":
      console.log("Importing questions...");
      break;
    case "🔍 View Sessions":
      console.log("Viewing sessions...");
      break;
    case "👥 View Participants":
      console.log("Viewing participants...");
      break;
    case "❌ Delete Quiz":
      console.log("Deleting quiz...");
      break;
    default:
      console.log("Unknown session dropdown action:", action);
  }
}
