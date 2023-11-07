const assert = require("assert");
const MemeberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");

class Restaurant {
    constructor() {
        this.memberModel = MemeberModel;
    }

    async getAllRestaurantsData() {
        try {
            const result = await this.memberModel
              .find({
                 mb_type: "RESTAURANT",
              })
              .exec();

            assert(result, Definer.generel_err1);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Restaurant;