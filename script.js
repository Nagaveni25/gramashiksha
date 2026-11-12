let currentStudent = null;
let isKannada = false;
let activeSubject = "math";

let studentRoster = [
  { usn: "2TG25CS014", name: "Deepa V Desai", mascot: "Lion", score: 20, stars: 20, badge: "Silver Star" },
  { usn: "2TG25CS024", name: "Keerti I Butanavar", mascot: "Elephant", score: 20, stars: 30, badge: "Gold Star" },
  { usn: "2TG25CS033", name: "Nagaveni P. G", mascot: "Peacock", score: 10, stars: 10, badge: "Bronze Star" },
  { usn: "2TG25CS049", name: "Priya M Belavanaki", mascot: "Lion", score: 20, stars: 20, badge: "Silver Star" }
];

const dictionary = {
  EN: {
    subtitle: "Offline Rural Learning Hub",
    langBtn: "ಕನ್ನಡ",
    banner: "Offline Mode Active • Zero Internet Required",
    regHeading: "Student Login",
    regDesc: "Enter your name and pick your favorite animal avatar to start learning!",
    lblName: "Student Full Name",
    lblUsn: "Roll No / USN",
    lblAvatar: "Select Animal Avatar",
    btnStart: "🚀 Start Learning",
    lblModules: "Learning Activities (ABL)",
    mathTitle: "Math Activity",
    mathDesc: "Fruit counting & multiplication puzzles",
    sciTitle: "General Science",
    sciDesc: "Sunlight, plants & clean water trivia",
    langTitle: "Language Arts",
    langDesc: "Kannada to English word matching",
    btnMath: "Start Math Quiz",
    btnSci: "Start Science Quiz",
    btnLang: "Start Word Match",
    saveTitle: "Offline Storage",
    saveDesc: "Saves your score locally to device storage.",
    navStudent: "Student",
    navTeacher: "Teacher"
  },
  KN: {
    subtitle: "ಗ್ರಾಮೀಣ ಆಫ್‌ಲೈನ್ ಕಲಿಕಾ ಕೇಂದ್ರ",
    langBtn: "English",
    banner: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯ • ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ",
    regHeading: "ವಿದ್ಯಾರ್ಥಿ ಲಾಗಿನ್",
    regDesc: "ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಹೆಸರು ಬರೆಯಿರಿ ಮತ್ತು ಪ್ರಾಣಿ ಅವತಾರ ಆಯ್ಕೆಮಾಡಿ!",
    lblName: "ವಿದ್ಯಾರ್ಥಿಯ ಪೂರ್ಣ ಹೆಸರು",
    lblUsn: "ರೋಲ್ ನಂ / USN",
    lblAvatar: "ನಿಮ್ಮ ಇಷ್ಟದ ಪ್ರಾಣಿ ಅವತಾರ",
    btnStart: "🚀 ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ",
    lblModules: "ಚಟುವಟಿಕೆ ಆಧಾರಿತ ಕಲಿಕೆ (ABL)",
    mathTitle: "ಗಣಿತ ಚಟುವಟಿಕೆ",
    mathDesc: "ಹಣ್ಣಿನ ತೋಟದ ಲೆಕ್ಕ ಮತ್ತು ಗುಣಾಕಾರ ಒಗಟುಗಳು",
    sciTitle: "ಪರಿಸರ ವಿಜ್ಞಾನ",
    sciDesc: "ಸಸ್ಯಗಳು, ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ಗಾಳಿಯ ಮಾಹಿತಿ",
    langTitle: "ಭಾಷಾ ಕೌಶಲ್ಯ",
    langDesc: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಪದಗಳ ಹೊಂದಾಣಿಕೆ",
    btnMath: "ಗಣಿತ ರಸಪ್ರಶ್ನೆ",
    btnSci: "ವಿಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ",
    btnLang: "ಪದಗಳ ಒಗಟು",
    saveTitle: "ಆಫ್‌ಲೈನ್ ಶೇಖರಣೆ",
    saveDesc: "ದಾಖಲೆಗಳನ್ನು ನೇರವಾಗಿ ಫೋನ್/ಟ್ಯಾಬ್ಲೆಟ್‌ನಲ್ಲಿ ಉಳಿಸುತ್ತದೆ.",
    navStudent: "ವಿದ್ಯಾರ್ಥಿ",
    navTeacher: "ಶಿಕ್ಷಕರು"
  }
};

