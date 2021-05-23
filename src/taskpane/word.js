/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
var settings = {
  par: { align: "left", interline: 1, leftIndent: 0, rightIndent: 0, fontFamily: "Arial" },
  book: {
    fontSize: 10,
    bold: false,
    color: "black",
    background: null,
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  },
  verse: {
    fontSize: 10,
    bold: false,
    color: "black",
    background: null,
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  },
  text: {
    fontSize: 10,
    bold: false,
    color: "black",
    background: null,
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  }
};
/* global document, Office, Word */

Office.onReady(async function(info) {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("getByQuote").onclick = getByQuote;
    document.getElementById("getByKeyword").onclick = getByKeyword;
    document.getElementById("txtQuote").onkeyup = validateQuote;
    document.getElementById("btSettings").onclick = showSettings;
    document.getElementById("btHelp").onclick = showHelp;
    document.getElementById("btAbout").onclick = showAbout;    
    await loadVersions();
    setPreferedVersion();
  }
});

function getStyleSettings() {
  const str = localStorage.getItem("bible.settings");
  if (str != null) {
    settings = JSON.parse(str);
  }
}

export async function getByQuote() {
  return Word.run(async context => {
    getStyleSettings();
    await getByQuoteOffice(document, context);
    await context.sync();
  });
}

export async function getByKeyword() {
  return Word.run(async context => {
    getStyleSettings();
    await getByKeywordOffice();
    await context.sync();
  });
}

/********************************************** */
export async function getByQuoteOffice(document, context) {
  const quote = document.getElementById("txtQuote").value;
  const version = document.getElementById("cbVersion").value;
  const preferOrigin = getPreferedOrigin();

  if (quote.trim() != "" && isValidQuote(quote) && version) {
    await searchByQuote(context.document, quote, version, preferOrigin);
  }
}

function getPreferedOrigin() {
  let rdOrigin = document.getElementsByName("rdOrigin");
  for (let i in rdOrigin) {
    if (rdOrigin[i].checked) {
      return rdOrigin[i].value;
    }
  }
}

