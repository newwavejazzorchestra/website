class AttrButton extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener("click", this);
    }

    handleEvent(event) {
        event.preventDefault();

        let target = this.getAttribute("target");
        let attr = this.getAttribute("attr");
        let value = this.getAttribute("value");

        document.getElementById(target).setAttribute(attr, value);
    }
}

customElements.define("attr-button", AttrButton, {extends: "button"});