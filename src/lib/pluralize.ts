import rawPluralize from 'pluralize';

const customPluralize = rawPluralize;

customPluralize.addPluralRule(/__$/i, '__');

export { customPluralize };
