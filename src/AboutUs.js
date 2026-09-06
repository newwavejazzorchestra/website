class AboutUs extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("load", this);
    }

    handleEvent(event) {
        fetch("resources/index/aboutus.xml")
        .then(response => {
            if(response.ok) {
                return response.text();
            } else {
                return "<?xml version = \"1.0\" encoding = \"UTF-8\"?><paragraph></paragraph>";
            }
        })
        .then(text => {
            let parser = new DOMParser();
            let dom = parser.parseFromString(text, "text/xml");

            let paragraph = dom.querySelector("paragraph");
            this.insertAdjacentHTML("beforebegin", paragraph.textContent);
            this.remove();
        });
    }
}

customElements.define("about-us", AboutUs);