var prevParagraph;
var prevBook;
var prevVerse;
var prevText;

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
const i18n = require("./i18n");

Office.onReady().then(async function() {
  i18n.loadTranslations();
  document.getElementById("btCollapsePar").onclick = () => toggleParagraphCard("formPar");
  document.getElementById("btCollapseBook").onclick = () => toggleParagraphCard("formBook");
  document.getElementById("btCollapseNum").onclick = () => toggleParagraphCard("formNum");
  document.getElementById("btCollapseText").onclick = () => toggleParagraphCard("formText");

  //events on paragraph section
  document.getElementsByName("btParAlign").forEach(r => (r.onclick = setParagraphAlign));
  document.getElementById("btInter1").onclick = setParInter1;
  document.getElementById("btInter15").onclick = setParInter15;
  document.getElementById("btInter2").onclick = setParInter2;
  document.getElementById("btLeftIndent").onclick = setParLeftIndent;
  document.getElementById("btLeftOutdent").onclick = setParLeftOutdent;
  document.getElementById("btRightIndent").onclick = setParRightIndent;
  document.getElementById("btRightOutdent").onclick = setParRightOutdent;
  const cbFontFamily = document.getElementById("cbFontFamily");
  cbFontFamily.onclick = setParFontFamily;
  fillFontFamilyComb(cbFontFamily);

  //events on book section
  document.getElementById("btBookBack").onchange = setBookBack;
  document.getElementById("btBookBold").onclick = setBookBold;
  document.getElementById("btBookColor").onchange = setBookColor;
  document.getElementById("btBookItalic").onclick = setBookItalic;
  document.getElementById("btBookSub").onclick = setBookSub;
  document.getElementById("btBookSuper").onclick = setBookSuper;
  document.getElementById("btBookUnder").onclick = setBookUnder;
  const cbBookFontSize = document.getElementById("cbBookFontSize");
  fillFontSizeComb(cbBookFontSize, settings.book.fontSize);
  cbBookFontSize.onclick = setBookFontSize;

  //events on num section
  document.getElementById("btNumBack").onchange = setNumBack;
  document.getElementById("btNumBold").onclick = setNumBold;
  document.getElementById("btNumColor").onchange = setNumColor;
  document.getElementById("btNumItalic").onclick = setNumItalic;
  document.getElementById("btNumSub").onclick = setNumSub;
  document.getElementById("btNumSuper").onclick = setNumSuper;
  document.getElementById("btNumUnder").onclick = setNumUnder;
  const cbNumFontSize = document.getElementById("cbNumFontSize");
  cbNumFontSize.onclick = setNumFontSize;
  fillFontSizeComb(cbNumFontSize, settings.verse.fontSize);
  //Events on text section
  document.getElementById("btTextBack").onchange = setTextBack;
  document.getElementById("btTextBold").onclick = setTextBold;
  document.getElementById("btTextColor").onchange = setTextColor;
  document.getElementById("btTextItalic").onclick = setTextItalic;
  document.getElementById("btTextSub").onclick = setTextSub;
  document.getElementById("btTextSuper").onclick = setTextSuper;
  document.getElementById("btTextUnder").onclick = setTextUnder;
  const cbTextFontSize = document.getElementById("cbTextFontSize");
  cbTextFontSize.onclick = setTextFontSize;
  fillFontSizeComb(cbTextFontSize, settings.text.fontSize);

  document.getElementById("btUpdateVersions").onclick = updateVersions;
  await fillVersions();
  await fillSupportedLanguages();
  prevParagraph = document.getElementById("prevParagraph");
  prevBook = document.getElementById("prevBook");
  prevVerse = document.getElementById("prevVerse");
  prevText = document.getElementById("prevText");

  const cbLang = document.getElementById("cbLang");
  cbLang.onclick = setAppLanguage;
  cbLang.value = localStorage.getItem("bible.i18n.lang");

  const str = localStorage.getItem("bible.settings");
  if (str != null) {
    settings = JSON.parse(str);
    settingSavedValues();
  }
});