const quizzes = {
  math: {
    EN: {
      title: "Numeracy Quiz",
      q1: "Q1: An orchard has 8 mango trees and 7 coconut trees. Total trees? (8 + 7 = ?)",
      q2: "Q2: A classroom has 6 desks with 4 students at each desk. Total students? (6 x 4 = ?)"
    },
    KN: {
      title: "ಗಣಿತ ಚಟುವಟಿಕೆ ರಸಪ್ರಶ್ನೆ",
      q1: "ಪ್ರಶ್ನೆ 1: ಒಂದು ತೋಟದಲ್ಲಿ 8 ಮಾವಿನ ಮರ ಮತ್ತು 7 ತೆಂಗಿನ ಮರಗಳಿವೆ. ಒಟ್ಟು ಮರಗಳು ಎಷ್ಟು? (8 + 7 = ?)",
      q2: "ಪ್ರಶ್ನೆ 2: ಒಂದು ಕೊಠಡಿಯಲ್ಲಿ 6 ಬೆಂಚುಗಳಿವೆ. ಪ್ರತಿ ಬೆಂಚಿನಲ್ಲಿ 4 ಮಕ್ಕಳಿದ್ದಾರೆ. ಒಟ್ಟು ಮಕ್ಕಳು ಎಷ್ಟು? (6 x 4 = ?)"
    },
    a1: 15,
    a2: 24
  },
  sci: {
    EN: {
      title: "General Science Quiz (Enter 1, 2, or 3)",
      q1: "Q1: How do green plants make food using sunlight? (1) Respiration  (2) Photosynthesis  (3) Evaporation",
      q2: "Q2: Which gas do humans breathe in to survive? (1) Oxygen  (2) Carbon Dioxide  (3) Nitrogen"
    },
    KN: {
      title: "ಪರಿಸರ ವಿಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ (1, 2 ಅಥವಾ 3 ಬರೆಯಿರಿ)",
      q1: "ಪ್ರಶ್ನೆ 1: ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕಿನಿಂದ ಆಹಾರ ತಯಾರಿಸುವ ಕ್ರಿಯೆ? (1) ಉಸಿರಾಟ  (2) ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ  (3) ಬಾಷ್ಪೀಕರಣ",
      q2: "ಪ್ರಶ್ನೆ 2: ನಾವು ಜೀವಿಸಲು ಉಸಿರಾಡುವ ಅನಿಲ ಯಾವುದು? (1) ಆಮ್ಲಜನಕ  (2) ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್  (3) ನೈಟ್ರೋಜನ್"
    },
    a1: 2,
    a2: 1
  },
  lang: {
    EN: {
      title: "Language Arts Quiz (Enter 1, 2, or 3)",
      q1: "Q1: What is the English word for 'ಶಾಲೆ' (Shaale)? (1) House  (2) School  (3) Playground",
      q2: "Q2: What is the opposite of 'BIG' (ದೊಡ್ಡದು)? (1) Tall  (2) Small  (3) Heavy"
    },
    KN: {
      title: "ಭಾಷಾ ಕೌಶಲ್ಯ ರಸಪ್ರಶ್ನೆ (1, 2 ಅಥವಾ 3 ಬರೆಯಿರಿ)",
      q1: "ಪ್ರಶ್ನೆ 1: 'ಶಾಲೆ' ಪದದ ಇಂಗ್ಲಿಷ್ ಅರ್ಥವೇನು? (1) House  (2) School  (3) Playground",
      q2: "ಪ್ರಶ್ನೆ 2: 'ದೊಡ್ಡದು' (BIG) ಪದದ ವಿರುದ್ಧ ಪದ ಯಾವುದು? (1) Tall  (2) Small (ಚಿಕ್ಕದು)  (3) Heavy"
    },
    a1: 2,
    a2: 2
  }
};

