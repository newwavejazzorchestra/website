class MemberList extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["inst"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "inst") {
            if(newValue == null) {
                return;
            }
            while(this.firstChild != null) {
                console.log(this.firstChild);
                this.removeChild(this.firstChild);
            }
            fetch("resources/members/" + newValue + ".xml")
            .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    return "<?xml version = \"1.0\" encoding = \"UTF-8\"?><members></members>";
                }
            })
            .then(text => {
                let parser = new DOMParser();
                let dom = parser.parseFromString(text, "text/xml");
                let xmlMembers = dom.getElementsByTagName("member");

                let ul = document.createElement("ul");

                for(let i = 0; i < xmlMembers.length; i++) {
                    let li = document.createElement("li");

                    let dl = document.createElement("dl");

                    {
                        let dt = document.createElement("dt");
                        dt.textContent = "画像";
                        dl.appendChild(dt);

                        let dd = document.createElement("dd");
                        let img = document.createElement("img");
                        let image = xmlMembers[i].querySelector("image").textContent;
                        img.setAttribute("src", "../resources/members/" + image);
                        img.setAttribute("alt", "image");
                        dd.appendChild(img);
                        dl.appendChild(dd);
                    }

                    {
                        let dt = document.createElement("dt");
                        dt.textContent = "学年";
                        dl.appendChild(dt);

                        let dd = document.createElement("dd");
                        let grade = xmlMembers[i].querySelector("grade").textContent;
                        dd.textContent = grade + "年"
                        dl.appendChild(dd);
                    }

                    {
                        let dt = document.createElement("dt");
                        dt.textContent = "担当楽器";
                        dl.appendChild(dt);

                        let dd = document.createElement("dd");
                        let inst = xmlMembers[i].querySelector("instrument").textContent;
                        dd.textContent = inst;
                        dl.appendChild(dd);
                    }

                    {
                        let dt = document.createElement("dt");
                        dt.textContent = "ニックネーム";
                        dl.appendChild(dt);

                        let dd = document.createElement("dd");
                        let nickname = xmlMembers[i].querySelector("nickname").textContent;
                        dd.textContent = nickname;
                        dl.appendChild(dd);
                    }

                    {
                        let dt = document.createElement("dt");
                        dt.textContent = "名前";
                        dl.appendChild(dt);

                        let dd = document.createElement("dd");
                        let name = xmlMembers[i].querySelector("name").textContent;
                        dd.textContent = name;
                        dl.appendChild(dd);
                    }

                    li.appendChild(dl);

                    ul.appendChild(li);
                }
                this.appendChild(ul);
            });
        }
    }
}

customElements.define("member-list", MemberList);