/*
 * ## ARQUIVO PRINCIPAL DE CONFIGURAÇÕES DO REQUIREJS ##
 *
 * unico arquivo referenciado no html, todas demais chamadas de arquivo js deverão
 * ser feitas através da tag "meta#jsPageID" com o "data-value" referenciando o script
 *
 *      @ ex meta
 *          <meta id="jsPageID" data-value="home" />
 *      @ ex chamada js
 *          if (item == 'home') require(['pages/home.min']);
 *
 * estas chamadas de js deverão ser posicionadas dentro do callback do 'require(['actualPage'])'
 *
 */

// CONFIG REQUIRE JS
requirejs.config({

    paths: {
        jquery: `//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min`,      // jquery 3.x
        cfw: `//src.inf.br/cfw/cfw.min`,                                        // framework
        recaptcha: `//www.google.com/recaptcha/api`,                            // recaptcha google
        addthis: `//s7.addthis.com/js/300/addthis_widget.js`                    // addthis
    },

    //urlArgs: `v=1.0`,                         // produção
    urlArgs: `ve=${new Date().getTime()}`,    // desenvolvimento

    shim: {
        'cfw': ['jquery']
    }

});

// verifica pagina atual baseada no elemento #jsPageID
// exemplo de como informar página: @<meta id="jsPageID" data-value="home" />
define('actualPage', () => {
    const element = document.getElementById('jsPageID');
    let modulos = [];

    if (element !== null)
        modulos = element.getAttribute('data-value').split(',');

    return modulos;
});

// chamada analytics + scripts pagina
require(
    [
        'actualPage',
        'components/analytics.min'
    ],
    (modulos) => {
        for (let i = 0; i < modulos.length; i++) {
            require([`${modulos[i].trim()}.min`]);
        }
    }
);

/*
<meta id="jsPageID" data-value="home" />
*/