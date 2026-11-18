/* =========================================================================
   JAVASCRIPT CONTROLLER (Multi-Page Mobile & Offline Engine)
   Platform: GramaShiksha - Digital Learning Platform for Rural Schools
   ========================================================================= */

let currentStudent = null;
let isKannada = false;

let studentRoster = [
  { usn: "2TG25CS014", name: "Deepa V Desai", email: "deepa@tce.edu", phone: "9876543210", mascot: "Lion", score: 20, stars: 20, quizzesDone: 1, badge: "Silver Star" },
  { usn: "2TG25CS024", name: "Keerti I Butanavar", email: "keerti@tce.edu", phone: "9876543211", mascot: "Elephant", score: 30, stars: 30, quizzesDone: 2, badge: "Gold Star" },
  { usn: "2TG25CS033", name: "Nagaveni P. G", email: "nagaveni@tce.edu", phone: "9876543212", mascot: "Peacock", score: 10, stars: 10, quizzesDone: 1, badge: "Bronze Star" },
  { usn: "2TG25CS049", name: "Priya M Belavanaki", email: "priya@tce.edu", phone: "9876543213", mascot: "Lion", score: 20, stars: 20, quizzesDone: 1, badge: "Silver Star" }
];

const dictionary = {
  EN: {
    subtitle: "Offline Rural Learning Hub",
    langBtn: "ಕನ್ನಡ",
    banner: "Offline Mode Active • Zero Internet Required",
    regHeading: "Student Login",
    regDesc: "Enter your details and pick an animal avatar to start learning!",
    lblName: "Student Full Name",
    lblUsn: "Roll No / USN",
    lblEmail: "Email ID",
    lblPhone: "Phone Number",
    lblPassword: "Password",
    lblAvatar: "Select Animal Avatar",
    btnStart: "🚀 Login & Start Learning",
    lblModules: "Learning Activities (ABL)",
    mathTitle: "Math Activity",
    mathDesc: "Fruit counting & multiplication puzzles",
    sciTitle: "General Science",
    sciDesc: "Sunlight, plants & clean water trivia",
    langTitle: "Language Arts",
    langDesc: "Kannada to English word matching",
    navHome: "Home",
    navQuizzes: "Quizzes",
    navProgress: "Progress",
    navTeacher: "Teacher"
  },
  KN: {
    subtitle: "ಗ್ರಾಮೀಣ ಆಫ್‌ಲೈನ್ ಕಲಿಕಾ ಕೇಂದ್ರ",
    langBtn: "English",
    banner: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯ • ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ",
    regHeading: "ವಿದ್ಯಾರ್ಥಿ ಲಾಗಿನ್",
    regDesc: "ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ!",
    lblName: "ವಿದ್ಯಾರ್ಥಿಯ ಪೂರ್ಣ ಹೆಸರು",
    lblUsn: "ರೋಲ್ ನಂ / USN",
    lblEmail: "ಇಮೇಲ್ ಐಡಿ",
    lblPhone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    lblPassword: "ಪಾಸ್‌ವರ್ಡ್",
    lblAvatar: "ನಿಮ್ಮ ಇಷ್ಟದ ಪ್ರಾಣಿ ಅವತಾರ",
    btnStart: "🚀 ಲಾಗಿನ್ ಮತ್ತು ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ",
    lblModules: "ಚಟುವಟಿಕೆ ಆಧಾರಿತ ಕಲಿಕೆ (ABL)",
    mathTitle: "ಗಣಿತ ಚಟುವಟಿಕೆ",
    mathDesc: "ಹಣ್ಣಿನ ತೋಟದ ಲೆಕ್ಕ ಮತ್ತು ಗುಣಾಕಾರ ಒಗಟುಗಳು",
    sciTitle: "ಪರಿಸರ ವಿಜ್ಞಾನ",
    sciDesc: "ಸಸ್ಯಗಳು, ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ಗಾಳಿಯ ಮಾಹಿತಿ",
    langTitle: "ಭಾಷಾ ಕೌಶಲ್ಯ",
    langDesc: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಪದಗಳ ಹೊಂದಾಣಿಕೆ",
    navHome: "ಮುಖಪುಟ",
    navQuizzes: "ರಸಪ್ರಶ್ನೆ",
    navProgress: "ಪ್ರಗತಿ",
    navTeacher: "ಶಿಕ್ಷಕರು"
  }
};

