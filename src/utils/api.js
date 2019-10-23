// Actual default values
import Remarkable  from 'remarkable'

export const md = new Remarkable({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      true,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
    highlight: function (/*str, lang*/) { return ''; }
});

// генерируем случайное число в пределах min/max (включая min/max)
 export function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  export function scrollToElementById(id) {
    const el = document.getElementById(id);

    //console.log(id);
    //console.log(el);

    if(el){
        el.scrollIntoView();
    }
  }