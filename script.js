const mainElement = document.getElementById("main");
const initialContent = mainElement.innerHTML;
let lastEntryContent = undefined;

document.body.onkeyup = (e) => {
  if (e.keyCode === 37) {
    mainElement.innerHTML = initialContent;

    main();
  }

  if (e.keyCode === 39 && lastEntryContent !== undefined) {
    mainElement.innerHTML = lastEntryContent;
  }
}

main();

function main() {
  addAllEntriesFrom(0);
}

function addAllEntriesFrom(index) {
  let stop = false;
  const postTitles = document.getElementById("post-titles");

  fetch(`posts/entry_${index}.html`).then(response => {
    if (response.ok) {
      return response.text();
    }

    stop = true;
  }).then(text => {
    if (stop) {
      return;
    }

    let content = text.split("\n\n");

    let postTitleLI = document.createElement("li");
    let postTitleA = document.createElement("a");
    let titleName = content.shift();
    
    postTitleA.appendChild(document.createTextNode(titleName));

    content = content.join("\n\n");
    postTitleA.href = "#";
    postTitleA.onclick = () => {
      mainElement.innerHTML = `<h1 id="title">\n  ${titleName}\n</h1>\n${content}`;
      lastEntryContent = mainElement.innerHTML;

      renderMathInElement(mainElement);
    };

    postTitleLI.appendChild(postTitleA);
    postTitles.appendChild(postTitleLI);
    renderMathInElement(postTitles);
    addAllEntriesFrom(index + 1);
  }).catch((error) => {
    console.error("ERROR: ", error.message);
  });
}
