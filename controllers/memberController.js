let memberController = module.exports;

memberController.home = (req, res) => {
    console.log("GET cont.home");
    res.send("Siz home sahifasidasiz");
};

memberController.signup = (req, res) => {
    console.log("POST cont.signup");
    res.send("Siz signup sahifasidasiz");
};

memberController.login = (req, res) => {
    console.log("POST cont.login");
    res.send("Siz login sahifasidasiz");
};

memberController.logout = (req, res) => {
    console.log("GET cont.logout");
    res.send("Siz logout sahifasidasiz");
};