const mascotMap = { "Lion": "🦁", "Elephant": "🐘", "Peacock": "🦚" };

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateLanguage() {
  const text = isKannada ? dictionary.KN : dictionary.EN;
  document.getElementById("txtSubtitle").innerText = text.subtitle;
  document.getElementById("lblLang").innerText = text.langBtn;
  document.getElementById("txtOfflineBanner").innerText = text.banner;
  document.getElementById("regHeading").innerText = text.regHeading;
  document.getElementById("regDesc").innerText = text.regDesc;
  document.getElementById("lblInputName").innerText = text.lblName;
  document.getElementById("lblInputUsn").innerText = text.lblUsn;
  document.getElementById("lblChooseAvatar").innerText = text.lblAvatar;
  document.getElementById("btnStartLearning").innerText = text.btnStart;
  document.getElementById("lblModulesTitle").innerText = text.lblModules;
  document.getElementById("txtMathTitle").innerText = text.mathTitle;
  document.getElementById("txtMathDesc").innerText = text.mathDesc;
  document.getElementById("btnOpenMath").innerText = text.btnMath;
  document.getElementById("txtSciTitle").innerText = text.sciTitle;
  document.getElementById("txtSciDesc").innerText = text.sciDesc;
  document.getElementById("btnOpenSci").innerText = text.btnSci;
  document.getElementById("txtLangTitle").innerText = text.langTitle;
  document.getElementById("txtLangDesc").innerText = text.langDesc;
  document.getElementById("btnOpenLang").innerText = text.btnLang;
  document.getElementById("txtSaveTitle").innerText = text.saveTitle;
  document.getElementById("txtSaveDesc").innerText = text.saveDesc;
  document.getElementById("txtNavStudent").innerText = text.navStudent;
  document.getElementById("txtNavTeacher").innerText = text.navTeacher;
}

document.getElementById("btnLangToggle").addEventListener("click", () => {
  isKannada = !isKannada;
  updateLanguage();
  showToast(isKannada ? "ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆಯಾಗಿದೆ" : "Switched to English");
});

