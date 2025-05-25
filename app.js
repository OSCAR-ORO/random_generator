const baseChar = "abcdefghijklmnopqrstuvwxyz0123456789";
const specialChar = {
  a: "@",
  s: "$",
  o: "0",
  i: "!",
  e: "3",
  l: "1",
  t: "+",
  g: "9",
  b: "8",
  z: "2",
  y: "7",
  w: "&",
};

function submitInput() {
    const val = document.getElementById('userInput').value.trim();
    if(val) {
        const mutated = [mutate(val), mutate(val), mutate(val)];
        render(mutated);
    }
    else {
        render([generate(), generate(), generate()]);
    }
}

function randomChar() {
  return baseChar[Math.floor(Math.random() * baseChar.length)];
}

function generate(length = 8) {
  let pw = "";
  for (let i = 0; i < length; i++) pw += randomChar();
  return pw;
}

function mutate(password) {
  let pw = password.split("");
  let limitMut = Math.floor(pw.length * 0.4);
  for (let i = 0; i < limitMut; i++) {
    let idx = Math.floor(Math.random() * pw.length);
    let char = pw[idx];
    if (specialChar[char.toLowerCase()] && Math.random() > 0.5)
      pw[idx] = specialChar[char.toLowerCase()];
    else if (Math.random() > 0.5) pw[idx] = randomChar();
    else
      pw[idx] = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }
  if (Math.random() > 0.7) {
    if (Math.random() > 0.5 && pw.length < 16) pw.push(randomChar());
    else if (pw.length > 8) pw.splice(Math.floor(Math.random() * pw.length), 1);
  }
  return pw.join("");
}

function render(password) {
  const container = document.getElementById("pwcontainer");
  container.innerHTML = "";
  password.forEach((pw) => {
    const el = document.createElement("div");
    el.className = "password";
    el.textContent = pw;
    el.onclick = () => {
      const mutated = [mutate(pw), mutate(pw), mutate(pw)];
      render(mutated);
    };
    container.appendChild(el);
  });
}