function settingSavedValues() {
  //select btInter2
  //Book
  document.getElementById("btBookBold").checked = settings.book.bold;
  document.getElementById("btBookItalic").checked = settings.book.italic;
  document.getElementById("btBookSub").checked = settings.book.subscript;
  document.getElementById("btBookSuper").checked = settings.book.superscript;
  document.getElementById("btBookUnder").checked = settings.book.underline;

  //Book
  document.getElementById("btNumBold").checked = settings.verse.bold;
  document.getElementById("btNumItalic").checked = settings.verse.italic;
  document.getElementById("btNumSub").checked = settings.verse.subscript;
  document.getElementById("btNumSuper").checked = settings.verse.superscript;
  document.getElementById("btNumUnder").checked = settings.verse.underline;

  //Book
  document.getElementById("btTextBold").checked = settings.text.bold;
  document.getElementById("btTextItalic").checked = settings.text.italic;
  document.getElementById("btTextSub").checked = settings.text.subscript;
  document.getElementById("btTextSuper").checked = settings.text.superscript;
  document.getElementById("btTextUnder").checked = settings.text.underline;
  updatePreview();
}
function updatePreview() {
  prevParagraph.style["text-align"] = settings.par.align;
  prevParagraph.style["line-height"] = settings.par.interline * 100 + "%";
  setIndent("text-indent", "prevIndent", settings.par.leftIndent);
  setIndent("padding-right", "prevOutdent", settings.par.rightIndent);
  prevParagraph.style["font-family"] = settings.par.fontFamily;

  //Book
  prevBook.style["font-size"] = settings.book.fontSize + "px";
  prevBook.style["background-color"] = settings.book.background;
  prevBook.style["font-weight"] = settings.book.bold ? "bold" : "normal";
  prevBook.style["color"] = settings.book.color;
  prevBook.style["font-style"] = settings.book.italic ? "italic" : "normal";
  prevBook.style["vertical-align"] = settings.book.subscript ? "sub" : "baseline";
  prevBook.style["vertical-align"] = settings.book.superscript ? "super" : "baseline";
  prevBook.style["text-decoration"] = settings.book.underline ? "underline" : "none";

  //Verse:num
  prevVerse.style["font-size"] = settings.verse.fontSize + "px";
  prevVerse.style["background-color"] = settings.verse.background;
  prevVerse.style["font-weight"] = settings.verse.bold ? "bold" : "normal";
  prevVerse.style["color"] = settings.verse.color;
  prevVerse.style["font-style"] = settings.verse.italic ? "italic" : "normal";
  prevVerse.style["vertical-align"] = settings.verse.subscript ? "sub" : "baseline";
  prevVerse.style["vertical-align"] = settings.verse.superscript ? "super" : "baseline";
  prevVerse.style["text-decoration"] = settings.verse.underline ? "underline" : "none";

  //Text
  prevText.style["font-size"] = settings.text.fontSize + "px";
  prevText.style["background-color"] = settings.text.background;
  prevText.style["font-weight"] = settings.text.bold ? "bold" : "normal";
  prevText.style["color"] = settings.text.color;
  prevText.style["font-style"] = settings.text.italic ? "italic" : "normal";
  prevText.style["vertical-align"] = settings.text.subscript ? "sub" : "baseline";
  prevText.style["vertical-align"] = settings.text.superscript ? "super" : "baseline";
  prevText.style["text-decoration"] = settings.text.underline ? "underline" : "none";
}
function toggleParagraphCard(id) {
  const classHiden = "is-hidden";
  let classList = document.getElementById(id).classList;
  if (classList.contains(classHiden)) {
    classList.remove(classHiden);
  } else {
    classList.add(classHiden);
  }
}

//events on paragraph section
function fillFontFamilyComb(combo) {
  const fontsToCheck = ["Arial", "Arial Black", "Bodoni", "Book Antiqua"];
  const availableFonts = new Set();
  for (const font of fontsToCheck) {
    if (document.fonts.check(`12px "${font}"`)) {
      availableFonts.add(font);
    }
  }

  let html = "";
  for (let opt of availableFonts) {
    if (opt == settings.par.fontFamily) {
      html += `<option selected>${opt}</option>`;
    } else {
      html += `<option>${opt}</option>`;
    }
  }
  combo.innerHTML = html;
}

function setParagraphAlign() {
  const radios = document.getElementsByName("btParAlign");
  for (let r of radios) {
    if (r.checked) {
      settings.par.align = r.value;
      break;
    }
  }
  prevParagraph.style["text-align"] = settings.par.align;
  save();
}