const avatarCards = document.querySelectorAll(".avatar-card");
avatarCards.forEach(card => {
  card.addEventListener("click", () => {
    avatarCards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

const formRegister = document.getElementById("formRegister");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("inputName").value.trim();
  const usn = document.getElementById("inputUsn").value.trim().toUpperCase();
  const mascot = document.querySelector('input[name="mascot"]:checked').value;

  let existing = studentRoster.find(s => s.usn === usn);
  if (existing) {
    currentStudent = existing;
  } else {
    currentStudent = { usn, name, mascot, score: 0, stars: 0, badge: "Beginner" };
    studentRoster.push(currentStudent);
  }

  document.getElementById("viewRegister").classList.add("hidden");
  document.getElementById("viewDashboard").classList.remove("hidden");
  updateStudentDashboard();
  showToast("Welcome " + name + "!");
});

function updateStudentDashboard() {
  if (!currentStudent) return;
  document.getElementById("dispName").innerText = currentStudent.name;
  document.getElementById("dispUsn").innerText = "USN: " + currentStudent.usn;
  document.getElementById("dispAvatar").innerText = mascotMap[currentStudent.mascot] || "🦁";
  document.getElementById("dispStars").innerText = currentStudent.stars + " ⭐";
  document.getElementById("dispBadge").innerText = currentStudent.badge;
}

document.getElementById("btnLogout").addEventListener("click", () => {
  currentStudent = null;
  document.getElementById("viewDashboard").classList.add("hidden");
  document.getElementById("viewRegister").classList.remove("hidden");
  formRegister.reset();
  showToast("Logged out successfully");
});

const quizModal = document.getElementById("quizModal");
const ansQ1 = document.getElementById("ansQ1");
const ansQ2 = document.getElementById("ansQ2");
const feedbackQ1 = document.getElementById("feedbackQ1");
const feedbackQ2 = document.getElementById("feedbackQ2");

function openSubjectQuiz(subject) {
  activeSubject = subject;
  const qData = quizzes[subject];
  const langKey = isKannada ? "KN" : "EN";

  document.getElementById("modalQuizTitle").innerText = qData[langKey].title;
  document.getElementById("q1Text").innerText = qData[langKey].q1;
  document.getElementById("q2Text").innerText = qData[langKey].q2;

  ansQ1.value = "";
  ansQ2.value = "";
  feedbackQ1.innerText = "";
  feedbackQ2.innerText = "";
  quizModal.classList.remove("hidden");
}

function closeModal() {
  quizModal.classList.add("hidden");
}

document.getElementById("btnOpenMath").addEventListener("click", () => openSubjectQuiz("math"));
document.getElementById("btnOpenSci").addEventListener("click", () => openSubjectQuiz("sci"));
document.getElementById("btnOpenLang").addEventListener("click", () => openSubjectQuiz("lang"));
document.getElementById("btnCloseModal").addEventListener("click", closeModal);
document.getElementById("btnCancelModal").addEventListener("click", closeModal);

document.getElementById("btnSubmitQuiz").addEventListener("click", () => {
  const a1 = parseInt(ansQ1.value);
  const a2 = parseInt(ansQ2.value);
  const correct1 = quizzes[activeSubject].a1;
  const correct2 = quizzes[activeSubject].a2;
  let earned = 0;

  if (a1 === correct1) {
    feedbackQ1.innerText = "✓ Correct! (+10)";
    feedbackQ1.style.color = "#059669";
    earned += 10;
  } else {
    feedbackQ1.innerText = "✗ Answer is " + correct1;
    feedbackQ1.style.color = "#e11d48";
  }

  if (a2 === correct2) {
    feedbackQ2.innerText = "✓ Correct! (+10)";
    feedbackQ2.style.color = "#059669";
    earned += 10;
  } else {
    feedbackQ2.innerText = "✗ Answer is " + correct2;
    feedbackQ2.style.color = "#e11d48";
  }

  if (currentStudent) {
    currentStudent.score = Math.min(20, currentStudent.score + earned);
    currentStudent.stars += earned;
    calculateBadge();
    updateStudentDashboard();
  }

  showToast("Quiz completed! +" + earned + " Stars ⭐");
  setTimeout(closeModal, 1400);
});

function calculateBadge() {
  if (!currentStudent) return;
  if (currentStudent.stars >= 30) currentStudent.badge = "Gold Star";
  else if (currentStudent.stars >= 20) currentStudent.badge = "Silver Star";
  else if (currentStudent.stars >= 10) currentStudent.badge = "Bronze Star";
  else currentStudent.badge = "Beginner";
}

document.getElementById("btnSaveOffline").addEventListener("click", () => {
  if (!currentStudent) return;
  showToast("Progress cached to local device memory!");
});

const tabStudent = document.getElementById("tabStudent");
const tabTeacher = document.getElementById("tabTeacher");
const viewRegister = document.getElementById("viewRegister");
const viewDashboard = document.getElementById("viewDashboard");
const viewTeacher = document.getElementById("viewTeacher");

tabStudent.addEventListener("click", () => {
  tabStudent.classList.add("active");
  tabTeacher.classList.remove("active");
  viewTeacher.classList.add("hidden");
  if (currentStudent) viewDashboard.classList.remove("hidden");
  else viewRegister.classList.remove("hidden");
});

tabTeacher.addEventListener("click", () => {
  tabTeacher.classList.add("active");
  tabStudent.classList.remove("active");
  viewRegister.classList.add("hidden");
  viewDashboard.classList.add("hidden");
  viewTeacher.classList.remove("hidden");
  renderRosterTable();
});

function renderRosterTable() {
  const tbody = document.getElementById("tableRosterBody");
  tbody.innerHTML = "";
  studentRoster.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:700; font-family:monospace;">${s.usn}</td>
      <td style="font-weight:600;">${s.name}</td>
      <td>${mascotMap[s.mascot] || "🦁"} ${s.mascot}</td>
      <td style="text-align:center; font-weight:700; color:#059669;">${s.score}/20</td>
      <td style="text-align:center; font-weight:700; color:#d97706;">${s.stars} ⭐</td>
      <td><span class="rank-badge">${s.badge}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btnDownloadCsv").addEventListener("click", () => {
  let csv = "USN,StudentName,Mascot,Score,Stars,Badge\n";
  studentRoster.forEach(s => {
    csv += `${s.usn},${s.name},${s.mascot},${s.score},${s.stars},${s.badge}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rural_school_records.csv";
  a.click();
  showToast("Exported 'rural_school_records.csv'!");
});

updateLanguage();
             
