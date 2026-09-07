const fs = require("fs");

try {
    let files = fs.readdirSync("resources/gallery/");
    let regex = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    let index = files.filter(file => regex.test(file));
    fs.writeFileSync("resources/gallery/index.json", JSON.stringify(index, null, 2));
} catch(error) {
    console.error("Error has occured.", error);
    process.exit(1);
}