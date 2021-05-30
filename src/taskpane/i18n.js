var i18n = {
  es: {
    ERROR_AT_QUERY_SERVER: "Hubo un problema al consultar el servidor.",
    ERROR_SEARCH_BY_KEYWORD: "Hubo un problema al buscar por palabra clave en el servidor.",
    ERROR_SEARCH_BY_QUOTE: "Hubo un problema al consultar la cita bíblica en el servidor.",
    ERROR_GET_VERSIONS: "Hubo un problema al consultar las versiones en el servidor.",
    ERROR_BAD_QUOTE: "El formato de la cita bíblica no es válido.",
    ABOUT_DEF:
      "Este es un complemento para MS Word, parte del proyecto BibleGet I/O, que es una herramienta para citar las Escrituras Sagradas en la era digital.",
    ABOUT_MORE_INFO: "Para mayor información, consultar",
    HELP_TITLE1: "Formulación de las consultas biblicas",
    HELP_QUOTING0:
      'Las consultas bíblicas se formulan de acuerdo con un conjunto de normas precisas, siguiendo la notación estándar para las citas bíblicas. Una consulta consta de al menos dos elementos: el libro bíblico seguido por el capítulo. El libro bíblico puede ser escrito por completo o por la forma abreviada utilizando las abreviaturas que figuran en la tabla de las Abreviaturas de los libros bíblicos. Por ejemplo, "Mateo 1" significa el libro de Mateo (es decir, el Evangelio según San Mateo) en el capítulo 1. También se puede escribir "Mt 1".',
    HELP_Q_SIGNS:
      "Lo que sigue es una presentación de los signos que sirven para indicar exactamente qué combinación de capítulos y versículos desea citar.",
    HELP_Q_COMMA:
      '",": la coma es el separador capítulo-versículo. "Mateo 1,5" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5.',
    HELP_Q_DOT:
      '".": el punto es el separador versículo-versículo. "Mateo 1,5.7" significa el libro (Evangelio) de San Mateo, capítulo 1, versículo 5 y versículo 7.',
    HELP_Q_SCORE: '"-": el guión es el separador desde - hasta, que puede ser utilizado en una variedad de maneras:',
    HELP_Q_SCORE1:
      'desde capítulo hasta capítulo: "Mateo 1-2" significa el evangelio según San Mateo, desde el capítulo 1 hasta el capítulo 2',
    HELP_Q_SCORE2:
      'desde capítulo, versículo hasta versículo del mismo capítulo: "Mateo 1,1-5" significa el evangelio según San Mateo, desde el capítulo 1, versículo 1 hasta el versículo 5',
    HELP_Q_SCORE3:
      'desde capítulo, versículo hasta capítulo, versículo: "Mateo 1,5-2,13" significa el evangelio según San Mateo, desde el capítulo 1, versículo 5, hasta el capítulo 2, versículo 13',
    HELP_Q_COMPLEX:
      'Las diferentes combinaciones de estos signos se pueden utilizar para formular consultas más complejas, por ejemplo "Mt1,1-3.5.7-9" significa el evangelio según San Mateo, capítulo 1, versículos del 1 al 3, versículo 5, y los versículos 7 a 9.',
    HELP_Q_MULTIPLE:
      'Múltiples consultas se pueden hacer a la vez utilizando un punto y coma ";" para concatenar las consultas. Si la consulta que sigue el punto y coma se rifiere a el mismo libro de la consulta anterior, entonces no es necesario indicar nuevamente el libro. Por ejemplo, "Mateo 1,1;2,13" significa el evangelio según San Mateo capítulo 1 versículo 1 y capítulo 2 versículo 13. Combinando todos estos signos, se pueden hacer consultas mucho más complejas que toman versículos de diferentes libros: "Génesis 1,3-5.7.9-11.13;2,4-9.11-13;Apocalipsis 3,10.12-14".',
    HELP_SPACES:
      'No importa si las consultas tienen espacios, esto no tiene ningún efecto en el resultado final. Así como el uso de mayúsculas o minúsculas no hace ninguna diferencia. "Génesis 1,1", "Gen1,1", "génesis1,1" y "gEn 1,1", por ejemplo, van a funcionar con el mismo resultado.',
    HELP_TITLE2: "Libros / Abreviaturas",
    SRESULT_RCOUNT: "resultados encontrados",
    SRESULT_GOTO: "Ir a la página _ de",
    SRESULT_CLOSE: "Cerrar",
    MAIN_SQUOTE: "Buscar por cita",
    MAIN_SKEYWORD: "Buscar por palabra clave",
    MAIN_EXACT: "Coincidencia exacta",
    MAIN_VERSION: "Versión",
    MAIN_ORIGIN: "Origen preferido",
    MAIN_O_GREEK: "Griego",
    MAIN_O_HEBREW: "Hebreo",
    SETTING_TIT_FORMAT: "Formato del texto",
    SETTING_TIT_PARSTYLE: "Estilos de párrafo",
    SETTING_TIT_BOOK: "Formato Libro / Capítulo",
    SETTING_TIT_VERSE: "Formato número de versículo",
    SETTING_TIT_TEXT: "Formato texto del versículo",
    SETTING_PREVIEW: "Vista previa",
    SETTING_LANG: "Versiones e idiomas compatibles",
    SETTING_LANG0: "Los nombres de los libros de la Biblia son reconocidos actualmente en",
    SETTING_LANG1: "idiomas diferentes. Actualmente los idiomas soportados son:",
    SETTING_SUP_VERS: "versiones de la Biblia están soportadas actualmente:",
    SETTING_TH_ABBR: "Abreviatura",
    SETTING_TH_TITLE: "Título",
    SETTING_TH_YEAR: "Año",
    SETTING_UPDATE: "Actualizar desde el servidor.",
    "Juan 3, 16": "Juan 3, 16",
    "Creación": "Creación",
    "Consultar": "Consultar",
    "Configuración": "Configuración",
    "Ayuda": "Ayuda",
    "Acerca de": "Acerca de",
    "Filtrar": "Filtrar",
    "Anterior": "Anterior",
    "Siguiente": "Siguiente"
  },
  en: {
    ERROR_AT_QUERY_SERVER: "There was an error when querying the server.",
    ERROR_SEARCH_BY_KEYWORD: "Hubo un problema al buscar por palabra clave en el servidor.",
    ERROR_SEARCH_BY_QUOTE: "Hubo un problema al consultar la cita bíblica en el servidor.",
    ERROR_GET_VERSIONS: "Hubo un problema al consultar las versiones en el servidor.",
    ERROR_BAD_QUOTE: "The biblical quote format is not valid.",
    ABOUT_DEF:
      "This is a plug-in for MS Word, part of the BibleGet I/O project, which is a tool for quoting the Holy Scriptures in the digital age.",
    ABOUT_MORE_INFO: "For more information, see",
    HELP_TITLE1: "Formulation of biblical queries",
    HELP_QUOTING0:
      'Biblical inquiries are formulated according to a precise set of rules, following the standard notation for Biblical quotations. A query consists of at least two elements: the biblical book followed by the chapter. The biblical book can be written in full or in abbreviated form using the abbreviations listed in the table of Abbreviations of biblical books. For example, "Matthew 1" means the book of Matthew (that is, the Gospel according to Matthew) in chapter 1. It can also be written "Mt 1". ',
    HELP_Q_SIGNS:
      "The following is a presentation of the signs that serve to indicate exactly what combination of chapters and verses you want to cite.",
    HELP_Q_COMMA:
      '",": the comma is the chapter-verse separator. "Matthew 1,5" means the book (Gospel) of Saint Matthew, chapter 1, verse 5. ',
    HELP_Q_DOT:
      '".": the period is the verse-verse separator. "Matthew 1,5.7" means the book (Gospel) of Saint Matthew, chapter 1, verse 5 and verse 7. ',
    HELP_Q_SCORE: '"-": the hyphen is the from - to separator, which can be used in a variety of ways:',
    HELP_Q_SCORE1:
      'from chapter to chapter: "Matthew 1-2" means the gospel according to St. Matthew, from chapter 1 to chapter 2',
    HELP_Q_SCORE2:
      'from chapter, verse to verse of the same chapter: "Matthew 1,1-5" means the gospel according to St. Matthew, from chapter 1, verse 1 to verse 5',
    HELP_Q_SCORE3:
      'from chapter, verse to chapter, verse: "Matthew 1,5-2,13" means the gospel according to Saint Matthew, from chapter 1, verse 5, to chapter 2, verse 13',
    HELP_Q_COMPLEX:
      'The different combinations of these signs can be used to formulate more complex queries, for example "Mt1,1-3.5.7-9" means the gospel according to Matthew, chapter 1, verses 1 to 3, verse 5, and the verses 7 to 9. ',
    HELP_Q_MULTIPLE:
      'Multiple queries can be done at once using a semicolon ";" to concatenate the queries. If the query that follows the semicolon refers to the same book as the previous query, then it is not necessary to indicate the book again. For example, "Matthew 1,1; 2,13" means the gospel according to Saint Matthew chapter 1 verse 1 and chapter 2 verse 13. By combining all these signs, much more complex queries can be made that take verses from different books: "Genesis 1,3-5.7.9-11.13; 2,4-9.11-13; Revelation 3,10.12-14 ". ',
    HELP_SPACES:
      'It does not matter if the queries have spaces, this has no effect on the final result. Just as the use of upper or lower case does not make any difference. "Genesis 1,1", "Gen1,1", "genesis1,1" and "gEn 1,1", for example, will work with the same result. ',
    HELP_TITLE2: "Books / Abbreviations",
    SRESULT_RCOUNT: "results found",
    SRESULT_GOTO: "Go to page _ of",
    SRESULT_CLOSE: "Close",
    MAIN_SQUOTE: "Search by quote",
    MAIN_SKEYWORD: "Search by keyword",
    MAIN_EXACT: "Exact match",
    MAIN_VERSION: "Version",
    MAIN_ORIGIN: "Preferred origin",
    MAIN_O_GREEK: "Greek",
    MAIN_O_HEBREW: "Hebrew",
    SETTING_TIT_FORMAT: "Text format",
    SETTING_TIT_PARSTYLE: "Paragraph styles",
    SETTING_TIT_BOOK: "Book / Chapter Format",
    SETTING_TIT_VERSE: "Verse number format",
    SETTING_TIT_TEXT: "Verse text format",
    SETTING_PREVIEW: "Preview",
    SETTING_LANG: "Supported versions and languages",
    SETTING_LANG0: "The names of the books of the Bible are currently recognized in",
    SETTING_LANG1: "different languages. Currently supported languages ​​are:",
    SETTING_SUP_VERS: "Bible versions are currently supported:",
    SETTING_TH_ABBR: "Abbreviation",
    SETTING_TH_TITLE: "Title",
    SETTING_TH_YEAR: "Year",
    SETTING_UPDATE: "Update from server.",
    "Juan 3, 16": "Jhon 3, 16",
    "Creación": "Creation",
    "Consultar": "Search",
    "Configuración": "Settings",
    "Ayuda": "Help",
    "Acerca de": "About",
    "Filtrar": "Filter",
    "Anterior": "Previous page",
    "Siguiente": "Next page"
  }
};

export function tr(code, lang) {
  let l = lang;
  if (!l) {
    l = localStorage.getItem("bible.i18n.lang");
  }
  l = l ? l : "en";
  return i18n[l] ? i18n[l][code] : "";
}

//translate attributes
function translateAttributes() {
  let attributes = document.querySelectorAll("*[translate-attr]");
  attributes.forEach(attrib => {
    let attribToTranslate = attrib.getAttribute("translate-attr");
    let translation = tr(attrib.getAttribute(attribToTranslate));
    if (translation) {
      attrib.setAttribute(attribToTranslate, translation);
    }
  });
}

export function loadTranslations() {
  let options = document.querySelectorAll("*[translate]");
  options.forEach(elem => {
    let translation = tr(elem.getAttribute("translate"));
    if (translation) {
      elem.innerHTML = translation;
    }
  });
  translateAttributes();
}
