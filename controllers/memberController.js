let memberController = module.exports;

memberController.home = (req, res) => {
    res.send("Siz home sahifasidasiz");
};

memberController.signup = (req, res) => {
    res.send("Siz signup sahifasidasiz");
};

memberController.login = (req, res) => {
    res.send("Siz login sahifasidasiz");
};

memberController.logout = (req, res) => {
    res.send("Siz logout sahifasidasiz");
};