function setPreferedVersion() {
  const savedVersion = localStorage.getItem("bible.selectedversion");
  try {
    const lang = "|" + getPreferedLanguage();
    let options = document.querySelectorAll("#cbVersion option");

    for (let i in options) {
      if (
        options[i].value === savedVersion ||
        (typeof options[i].innerHTML != "undefined" && options[i].innerHTML.indexOf(lang) > 0)
      ) {
        options[i].selected = true;
        localStorage.setItem("bible.selectedversion", options[i].value);
        break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function getPreferedLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  if (typeof userLang != "undefined") {
    const idx = userLang.indexOf("-");
    return userLang.substring(idx - 2, idx);
  }
}

async function searchByQuote(document, quote, version, preferOrigin) {
  try {
    const verses = await BibleGetService.getByQuote(quote, version, preferOrigin);
    let range = document.getSelection();

    insertVersion(range);
console.log(verses);
    for (let i in verses) {
      insertQuote(range, verses[i]);
    }
  } catch (e) {
    notifyError(`Hubo un problema al consultar la cita bíblica en el servidor.`);
    console.error(e);
  }
}

export async function getByKeywordOffice() {
  const keyword = document.getElementById("txtKeyword").value;
  const exactmatch = document.getElementById("chkExactMatch").checked;
  const version = document.getElementById("cbVersion").value;

  if (keyword.trim() != "") {
    await searchByKeyword(keyword.trim(), version, exactmatch);
  }
}

var dialog;
async function searchByKeyword(keyword, version, exactmatch) {
  Office.context.ui.displayDialogAsync(
    `https://localhost:3000/search-results.html?keyword=${keyword}&version=${version}&exactmatch=${exactmatch}`,
    {
      height: 70,
      width: 50
    },
    function(asyncResult) {
      dialog = asyncResult.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, processMessage);
    }
  );
}

function processMessage(arg) {
  let messageFromDialog = JSON.parse(arg.message);

  if (messageFromDialog.action === "close") {
    dialog.close();
  } else if (messageFromDialog.action === "ins") {
    insertResult(messageFromDialog.quote);
  }
}

export const insertResult = q => {
  return Word.run(async context => {
    const range = context.document.getSelection();
    insertQuote(range, q, true);
    await context.sync();
  });
};

function insertQuote(range, quote, insVersion = false) {
  if (insVersion) {
    insertVersion(range);
  }
console.log("insert quote" + quote.verse);
  const verse = range.insertText(quote.verse + " ", "End");
  setParagraphStyle(verse.paragraphs.getFirstOrNullObject());
  verse.font.set({
    name: settings.par.fontFamily,
    bold: settings.verse.bold,
    size: parseInt(settings.verse.fontSize),
    superscript: settings.verse.superscript,
    subscript: settings.verse.subscript,
    underline: settings.verse.underline? Word.UnderlineType.single : Word.UnderlineType.none,
    color: settings.verse.color,
    italic: settings.verse.italic,
    highlightColor: settings.verse.background
  });
  const text = range.insertText(quote.text, "End");
  text.font.set({
    name: settings.par.fontFamily,
    bold: settings.text.bold,
    size: parseInt(settings.text.fontSize),
    superscript: settings.text.superscript,
    subscript: settings.text.subscript,
    underline: settings.text.underline? Word.UnderlineType.single : Word.UnderlineType.none,
    color: settings.text.color,
    italic: settings.text.italic,
    highlightColor: settings.text.background
  });
}

function insertVersion(range) {
  const version = range.insertParagraph(getSavedVersion(), Word.InsertLocation.before);

  setParagraphStyle(version);
  version.font.set({
    name: settings.par.fontFamily});
  version.font.set({    
    bold: settings.book.bold,
    size: parseInt(settings.book.fontSize),
    superscript: settings.book.superscript,
    subscript: settings.book.subscript,
    underline: settings.book.underline? Word.UnderlineType.single : Word.UnderlineType.none,
    color: settings.book.color,
    italic: settings.book.italic,
    highlightColor: settings.book.background
  });
  return version;
}
function setParagraphStyle(par) {
  par.alignment = settings.par.align;
  par.leftIndent = settings.par.leftIndent /  0.3527;
  par.rightIndent = settings.par.rightIndent /  0.3527;
  par.lineSpacing = 10*settings.par.interline;
}

function getSavedVersion() {
  return localStorage.getItem("bible.selectedversion");
}

/**************************************** */
async function loadVersions() {
  try {
    let versions;
    let json = localStorage.getItem("bible.versions");
    if (json != null) {
      versions = JSON.parse(json);
    } else {
      versions = await BibleGetService.getVersions();
    }
    let cbVersions = document.getElementById("cbVersion");
    cbVersions.onclick = saveSelectedVersion;
    let options = document.querySelectorAll("#cbVersion option");
    options.forEach(o => o.remove());

    for (const key in versions) {
      let opt = document.createElement("option");
      opt.value = key;
      opt.innerHTML = versions[key];
      cbVersions.appendChild(opt);
    }
  } catch (e) {
    notifyError(`Hubo un problema al consultar las versiones en el servidor.`);
    console.error(e);
  }
}

function saveSelectedVersion() {
  let cbVersion = document.getElementById("cbVersion");
  localStorage.setItem("bible.selectedversion", cbVersion.value);
  localStorage.removeItem("bible.selectedversion");
}
/***************************************************/
export const showSettings = () => {
  Office.context.ui.displayDialogAsync("https://localhost:3000/settings.html", { height: 70, width: 50 });
};
export const showHelp = () => {
  Office.context.ui.displayDialogAsync("https://localhost:3000/help.html", { height: 70, width: 50 });
};
export const showAbout = () => {
  Office.context.ui.displayDialogAsync("https://localhost:3000/about.html", { height: 70, width: 50 });
};
/***************************************************/
//Bible Verse Regex
//const regex = /\d*[a-z]+\d+(?::(\d+))?(-(\d+)(?:([a-z]+)(\d+))?(?::(\d+))?)?/i;
const regex = /^\d*[a-z]+\d+(([,:]\d+)?(-\d+)?)?$/i;

export const isValidQuote = value => {
  return regex.test(value.replaceAll(" ", ""));
};
export const validateQuote = () => {
  const value = document.getElementById("txtQuote").value;
  if (value == "" || isValidQuote(value)) {
    document.getElementById("lbErrMsg").innerHTML = ``;
  } else {
    notifyError(`The biblical quote format is not valid.`);
  }
};
function notifyError(errorMessage) {
  document.getElementById("lbErrMsg").innerHTML = errorMessage;
}
/*************************************************************************************************/
const axios = require("axios");
//const url = require('url');
const BGET_ENDPOINT = "https://query.bibleget.io/v3/index.php?";
const BGET_METADATA_ENDPOINT = "https://query.bibleget.io/v3/metadata.php?";

export var BibleGetService = {
  getByQuote: async function(quote, version = "CEI2008", preferOrigin = "GREEK") {
    const payload = { query: quote, version: version, preferorigin: preferOrigin, return: "json", appid: "office" };
    //const params = new url.URLSearchParams(payload);
    const response = await axios.get(BGET_ENDPOINT, { params: payload });
    return response.data.results;
  },
  getVersions: async function() {
    const payload = { query: "bibleversions", return: "json" };
    const response = await axios.get(BGET_METADATA_ENDPOINT, { params: payload });
    return response.data.validversions_fullname;
  }
};