const mascotMap = { "Lion": "🦁", "Elephant": "🐘", "Peacock": "🦚" };

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

// Page Switcher (handles all 8 pages cleanly)
function showPage(pageId) {
  document.querySelectorAll(".page-view").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setActiveTab(tabId) {
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// Language Switcher
function updateLanguage() {
  const t = isKannada ? dictionary.KN : dictionary.EN;
  document.getElementById("txtSubtitle").innerText = t.subtitle;
  document.getElementById("lblLang").innerText = t.langBtn;
  document.getElementById("txtOfflineBanner").innerText = t.banner;
  document.getElementById("regHeading").innerText = t.regHeading;
  document.getElementById("regDesc").innerText = t.regDesc;
  document.getElementById("lblInputName").innerText = t.lblName;
  document.getElementById("lblInputUsn").innerText = t.lblUsn;
  document.getElementById("lblInputEmail").innerText = t.lblEmail;
  document.getElementById("lblInputPhone").innerText = t.lblPhone;
  document.getElementById("lblInputPassword").innerText = t.lblPassword;
  document.getElementById("lblChooseAvatar").innerText = t.lblAvatar;
  document.getElementById("btnStartLearning").innerText = t.btnStart;
  document.getElementById("lblModulesTitle").innerText = t.lblModules;
  document.getElementById("txtMathTitle").innerText = t.mathTitle;
  document.getElementById("txtMathDesc").innerText = t.mathDesc;
  document.getElementById("txtSciTitle").innerText = t.sciTitle;
  document.getElementById("txtSciDesc").innerText = t.sciDesc;
  document.getElementById("txtLangTitle").innerText = t.langTitle;
  document.getElementById("txtLangDesc").innerText = t.langDesc;
  document.getElementById("txtNavHome").innerText = t.navHome;
  document.getElementById("txtNavQuizzes").innerText = t.navQuizzes;
  document.getElementById("txtNavProgress").innerText = t.navProgress;
  document.getElementById("txtNavTeacher").innerText = t.navTeacher;
}

document.getElementById("btnLangToggle").addEventListener("click", () => {
  isKannada = !isKannada;
  updateLanguage();
  showToast(isKannada ? "ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆಯಾಗಿದೆ" : "Switched to English");
});

// Avatar Selector
const avatarCards = document.querySelectorAll(".avatar-card");
avatarCards.forEach(card => {
  card.addEventListener("click", () => {
    avatarCards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

// Page 1: Login / Registration Form
const formRegister = document.getElementById("formRegister");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("inputName").value.trim();
  const usn = document.getElementById("inputUsn").value.trim().toUpperCase();
  const email = document.getElementById("inputEmail").value.trim();
  const phone = document.getElementById("inputPhone").value.trim();
  const mascot = document.querySelector('input[name="mascot"]:checked').value;

  let existing = studentRoster.find(s => s.usn === usn);
  if (existing) {
    existing.name = name;
    existing.email = email;
    existing.phone = phone;
    existing.mascot = mascot;
    currentStudent = existing;
  } else {
    currentStudent = {
      usn, name, email, phone, mascot,
      score: 0, stars: 0, quizzesDone: 0, badge: "Beginner"
    };
    studentRoster.push(currentStudent);
  }

  updateDashboard();
  setActiveTab("tabHome");
  showPage("viewHome");
  showToast(`Welcome ${name}!`);
});

function updateDashboard() {
  if (!currentStudent) return;
  document.getElementById("dispName").innerText = currentStudent.name;
  document.getElementById("dispUsn").innerText = `USN: ${currentStudent.usn}`;
  document.getElementById("dispContact").innerText = `${currentStudent.email} • ${currentStudent.phone}`;
  document.getElementById("dispAvatar").innerText = mascotMap[currentStudent.mascot] || "🦁";
  document.getElementById("dispStars").innerText = `${currentStudent.stars} ⭐`;
  document.getElementById("dispBadge").innerText = currentStudent.badge;
  document.getElementById("statCompleted").innerText = `${currentStudent.quizzesDone}/3`;
  document.getElementById("statScore").innerText = `${currentStudent.score}/60`;

  // Update Progress Badges
  document.getElementById("badgeBronze").classList.toggle("unlocked", currentStudent.stars >= 10);
  document.getElementById("badgeSilver").classList.toggle("unlocked", currentStudent.stars >= 20);
  document.getElementById("badgeGold").classList.toggle("unlocked", currentStudent.stars >= 30);
}

function calculateBadge() {
  if (!currentStudent) return;
  if (currentStudent.stars >= 30) currentStudent.badge = "Gold Star";
  else if (currentStudent.stars >= 20) currentStudent.badge = "Silver Star";
  else if (currentStudent.stars >= 10) currentStudent.badge = "Bronze Star";
  else currentStudent.badge = "Beginner";
}

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  currentStudent = null;
  formRegister.reset();
  setActiveTab("tabHome");
  showPage("viewRegister");
  showToast("Logged out successfully");
});

// Quick buttons & Back buttons
document.getElementById("btnGoQuizzes").addEventListener("click", () => {
  setActiveTab("tabQuizzes");
  showPage("viewQuizzes");
});

document.getElementById("btnGoProgress").addEventListener("click", () => {
  setActiveTab("tabProgress");
  showPage("viewProgress");
});

document.querySelectorAll(".btn-back").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.back));
});

