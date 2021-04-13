Office.onReady().then(function() {
  document.getElementById("btDone").onclick = closeWindow;
  document.getElementById("txtFilter").onkeyup = filterSearchResults;    
    
  //Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, onMessageFromParent);
  const urlParams = new URLSearchParams(window.location.search);
  for (const [key, value] of urlParams) {
      console.log(`${key}:${value}`);
  }
  searchByKeyword(urlParams.get("keyword"), urlParams.get("version"), urlParams.get("exactmatch"));
});
/*
function onMessageFromParent(event) {
  var results = JSON.parse(event.message);
  $("h1").text(results[0].text);
}*/


async function searchByKeyword(keyword, version, exactmatch) {
  try {
    const results = await BibleGetService.searchKeyword(keyword, version, exactmatch);
    showResults(results);
  } catch (e) {
    notifyError(`Hubo un problema al buscar por palabra clave en el servidor.`);
    console.error(e);
  }
}

function notifyError(errorMessage) {
  document.getElementById("lbErrMsg").innerHTML = errorMessage;
}

function closeWindow() {
  Office.context.ui.messageParent(JSON.stringify({action: "close" }));
}

function showResults(results) {  
  document.getElementById("lbResultsCount").innerHTML = results.length;
  let list = document.getElementById("lstResults");
  list.innerHTML = "";
  for (let i in results) {
    let entry = createResultItem(i, results[i]);
    list.appendChild(entry);
  }
}

function createResultItem(i, quote) {
  const a = document.createElement("a");
  a.classList.add("icon");
  a.classList.add("is-large");
  a.onclick = () => insertResult(quote);
  a.innerHTML = '<i class="ins-result-icon fa fa-arrow-circle-down"></i>';
  const tdIcon = document.createElement("td");
  tdIcon.appendChild(a);
  const tdText = document.createElement("td");
  tdText.innerHTML = `<span class="verse-text">${quote.text}</span> <span class="verse-quote">${quote.originalquery}</span>`;
  const entry = document.createElement("tr");
  entry.appendChild(tdIcon);
  entry.appendChild(tdText);
  return entry;
}

const insertResult = q => {
  Office.context.ui.messageParent(JSON.stringify({action: "ins", quote: q}));  
};

/***************************************************************************************************/
export const filterSearchResults = () => {
  const filter = document.getElementById("txtFilter").value.toLowerCase();
  let count = 0;
  let results = document.querySelectorAll("#lstResults tr");

  for (let res of results) {
    if (
      res
        .querySelector("td span.verse-text")
        .innerHTML.toLowerCase()
        .indexOf(filter) == -1
    ) {
      res.classList.add("hide");
    } else {
      res.classList.remove("hide");
      count++;
    }
  }
  document.getElementById("lbResultsCount").innerHTML = count;
};

/***************************************************************************************************/
const axios = require("axios");
const BGET_SEARCH_ENDPOINT = "https://query.bibleget.io/v3/search.php?";

export var BibleGetService = {  
  searchKeyword: async function(keyword, version = "CEI2008", exactmatch) {
    const payload = {
      query: "keywordsearch",
      keyword: keyword,
      version: version,
      return: "json",
      appid: "office",
      pluginversion: 1,
      exactmatch: exactmatch
    };
    //const response = await axios.get(BGET_SEARCH_ENDPOINT, { params: payload });
    //return response.data.results;
    let resultados = [
      {
        verse: "27",
        text: "Y Dios creó al hombre a su imagen; lo creó a imagen de Dios, los creó varón y mujer.",
        version: "BLPD",
        originalquery: "Gen1:27"
      },
      {
        verse: "2",
        text: "Lorem ipsum doloret sit",
        version: "BLPD",
        originalquery: "Gen1:27"
      },
      {
        verse: "27",
        text: "Beresit bara elohim, we ha ash",
        version: "BLPD",
        originalquery: "Gen1:27"
      }
    ];
    for (let i = 0; i < 10; i++) {
      resultados.push({
        verse: "2",
        text: "Lorem ipsum doloret sit",
        version: "BLPD",
        originalquery: "Gen1:27"
      });
    }
    return resultados;
  }
};
