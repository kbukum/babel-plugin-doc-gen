class Visitor {
    Program = (path, file) => {
        console.log(path);
        console.log(file);
    }
}
export default new Visitor();