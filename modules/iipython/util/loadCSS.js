const createElement = require("./createElement");
module.exports = (css, style_id) => {
    let elem = createElement("style", {
        id: `iipython-css-${style_id || 'raw'}`
    });
    elem.innerHTML = css;
    document.head.appendChild(elem);
};
