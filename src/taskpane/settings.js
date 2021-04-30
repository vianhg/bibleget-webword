Office.onReady().then(function() {
  document.getElementById("btCollapsePar").onclick = () => toggleParagraphCard("formPar");
  document.getElementById("btCollapseBook").onclick = () => toggleParagraphCard("formBook");
  document.getElementById("btCollapseNum").onclick = () => toggleParagraphCard("formNum");
  document.getElementById("btCollapseText").onclick = () => toggleParagraphCard("formText");

  //events on paragraph section
  document.getElementById("btAlignCenter").onclick = setParAlignCenter;
  document.getElementById("btAlignJustify").onclick = setParAlignJustify;
  document.getElementById("btAlignLeft").onclick = setParAlignLeft;
  document.getElementById("btAlignRight").onclick = setParAlignRight;
  document.getElementById("btInter1").onclick = setParInter1;
  document.getElementById("btInter15").onclick = setParInter15;
  document.getElementById("btInter2").onclick = setParInter2;
  document.getElementById("btLeftIndent").onclick = setParLeftIndent;
  document.getElementById("btLeftOutdent").onclick = setParLeftOutdent;
  document.getElementById("btRightIndent").onclick = setParRightIndent;
  document.getElementById("btRightOutdent").onclick = setParRightOutdent;
  document.getElementById("cbFontFamily").onclick = setParFontFamily;

  //events on book section
  document.getElementById("cbBookFontSize").onclick = setBookFontSize;  
  document.getElementById("btBookBack").onclick = setBookBack;
  document.getElementById("btBookBold").onclick = setBookBold;
  document.getElementById("btBookColor").onclick = setBookColor;
  document.getElementById("btBookItalic").onclick = setBookItalic;
  document.getElementById("btBookSub").onclick = setBookSub;
  document.getElementById("btBookSuper").onclick = setBookSuper;
  document.getElementById("btBookUnder").onclick = setBookUnder;

  //events on num section
  document.getElementById("btNum1").onclick = setNumLineH1;
  document.getElementById("btNum15").onclick = setNumLineH15;
  document.getElementById("btNum2").onclick = setNumLineH2;
  document.getElementById("btNumBack").onclick = setNumBack;
  document.getElementById("btNumBold").onclick = setNumBold;
  document.getElementById("btNumColor").onclick = setNumColor;
  document.getElementById("btNumItalic").onclick = setNumItalic;
  document.getElementById("btNumSub").onclick = setNumSub;
  document.getElementById("btNumSuper").onclick = setNumSuper;
  document.getElementById("btNumUnder").onclick = setNumUnder;

  //Events on text section
  document.getElementById("btText1").onclick = setTextLineH1;
  document.getElementById("btText15").onclick = setTextLineH15;
  document.getElementById("btText2").onclick = setTextLineH2;
  document.getElementById("btTextBack").onclick = setTextBack;
  document.getElementById("btTextBold").onclick = setTextBold;
  document.getElementById("btTextColor").onclick = setTextColor;
  document.getElementById("btTextItalic").onclick = setTextItalic;
  document.getElementById("btTextSub").onclick = setTextSub;
  document.getElementById("btTextSuper").onclick = setTextSuper;
  document.getElementById("btTextUnder").onclick = setTextUnder;

  document.getElementById("btUpdateVersions").onclick = updateVersions;
  fillVersions();
});

function toggleParagraphCard(id) {
  const classHiden = "is-hidden";
  let classList = document.getElementById(id).classList;
  if (classList.contains(classHiden)) {
    classList.remove(classHiden);
  } else {
    classList.add(classHiden);
  }
}

let settings = {
  par: { align: "left", interline: 1, leftIndent: 0, rightIndex: 0, fontFamily: "Arial" },
  book: {
    fontSize: 10,
    bold: false,
    color: "black",
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  },
  verse: {
    fontSize: 10,
    bold: false,
    color: "black",
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  },
  text: {
    fontSize: 10,
    bold: false,
    color: "black",
    italic: false,
    subscript: false,
    superscript: false,
    underline: false
  }
};

//events on paragraph section
function setParAlignCenter() {
  settings.par.align = "center";
}
function setParAlignJustify() {
  settings.par.align = "justify";
}
function setParAlignLeft() {
  settings.par.align = "left";
}
function setParAlignRight() {
  settings.par.align = "right";
}
function setParInter1() {
  settings.par.interline = 1;
}
function setParInter15() {
  settings.par.interline = 1.5;
}
function setParInter2() {
  settings.par.interline = 2;
}
function setParLeftIndent() {
  settings.par.leftIndent -= 1;
}
function setParLeftOutdent() {
  settings.par.leftIndent += 1;
}
function setParRightIndent() {
  settings.par.rightIndent -= 1;
}
function setParRightOutdent() {
  settings.par.rightIndent += 1;
}
function setParFontFamily() {
  settings.par.fontFamily = document.getElementById("cbFontFamily").value;
}

//events on book section
function setBookFontSize() {
  settings.book.fontSize = document.getElementById("cbBookFontSize").value;
}
function setBookBack() {}
function setBookBold() {}
function setBookColor() {}
function setBookItalic() {}
function setBookSub() {}
function setBookSuper() {}
function setBookUnder() {}

//events on num section
function setNumLineH1() {}
function setNumLineH15() {}
function setNumLineH2() {}
function setNumBack() {}
function setNumBold() {}
function setNumColor() {}
function setNumItalic() {}
function setNumSub() {}
function setNumSuper() {}
function setNumUnder() {}

//Events on text section
function setTextLineH1() {}
function setTextLineH15() {}
function setTextLineH2() {}
function setTextBack() {}
function setTextBold() {}
function setTextColor() {}
function setTextItalic() {}
function setTextSub() {}
function setTextSuper() {}
function setTextUnder() {}

function updateVersions() {}

function updatePreview() {}

let metadata = {
  results: [],
  errors: [],
  info: { ENDPOINT_VERSION: "2.8" },
  validversions: ["CEI2008", "DRB", "LUZZI", "NABRE", "NVBSE", "VGCL", "BLPD"],
  validversions_fullname: {
    CEI2008: "Conferenza Episcopale Italiana|2008|it",
    DRB: "Douay–Rheims Challoner Revision|1752|en",
    LUZZI: "Riveduta - Luzzi|1924|it",
    NABRE: "New American Bible - Revised Edition|2011|en",
    NVBSE: "Nova Vulgata - Bibliorum Sacrorum Editio|1979|la",
    VGCL: "Vulgata Clementina|1592|la",
    BLPD: "Libro del Pueblo de Dios|2015|es"
  },
  copyrightversions: ["CEI2008", "NABRE", "BLPD"]
};
function fillVersions() {
  let versions = metadata.validversions_fullname;
  let html = "";
  Object.keys(versions).forEach((abbrev, nameyear) => {
    html += createVersionEntry(abbrev, nameyear.split("|"));
  });

  let list = document.getElementById("tbVersions");
  list.innerHTML = html;
}

function createVersionEntry(abbr, nameyear) {
  let title = nameyear[0];
  let year = nameyear[1];
  return `<tr><td>${abbr}</td><td>${title}</td><td>${year}</td></tr>`;
}
