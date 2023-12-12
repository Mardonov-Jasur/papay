let communityController = module.exports;
const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");

communityController.imageInsertion = async (req, res) => {
  try {
    console.log("POST: cont/imageInsertion");
    assert(req.files, Definer.generel_err3);
    const image_url = req.file.path;

    res.json({ state: "success", data: image_url });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.createArticle = async (req, res) => {
  try {
    console.log("POST: cont/createArticle");

    const community = new Community();
    const result = await community.createArticleData(req.member, req.body);
    assert.ok(result, Definer.auth_err1);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/createArticle, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
