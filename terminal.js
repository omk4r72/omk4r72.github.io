const out = document.getElementById("output");
const inp = document.getElementById("command");

out.innerHTML = `
Welcome.
Type 'help' to continue.
`;

const cmds = {
  help: "whoami | skills | projects | contact | resume | clear",
  whoami: "Omkar Chavhan — Cybersecurity Researcher",
  skills: "Reverse Engineering • Malware Analysis • Android Pentesting",
  projects: "AndroidX07 • TrinetraDetect • InboxMan",
  contact: "GitHub / LinkedIn / Email",
  resume: "Opening resume.pdf..."
};

inp.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  const c = inp.value.trim();
  inp.value = "";

  out.innerHTML += `<div>> ${c}</div>`;

  if (c === "clear") {
    out.innerHTML = "";
    return;
  }

  if (c === "resume") {
    out.innerHTML += `<div>${cmds[c]}</div>`;
    window.open("resume.pdf","_blank");
    return;
  }

  out.innerHTML += `<div>${cmds[c] || "Type 'help'"}</div>`;
});
