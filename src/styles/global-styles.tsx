import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --good--color: #00cccc;
        --warning--color: #ff6363;
        --danger--color: #ff4336;
        --active--color: #03b295;
        --inactive--color: #909090;
        --link--color: rgb(35, 119, 235);
        --primary--color: #3f51b5;
    }

    body {
        margin: 5em 2em 2em 2em !important;
        padding: 0;
        font-family: Open-Sans, Helvetica, Sans-Serif;
        display: block;
    }

    div.page-title {
        text-indent: 0.4em;
        font-weight: 300;
        font-size: 1.3em;
        margin-bottom: 0.8em;
        color: rgb(8, 38, 82);
    }

    .clickable {
        cursor: pointer;
        color: var(--link--color);
        font-weight: 400;
        text-decoration: none;
    }

    .margin-top-1em {
        margin-top: 1em;
    }
`;

export default GlobalStyle;
