import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
    --background-colour: rgb(228, 253, 237, 1);
    --primary-div-colour: rgb(209, 209, 239, 1);
    --div-accent-colour: rgb(43, 43, 216, 1);
    --box-shadow-colour: rgb(43, 43, 216, 0.5);
    --header-colour: rgb(20, 24, 107, 1);
    --font-header: 'Contrail One', sans-serif;
    --font-body: 'Archivo Narrow', sans-serif;
    --standard-box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.3),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.3),
        3px 3px 3px 3px rgb(43, 43, 216, 0.2),
        -3px -3px 3px 3px rgb(43, 43, 216, 0.2),
        4px 4px 4px 4px rgb(43, 43, 216, 0.1),
        -4px -4px 4px 4px rgb(43, 43, 216, 0.1);
}

html {
    font-size: 100%;
}

body, div {
    font-family: Verdana, sans-serif;
}

/* Removes link text decoration */
a:link { text-decoration: none; }
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }
`