class NewsList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener("load", this);
    }

    handleEvent(event) {
        fetch("resources/news/articles.xml")
        .then(response => {
            if(response.ok) {
                return response.text();
            } else {
                return "<?xml version = \"1.0\" encoding = \"UTF-8\"?><articles></articles>";
            }
        })
        .then(text => {
            let parser = new DOMParser();
            let dom = parser.parseFromString(text, "text/xml");
            let xmlArticles = dom.getElementsByTagName("article");

            let ol = document.createElement("ol");

            for(let i = 0; i < xmlArticles.length; i++) {
                let li = document.createElement("li");

                let article = document.createElement("article");
                
                let img = document.createElement("img");
                let image = xmlArticles[i].querySelector("image").textContent;
                img.setAttribute("src", "../resources/news/" + image);
                img.setAttribute("alt", "image");
                article.appendChild(img);
                
                let h1 = document.createElement("h1");
                let title = xmlArticles[i].querySelector("title").textContent;
                h1.textContent = title;
                article.appendChild(h1);

                let ul = document.createElement("ul");
                let dates = xmlArticles[i].querySelector("dates").textContent.split(/[,\s]+/);
                for(let i = 0; i < dates.length; i++) {
                    let time = document.createElement("time");
                    time.setAttribute("datetime", dates[i]);
                    time.textContent = dates[i].replaceAll(/[-\/]/g, (match) => match == "-" ? "/" : "-");
                    ul.appendChild(document.createElement("li")).appendChild(time);
                }
                article.appendChild(ul);

                let paragraph = xmlArticles[i].querySelector("paragraph").textContent;
                article.insertAdjacentHTML("beforeend", paragraph);

                li.appendChild(article);

                ol.appendChild(li);
            }
            this.parentElement.insertBefore(ol, this);
            this.remove();
        });
    }
}

customElements.define("news-list", NewsList);