const out = document.getElementById("output");
const inp = document.getElementById("command");
const banner = document.querySelector(".eye-banner");

out.innerHTML = `
Welcome.
Type <b>'help'</b> to continue.
`;

const cmds = {
  help: `
Available commands:
whoami | skills | projects | contact | resume | clear
`,

  whoami: `
Omkar Chavhan
Cybersecurity Researcher & Ethical Hacker
`,

  skills: `
• Reverse Engineering
• Malware Analysis
• Android Pentesting
`,

  projects: `
• AndroidX07 — APK Security Analyzer
• TrinetraDetect — Malware Detection
• InboxMan — OSINT Toolkit
`,

  contact: `
GitHub   : <a href="https://github.com/omk4r72" target="_blank">github.com/omk4r72</a><br>
LinkedIn : <a href="https://linkedin.com/in/omkar-chavhan-33697a312" target="_blank">linkedin.com/in/omkar-chavhan-33697a312</a><br>
Email    : <a href="mailto:chavhanomkar702@gmail.com">chavhanomkar702@gmail.com</a><br>
TryHackMe: <a href="https://tryhackme.com/p/0mk4r" target="_blank">tryhackme.com/p/0mk4r</a>
`,

  resume: `
Opening resume...
`
};

/* ---------- COMMAND HISTORY ---------- */
let history = [];
let historyIndex = -1;

/* ---------- BLINK CONTROL ---------- */
function fastBlink() {
  banner.style.setProperty("--blink-speed", "3s");
  clearTimeout(window.blinkTimer);
  window.blinkTimer = setTimeout(() => {
    banner.style.setProperty("--blink-speed", "7s");
  }, 1500);
}

inp.addEventListener("keydown", e => {

  /* ↑ history */
  if (e.key === "ArrowUp") {
    if (history.length && historyIndex > 0) {
      historyIndex--;
      inp.value = history[historyIndex];
    }
    return;
  }

  /* ↓ history */
  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      inp.value = history[historyIndex];
    } else {
      inp.value = "";
    }
    return;
  }

  if (e.key !== "Enter") return;

  const c = inp.value.trim().toLowerCase();
  inp.value = "";

  history.push(c);
  historyIndex = history.length;

  out.innerHTML += `<div>&gt; ${c}</div>`;
  fastBlink();

  if (c === "clear") {
    out.innerHTML = "Terminal cleared.<br>";
    return;
  }

  if (c === "resume") {
    out.innerHTML += `<div>${cmds[c]}</div>`;
    window.open("resume.pdf", "_blank");
    return;
  }

  if (cmds[c]) {
    out.innerHTML += `<div>${cmds[c]}</div>`;
  } else {
    out.innerHTML += `<div>Unknown command. Type <b>'help'</b></div>`;
  }

  out.scrollTop = out.scrollHeight;
});
