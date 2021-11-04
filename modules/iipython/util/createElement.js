module.exports = (name, props) => {
    const element = document.createElement(name);
    for (const prop in props) {
        if ([ "style", "href" ].includes(prop) || prop.startsWith("data-")) element.setAttribute(prop, props[prop]);
        else element[prop] = props[prop];
    }
    return element;
};
