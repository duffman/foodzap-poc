/**
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: March 2020
 */
const translate = require('@vitalets/google-translate-api');
translate('ööewfwe', { from: 'en', to: 'nl' }).then(res => {
    console.log(res);
    console.log(res.text);
    //=> Ik spea Nederlands!
    console.log(res.from.text.autoCorrected);
    //=> false
    console.log(res.from.text.value);
    //=> I [speak] Dutch!
    console.log(res.from.text.didYouMean);
    //=> true
}).catch(err => {
    console.error(err);
});
