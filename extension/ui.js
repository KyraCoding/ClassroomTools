export class UI {
    /** Wraps raw DOM element */
    constructor(dom) {
        /** @type { HTMLElement } */
        this.dom = dom;
    }

    /** Creates element with tag name */
    static tag(name) {
        return new UI(document.createElement(name));
    }

    /**
     * Specifies ID of element
     * @param  {string} x 
     * @returns {UI}
     */
    id(x) {
        this.dom.id = x;
        return this;
    }

    /**
     * Specifies classes with a space separated string
     * @param {string} x 
     * @returns {UI}
     */
    clz(x) {
        this.dom.className = x;
        return this;
    }

    /**
     * Specifies classes separately
     * @param  {...string} x 
     * @returns {UI}
     */
    cls(...x) {
        this.dom.classList.add(...x);
        return this;
    }

    /**
     * Specifies child elements
     * @param  {...(UI | string)} children 
     * @returns {UI}
     */
    sub(...children) {
        children.forEach(x => {
            this.dom.append(x.dom || x);
        });
        return this;
    }

    /**
     * Adds a child element
     * @param  {...any} elements
     */
    add(...elements) {
        for (const x of elements) {
            this.dom.append(x.dom || x);
        }
    }

    /**
     * Adds event listener
     * @param {string} event 
     * @param {EventListenerOrEventListenerObject} listener 
     */
    on(event, listener) {
        this.dom.addEventListener(event, listener);
    }

    /**
     * Specifies attribute of element
     * @param {string} key 
     * @param {string} value 
     * @returns 
     */
    attr(key, value) {
        this.dom.setAttribute(key, value);
        return this;
    }
}