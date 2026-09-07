const noimage = document.currentScript.getAttribute("data-noimage");

class ImageList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("load", this);
    }

    handleEvent(event) {
        let paths = this.imagePaths();

        let ul = document.createElement("ul");
        for(let i = 0; i < paths.length; i++) {
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.setAttribute("src", paths[i]);
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
    }

    imagePaths() {
        let url = "https://api.github.com/repos/newwavejazzorchestra/website/contents/resources/gallery/";

        return fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();   
            } else {
                return [];
            }
        })
        .then(json => {
            let regex = /\.(jpg|jpeg|png|gif|webp)$/i;

            if(Array.isArray(json)) {
                return json.filter(file => file.type == "file" && regex.test(file.path))
                .map(file => file.path);
            } else {
                return [];
            }
        });
    }
}

customElements.define("image-list", ImageList);