// Open Fresh Quiz Pages
document.getElementById("btnOpenMath").addEventListener("click", () => showPage("viewMathQuiz"));
document.getElementById("btnOpenSci").addEventListener("click", () => showPage("viewSciQuiz"));
document.getElementById("btnOpenLang").addEventListener("click", () => showPage("viewLangQuiz"));

// Page 4: Math Quiz Submission
document.getElementById("btnSubmitMath").addEventListener("click", () => {
  const a1 = parseInt(document.getElementById("ansMath1").value);
  const a2 = parseInt(document.getElementById("ansMath2").value);
  const fb1 = document.getElementById("fbMath1");
  const fb2 = document.getElementById("fbMath2");

  let earned = 0;
  if (a1 === 15) { fb1.innerText = "✓ Correct! (+10)"; fb1.style.color = "#059669"; earned += 10; }
  else { fb1.innerText = "✗ Correct Answer: 15"; fb1.style.color = "#e11d48"; }

  if (a2 === 24) { fb2.innerText = "✓ Correct! (+10)"; fb2.style.color = "#059669"; earned += 10; }
  else { fb2.innerText = "✗ Correct Answer: 24"; fb2.style.color = "#e11d48"; }

  if (currentStudent) {
    currentStudent.score = Math.min(60, currentStudent.score + earned);
    currentStudent.stars += earned;
    currentStudent.quizzesDone = Math.min(3, currentStudent.quizzesDone + 1);
    calculateBadge();
    updateDashboard();
  }
  showToast(`Math Quiz done! +${earned} Stars ⭐`);
});

// Page 5: Science Quiz Submission
document.getElementById("btnSubmitSci").addEventListener("click", () => {
  const s1 = document.querySelector('input[name="sci1"]:checked')?.value;
  const s2 = document.querySelector('input[name="sci2"]:checked')?.value;
  const fb1 = document.getElementById("fbSci1");
  const fb2 = document.getElementById("fbSci2");

  let earned = 0;
  if (s1 === "Sunlight") { fb1.innerText = "✓ Correct! (+10)"; fb1.style.color = "#059669"; earned += 10; }
  else { fb1.innerText = "✗ Correct Answer: Sunlight"; fb1.style.color = "#e11d48"; }

  if (s2 === "Oxygen") { fb2.innerText = "✓ Correct! (+10)"; fb2.style.color = "#059669"; earned += 10; }
  else { fb2.innerText = "✗ Correct Answer: Oxygen"; fb2.style.color = "#e11d48"; }

  if (currentStudent) {
    currentStudent.score = Math.min(60, currentStudent.score + earned);
    currentStudent.stars += earned;
    currentStudent.quizzesDone = Math.min(3, currentStudent.quizzesDone + 1);
    calculateBadge();
    updateDashboard();
  }
  showToast(`Science Quiz done! +${earned} Stars ⭐`);
});

