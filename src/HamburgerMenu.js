(() => {
    let svg = document.currentScript.getAttribute("data-svg");
    let mediaQuery = window.matchMedia("(max-width: 767px)");

    window.addEventListener("DOMContentLoaded", () => {
        let nav = document.querySelector("body > header > nav");

        let ul = nav.querySelector("ul");

        let opener = document.createElement("button");
        {
            let icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            {
                let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                use.setAttribute("href", svg + "#opener");
                icon.append(use);
            }
            icon.setAttribute("viewBox", "0 0 24 24");
            opener.append(icon);
            opener.setAttribute("command", "show-modal");
            opener.setAttribute("commandfor", "hamburger-menu");
            opener.setAttribute("class", "hamburger-button");
        }

        let dialog = document.createElement("dialog");
        {
            let closer = document.createElement("button");
            let icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            {
                let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                use.setAttribute("href", svg + "#closer");
                icon.append(use);
            }
            icon.setAttribute("viewBox", "0 0 24 24");
            closer.append(icon);
            closer.setAttribute("command", "close");
            closer.setAttribute("commandfor", "hamburger-menu");
            closer.setAttribute("class", "hamburger-button");
            dialog.append(closer);
            dialog.setAttribute("id", "hamburger-menu");
        }

        function relocateMenu() {
            if(mediaQuery.matches) {
                dialog.append(ul);
                nav.append(opener, dialog);
            } else {
                opener.remove();
                dialog.remove();
                nav.append(ul);
            }
        }

        mediaQuery.addEventListener("change", relocateMenu);
        relocateMenu();
    });
})();