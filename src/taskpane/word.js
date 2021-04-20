/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest

/* global document, Office, Word */

Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("getByQuote").onclick = getByQuote;
    document.getElementById("getByKeyword").onclick = getByKeyword;
    document.getElementById("txtQuote").onkeyup = validateQuote;
    document.getElementById("btSettings").onclick = showSettings;
    document.getElementById("btHelp").onclick = showHelp;
    document.getElementById("btAbout").onclick = showAbout;
    setPreferedVersionByLang();
  }
});

export async function getByQuote() {
  return Word.run(async context => {
    await getByQuoteOffice(document, context);
    await context.sync();
  });
}

export async function getByKeyword() {
  return Word.run(async context => {
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

function setPreferedVersionByLang() {
  try {
    const lang = "|" + getPreferedLanguage();
    let options = document.querySelectorAll("#cbVersion option");

    for (let i in options) {
      if (typeof options[i].innerHTML != "undefined" && options[i].innerHTML.indexOf(lang) > 0) {
        options[i].selected = true;
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

    for (let i in verses) {
      const verse = range.insertText(verses[i].verse + " ", "End");
      verse.font.superscript = true;
      const text = range.insertText(verses[i].text, "End");
      text.font.set({
        name: "Arial",
        bold: false,
        size: 18,
        superscript: false
      });
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
    await insertQuote(context.document, q);
    await context.sync();
  });
};

function insertQuote(document, quote) {
  let range = document.getSelection();
  const verse = range.insertText(quote.verse + " ", "End");
  verse.font.superscript = true;
  const text = range.insertText(quote.text, "End");
  text.font.superscript = false;
}

/**************************************** */
async function loadVersions() {
  try {
    const versions = await BibleGetService.getVersions();
    let cbVersions = document.getElementById("cbVersion");
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