// Page 6: Language Quiz Submission
document.getElementById("btnSubmitLang").addEventListener("click", () => {
  const l1 = document.querySelector('input[name="lang1"]:checked')?.value;
  const l2 = document.querySelector('input[name="lang2"]:checked')?.value;
  const fb1 = document.getElementById("fbLang1");
  const fb2 = document.getElementById("fbLang2");

  let earned = 0;
  if (l1 === "Water") { fb1.innerText = "✓ Correct! (+10)"; fb1.style.color = "#059669"; earned += 10; }
  else { fb1.innerText = "✗ Correct Answer: Water"; fb1.style.color = "#e11d48"; }

  if (l2 === "Book") { fb2.innerText = "✓ Correct! (+10)"; fb2.style.color = "#059669"; earned += 10; }
  else { fb2.innerText = "✗ Correct Answer: Book"; fb2.style.color = "#e11d48"; }

  if (currentStudent) {
    currentStudent.score = Math.min(60, currentStudent.score + earned);
    currentStudent.stars += earned;
    currentStudent.quizzesDone = Math.min(3, currentStudent.quizzesDone + 1);
    calculateBadge();
    updateDashboard();
  }
  showToast(`Language Quiz done! +${earned} Stars ⭐`);
});

// Page 7: Offline Storage
document.getElementById("btnSaveOffline").addEventListener("click", () => {
  if (!currentStudent) { showToast("Please login first!"); return; }
  localStorage.setItem("gramashiksha_student", JSON.stringify(currentStudent));
  showToast("Progress saved to device storage!");
});

// 4-Tab Bottom Navigation
document.getElementById("tabHome").addEventListener("click", () => {
  setActiveTab("tabHome");
  showPage(currentStudent ? "viewHome" : "viewRegister");
});

document.getElementById("tabQuizzes").addEventListener("click", () => {
  if (!currentStudent) { showToast("Please login first!"); showPage("viewRegister"); return; }
  setActiveTab("tabQuizzes");
  showPage("viewQuizzes");
});

document.getElementById("tabProgress").addEventListener("click", () => {
  if (!currentStudent) { showToast("Please login first!"); showPage("viewRegister"); return; }
  setActiveTab("tabProgress");
  updateDashboard();
  showPage("viewProgress");
});

document.getElementById("tabTeacher").addEventListener("click", () => {
  setActiveTab("tabTeacher");
  renderRosterTable();
  showPage("viewTeacher");
});

// Page 8: Teacher Roster & CSV Export
function renderRosterTable() {
  const tbody = document.getElementById("tableRosterBody");
  tbody.innerHTML = "";
  studentRoster.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; font-family:monospace;">${s.usn}</td>
      <td style="font-weight:600;">${s.name}</td>
      <td>${s.phone}</td>
      <td>${mascotMap[s.mascot] || "🦁"} ${s.mascot}</td>
      <td style="text-align:center; font-weight:700; color:#059669;">${s.score}/60</td>
      <td style="text-align:center; font-weight:700; color:#d97706;">${s.stars} ⭐</td>
      <td><span class="rank-badge">${s.badge}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btnDownloadCsv").addEventListener("click", () => {
  let csv = "USN,StudentName,Email,Phone,Mascot,Score,Stars,Badge\n";
  studentRoster.forEach(s => {
    csv += `${s.usn},${s.name},${s.email},${s.phone},${s.mascot},${s.score},${s.stars},${s.badge}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rural_school_records.csv";
  a.click();
  showToast("Exported 'rural_school_records.csv'!");
});

// Initialize
updateLanguage();
