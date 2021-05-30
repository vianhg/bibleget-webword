const metadata = {
  abbreviations: [
    "Gen",
    "Ex",
    "Lv",
    "Nm",
    "Dt",
    "Jos",
    "Jc",
    "Rt",
    "1Sa",
    "2Sa",
    "1Re",
    "2Re",
    "1Cro",
    "2Cro",
    "Esd",
    "Ne",
    "Tb",
    "Jdt",
    "Est",
    "1Mac",
    "2Mac",
    "Jb",
    "Sal",
    "Pr",
    "Qo",
    "Cant",
    "Sb",
    "Si",
    "Is",
    "Jr",
    "Lam",
    "Ba",
    "Ez",
    "Dn",
    "Os",
    "Jl",
    "Am",
    "Abd",
    "Jon",
    "Mi",
    "Na",
    "Ha",
    "Sof",
    "Ag",
    "Za",
    "Ml",
    "Mt",
    "Mc",
    "Lc",
    "Jn",
    "He",
    "Rm",
    "1Co",
    "2Co",
    "Ga",
    "Ef",
    "Flp",
    "Col",
    "1Ts",
    "2Ts",
    "1Tm",
    "2Tm",
    "Tt",
    "Flm",
    "Hb",
    "St",
    "1P",
    "2P",
    "1Jn",
    "2Jn",
    "3Jn",
    "Jd",
    "Ap"
  ],
  biblebooks: [
    "Génesis",
    "Éxodo",
    "Levítico",
    "Números",
    "Deuteronomio",
    "Josué",
    "Jueces",
    "Rut",
    "1Samuel",
    "2Samuel",
    "1Reyes",
    "2Reyes",
    "1Crónicas",
    "2Crónicas",
    "Esdras",
    "Nehemías",
    "Tobías",
    "Judit",
    "Ester",
    "1Macabeos",
    "2Macabeos",
    "Job",
    "Salmos",
    "Proverbios",
    "Eclesiastés",
    "Cantares",
    "Sabiduría",
    "Sirácides",
    "Isaías",
    "Jeremías",
    "Lamentaciones",
    "Baruc",
    "Ezequiel",
    "Daniel",
    "Oseas",
    "Joel",
    "Amós",
    "Abdías",
    "Jonás",
    "Miqueas",
    "Nahúm",
    "Habacuc",
    "Sofonías",
    "Ageo",
    "Zacarías",
    "Malaquías",
    "Mateo",
    "Marcos",
    "Lucas",
    "Juan",
    "Hechos",
    "Romanos",
    "1Corintios",
    "2Corintios",
    "Gálatas",
    "Efesios",
    "Filipenses",
    "Colosenses",
    "1Tesalonicenses",
    "2Tesalonicenses",
    "1Timoteo",
    "2Timoteo",
    "Tito",
    "Filemón",
    "Hebreos",
    "Santiago",
    "1Pedro",
    "2Pedro",
    "1Juan",
    "2Juan",
    "3Juan",
    "Judas",
    "Apocalipsis"
  ]
};
const i18n = require("./i18n");

Office.onReady().then(async function() {
  await fillAbbrev();
  i18n.loadTranslations();
});

async function fillAbbrev() {
  const json = localStorage.getItem("bible.books");
  let data;
  if (json) {
    data = JSON.parse(json);
  } else {
    let version = localStorage.getItem("bible.selectedversion");
    try {
      data = await BibleGetService.getBooks(version);
      localStorage.setItem("bible.books", JSON.stringify(data));
    } catch (e) {
      console.error(e);
      data = metadata;
    }
  }
  let abbreviatures = data.abbreviations;
  let books = data.biblebooks;
  let html = "";
  for (let i in abbreviatures) {
    html += createBookEntry(abbreviatures[i], books[i]);
  }
  let list = document.getElementById("tbBooks");
  list.innerHTML = html;
}

function createBookEntry(abbr, book) {
  return `<tr><td>${abbr}</td><td>${book}</td></tr>`;
}
/*************************************************************************************************/
const axios = require("axios");
const BGET_METADATA_ENDPOINT = "https://query.bibleget.io/v3/metadata.php?";

export var BibleGetService = {
  getBooks: async function(version = "BLPD") {
    const payload = { query: "versionindex", versions: version, return: "json" };
    const response = await axios.get(BGET_METADATA_ENDPOINT, { params: payload });
    return response.data.indexes[version];
  }
};