const setParInter1 = () => setParLineHeight(1);
const setParInter15 = () => setParLineHeight(1.5);
const setParInter2 = () => setParLineHeight(2);
function setParLineHeight(heigth) {
  settings.par.interline = heigth;
  prevParagraph.style["line-height"] = heigth * 100 + "%";
  save();
}
function setIndent(styleName, divName, indent) {  
  prevParagraph.style[styleName] = indent + "px";
  let indentPointer = document.getElementById(divName);
  if (divName === "prevIndent") {
    indentPointer.style.left = (indent - 8)+"px";
  } else {
    indentPointer.style.right = (indent - 8)+"px";
  }
  indentPointer.innerHTML = indent + "mm";
  save();
}
function setParLeftIndent() {
  settings.par.leftIndent += 5;  
  setIndent("text-indent", "prevIndent", settings.par.leftIndent);
  save();
}
function setParLeftOutdent() {
  settings.par.leftIndent = Math.max(settings.par.leftIndent - 5, 0);
  prevParagraph.style["text-indent"] = settings.par.leftIndent + "px";
  setIndent("text-indent", "prevIndent", settings.par.leftIndent);
  save();
}
function setParRightIndent() {
  settings.par.rightIndent = Math.max(settings.par.rightIndent - 5, 0);  
  setIndent("padding-right", "prevOutdent", settings.par.rightIndent);
  save();
}
function setParRightOutdent() {
  settings.par.rightIndent += 5;
  prevParagraph.style["padding-right"] = settings.par.rightIndent + "px";
  setIndent("padding-right", "prevOutdent", settings.par.rightIndent);
  save();
}
function setParFontFamily() {
  settings.par.fontFamily = document.getElementById("cbFontFamily").value;
  prevParagraph.style["font-family"] = settings.par.fontFamily;
  save();
}

//events on book section
function fillFontSizeComb(combo, defaultValue) {
  const opts = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];
  let html = "";
  for (let opt of opts) {
    if (opt === defaultValue) {
      html += `<option selected>${opt}</option>`;
    } else {
      html += `<option>${opt}</option>`;
    }
  }
  combo.innerHTML = html;
}
function setBookFontSize() {
  settings.book.fontSize = parseInt(document.getElementById("cbBookFontSize").value);
  prevBook.style["font-size"] = settings.book.fontSize + "px";
  save();
}
function setBookBack() {
  settings.book.background = document.getElementById("btBookBack").value;
  prevBook.style["background-color"] = settings.book.background;
  save();
}
function setBookBold() {
  settings.book.bold = document.getElementById("btBookBold").checked;
  prevBook.style["font-weight"] = settings.book.bold ? "bold" : "normal";
  save();
}
function setBookColor() {
  settings.book.color = document.getElementById("btBookColor").value;
  prevBook.style["color"] = settings.book.color;
  save();
}
function setBookItalic() {
  settings.book.italic = document.getElementById("btBookItalic").checked;
  prevBook.style["font-style"] = settings.book.italic ? "italic" : "normal";
  save();
}
/*TODO: Se refiere solo al capítulo? Si es a todo, y está en una línea aparte, no tiene sentido */
function setBookSub() {
  settings.book.subscript = document.getElementById("btBookSub").checked;
  document.getElementById("btBookSuper").checked = false;
  prevBook.style["vertical-align"] = settings.book.subscript ? "sub" : "baseline";
  save();
}
function setBookSuper() {
  settings.book.superscript = document.getElementById("btBookSuper").checked;
  document.getElementById("btBookSub").checked = false;
  prevBook.style["vertical-align"] = settings.book.superscript ? "super" : "baseline";
  save();
}
function setBookUnder() {
  settings.book.underline = document.getElementById("btBookUnder").checked;
  prevBook.style["text-decoration"] = settings.book.underline ? "underline" : "none";
  save();
}

//events on num section
function setNumFontSize() {
  settings.verse.fontSize = parseInt(document.getElementById("cbNumFontSize").value);
  prevVerse.style["font-size"] = settings.verse.fontSize + "px";
  save();
}
function setNumBack() {
  settings.verse.background = document.getElementById("btNumBack").value;
  prevVerse.style["background-color"] = settings.verse.background;
  save();
}
function setNumBold() {
  settings.verse.bold = document.getElementById("btNumBold").checked;
  prevVerse.style["font-weight"] = settings.verse.bold ? "bold" : "normal";
  save();
}
function setNumColor() {
  settings.verse.color = document.getElementById("btNumColor").value;
  prevVerse.style["color"] = settings.verse.color;
  save();
}
function setNumItalic() {
  settings.verse.italic = document.getElementById("btNumItalic").checked;
  prevVerse.style["font-style"] = settings.verse.italic ? "italic" : "normal";
  save();
}
function setNumSub() {
  settings.verse.subscript = document.getElementById("btNumSub").checked;
  document.getElementById("btNumSuper").checked = false;
  prevVerse.style["vertical-align"] = settings.verse.subscript ? "sub" : "baseline";
  save();
}
function setNumSuper() {
  settings.verse.superscript = document.getElementById("btNumSuper").checked;
  document.getElementById("btNumSub").checked = false;
  prevVerse.style["vertical-align"] = settings.verse.superscript ? "super" : "baseline";
  save();
}
function setNumUnder() {
  settings.verse.underline = document.getElementById("btNumUnder").checked;
  prevVerse.style["text-decoration"] = settings.verse.underline ? "underline" : "none";
  save();
}

