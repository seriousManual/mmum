const querystring = require('querystring');
const cheerio = require('cheerio');
const axios = require('axios');

const BASE_PATH = 'https://www.maischemalzundmehr.de/index.php?inhaltmitte=lr&suche_begriff={term}&suche=Suche';

class Parser {
    async get(term) {
        term = querystring.escape(term);
        const url = this.getUrlForTerm(term);
        console.log('querying for ' + url);
        const result = await axios.get(url);

        const $ = cheerio.load(result.data);
        const a = $('#lr_block .lr a');

        return a.map((index, e) => e.attribs.href).get();
    }

    getUrlForTerm(term) {
        return BASE_PATH.replace('{term}', term);
    }
}

module.exports = Parser;