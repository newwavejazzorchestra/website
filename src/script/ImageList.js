const noimage = document.currentScript.getAttribute("data-noimage");

class ImageList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("load", this);
    }

    handleEvent(event) {
        fetch("resources/gallery/index.json")
        .then(response => {
            if(response.ok) {
                return response.json();   
            } else {
                return [];
            }
        })
        .then(images => {
            let ul = document.createElement("ul");
            for(let i = 0; i < images.length; i++) {
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.setAttribute("src", "resources/gallery/" + images[i]);
                img.onerror = () => {
                    img.setAttribute("src", noimage);
                    img.onerror = null;
                };
                img.setAttribute("alt", "image");
                li.appendChild(img);
                ul.appendChild(li);
            }
            this.parentElement.insertBefore(ul, this);
            this.remove();
        });
    }
}

customElements.define("image-list", ImageList);