//Events on text section
function setTextFontSize() {
  settings.text.fontSize = parseInt(document.getElementById("cbTextFontSize").value);
  prevText.style["font-size"] = settings.text.fontSize + "px";
  save();
}
function setTextBack() {
  settings.text.background = document.getElementById("btTextBack").value;
  prevText.style["background-color"] = settings.text.background;
  save();
}
function setTextBold() {
  settings.text.bold = document.getElementById("btTextBold").checked;
  prevText.style["font-weight"] = settings.text.bold ? "bold" : "normal";
  save();
}
function setTextColor() {
  settings.text.color = document.getElementById("btTextColor").value;
  prevText.style["color"] = settings.text.color;
  save();
}
function setTextItalic() {
  settings.text.italic = document.getElementById("btTextItalic").checked;
  prevText.style["font-style"] = settings.text.italic ? "italic" : "normal";
  save();
}
function setTextSub() {
  settings.text.subscript = document.getElementById("btTextSub").checked;
  document.getElementById("btTextSuper").checked = false;
  prevText.style["vertical-align"] = settings.text.subscript ? "sub" : "baseline";
  save();
}
function setTextSuper() {
  settings.text.superscript = document.getElementById("btTextSuper").checked;
  document.getElementById("btTextSub").checked = false;
  prevText.style["vertical-align"] = settings.text.superscript ? "super" : "baseline";
  save();
}
function setTextUnder() {
  settings.text.underline = document.getElementById("btTextUnder").checked;
  prevText.style["text-decoration"] = settings.text.underline ? "underline" : "none";
  save();
}

function save() {
  localStorage.setItem("bible.settings", JSON.stringify(settings));
}

var bibleVersions = null;
async function updateVersions() {
  try {
    bibleVersions = await BibleGetService.getVersions();
    localStorage.setItem("bible.versions", JSON.stringify(bibleVersions));
  } catch (e) {
    notifyError(tr("ERROR_AT_QUERY_SERVER"));
    console.error(e);
  }
}

async function fillVersions() {
  if (bibleVersions === null) {
    await updateVersions();
  }
  if (bibleVersions === null) {
    return;
  }
  let html = "";
  for (const [abbrev, nameyear] of Object.entries(bibleVersions)) {
    html += createVersionEntry(abbrev, nameyear.split("|"));
  }

  let list = document.getElementById("tbVersions");
  list.innerHTML = html;
  document.getElementById("txtNbVersions").innerHTML = Object.keys(bibleVersions).length;
}

function createVersionEntry(abbr, nameyear) {
  let title = nameyear[0];
  let year = nameyear[1];
  return `<tr><td>${abbr}</td><td>${title}</td><td>${year}</td></tr>`;
}
//Languages
async function fillSupportedLanguages() {
  let languages = await getSupportedLanguages();
  if (languages) {
    let txtLang = document.getElementById("txtLang");
    txtLang.innerHTML = languages.join(", ");
    document.getElementById("txtNbLang").innerHTML = languages.length;
  }
}

async function getSupportedLanguages() {
  try {
    let json = localStorage.getItem("bible.languages");
    let languages;
    if (json == null) {
      languages = await BibleGetService.getLanguages();
      languages = languages.sort().map(s => s.slice(0,1) + s.slice(1).toLowerCase());
      localStorage.setItem("bible.languages", JSON.stringify(languages));
    } else {
      languages = JSON.parse(json);
    }
    return languages;
  } catch (e) {
    notifyError(tr("ERROR_AT_QUERY_SERVER"));
    console.error(e);
  }
  return null;
}
function notifyError(errorMessage) {
  document.getElementById("lbErrMsg").innerHTML = errorMessage;
}

function setAppLanguage() {
  const lang = document.getElementById("cbLang").value;
  localStorage.setItem("bible.i18n.lang", lang ? lang.toLowerCase() : "es");
}

/*************************************************************************************************/
const axios = require("axios");
const BGET_METADATA_ENDPOINT = "https://query.bibleget.io/v3/metadata.php?";

export var BibleGetService = {
  getVersions: async function() {
    const payload = { query: "bibleversions", return: "json" };
    const response = await axios.get(BGET_METADATA_ENDPOINT, { params: payload });
    return response.data.validversions_fullname;
  },
  getLanguages: async function() {
    const payload = { query: "biblebooks", return: "json" };
    const response = await axios.get(BGET_METADATA_ENDPOINT, { params: payload });
    return response.data.languages;
  }
};
