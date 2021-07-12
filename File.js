const fs = require('fs');
const readline = require('readline');

const save = (n, o) => fs.writeFileSync("./"+n, JSON.stringify(o));
const read = (n) => JSON.parse(fs.readFileSync("./"+n));

function File(n) {
    this.url = n;
    this.save = (o) => ![null, undefined, false, 0, ""].includes(o) && save(this.url, o);
    this.read = () => read(this.url);
    this.add = (k, o) => {
        let temp = this.read();
        temp[k].push(o);
        temp[k].sort((a,b) => new Date(a.bbd) - new Date(b.bbd)); // Implementera sort-algo.
        this.save(temp);
    }
    this.remove = (k, id) => {
        let temp = this.read();
        temp[k] = temp[k].filter(item => item.id !== id);
        this.save(temp);
    }
    return this;
}

module.exports = File;
