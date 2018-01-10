const JS_REGEX = /\.js$/;
export default function html(helmet, stats, data, content) {
    const scripts = stats.assets.filter(asset => JS_REGEX.test(asset.name)).map(script => stats.publicPath + script.name);
    const html = `
        <!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
                <div id="root">
                    ${content}
                </div>
                <script type="text/javascript">
                    window.__INITIAL_STATE__ = JSON.parse('${JSON.stringify(data)}');
                </script>
                ${scripts.map(script => `<script src="${script}"></script>`).join('')}
            </body>
        </html>
    `;
    return html;
};
