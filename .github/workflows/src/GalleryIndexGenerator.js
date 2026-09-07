const fs = require("fs");
const token = process.env.GITHUB_TOKEN;

fetch(
    "https://api.github.com/repos/newwavejazzorchestra/website/contents/resources/gallery/",
    {
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github+json",
            "User-Agent": "GitHub-Actions-Workflow-Step"
        }
    }
)
.then(response => {
    if(response.ok) {
        return response.json();   
    } else {
        return [];
    }
})
.then(json => {
    json = Array.isArray(json) ? json : [];

    let regex = /\.(jpg|jpeg|png|gif|webp)$/i;
    let index = json.filter(file => file.type == "file" && regex.test(file.name)).map(file => file.name);
    fs.writeFileSync("resources/gallery/index.json", JSON.stringify(index, null, 2));
})
.catch(error => {
    console.error("Error has occured.", error);
})