const i18n = require("./i18n");

Office.onReady().then(function() {
  i18n.loadTranslations();
  document.getElementById("btDone").onclick = closeWindow;
  document.getElementById("txtFilter").onkeyup = filterSearchResults;

  const urlParams = new URLSearchParams(window.location.search);
  searchByKeyword(urlParams.get("keyword"), urlParams.get("version"), urlParams.get("exactmatch"));
});

var results = [];
var filtered = [];
async function searchByKeyword(keyword, version, exactmatch) {
  try {
    results = await BibleGetService.searchKeyword(keyword, version, exactmatch);
    filtered = results;
    showResults();
  } catch (e) {
    notifyError(i18n.tr("ERROR_SEARCH_BY_KEYWORD"));
    console.error(e);
  }
}

function notifyError(errorMessage) {
  document.getElementById("lbErrMsg").innerHTML = errorMessage;
}

function closeWindow() {
  Office.context.ui.messageParent(JSON.stringify({ action: "close" }));
}

const resultsPerPage = 10;

function showResults() {
  buildPagination(results.length);
  document.getElementById("lbResultsCount").innerHTML = results.length;
  showPage(0);
}

function createResultItem(quote) {
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
  Office.context.ui.messageParent(JSON.stringify({ action: "ins", quote: q }));
};

function buildPagination(nbOfResults) {
  const numPages = Math.ceil(nbOfResults / resultsPerPage);

  let lbPageCount = document.getElementById("lbPageCount");
  lbPageCount.innerHTML = numPages;

  let list = document.getElementById("cbPagination");
  list.innerHTML = "";

  for (let i = 1; i <= numPages; i++) {
    list.appendChild(buildPaginationItem(i));
  }
}

function buildPaginationItem(i) {
  const linkPage = document.createElement("a");
  linkPage.classList.add("dropdown-item");
  linkPage.onclick = () => showPage(i - 1);
  linkPage.innerHTML = i;
  const attribute = document.createAttribute("id");
  attribute.value = `page${i}`;
  linkPage.setAttributeNode(attribute);
  return linkPage;
}

function showPage(page, items = filtered) {  
  let list = document.getElementById("lstResults");
  list.innerHTML = "";
  let limit = Math.min((page + 1) * resultsPerPage, items.length);
  for (let i = page * resultsPerPage; i < limit; i++) {
    let entry = createResultItem(items[i]);
    list.appendChild(entry);
  }

  let liPages = document.querySelectorAll("#cbPagination a");
  for (let diPage of liPages) {
    diPage.classList.remove("is-active");
  }

  let diActivePage = document.getElementById(`page${page+1}`);
  diActivePage.classList.add("is-active");

  const numPages = Math.ceil(items.length / resultsPerPage);
  let btPrevPage = document.getElementById("btPrevPage");
  let btNextPage = document.getElementById("btNextPage");
  if (page > 0) {
    btPrevPage.onclick = () => showPage(page - 1);
    btPrevPage.disabled = false;
  } else {
    btPrevPage.disabled = true;
  }

  if (page < numPages-1) {
    btNextPage.onclick = () => showPage(page + 1);
    btNextPage.disabled = false;
  } else {
    btNextPage.disabled = true;
  }
}
/***************************************************************************************************/
export const filterSearchResults = () => {
  const filter = document.getElementById("txtFilter").value.toLowerCase();

  if (filter == "") {
    filtered = results;
  } else {
    filtered = [];
    for (let res of results) {
      if (res.text.toLowerCase().indexOf(filter) != -1) {
        filtered.push(res);
      }
    }
  }
  document.getElementById("lbResultsCount").innerHTML = filtered.length;
  showPage(0, filtered);
  buildPagination(filtered.length);
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
    const response = await axios.get(BGET_SEARCH_ENDPOINT, { params: payload });
    return response.data.results;
    /*let resultados = [
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
    for (let i = 0; i < 50; i++) {
      resultados.push({
        verse: "2",
        text: "Lorem ipsum doloret sit" + i,
        version: "BLPD",
        originalquery: "Gen1:27"
      });
    }
    return resultados;*/
  }
};
