const MemeberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const bcrypt = require("bcryptjs");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Member {
  constructor() {
    this.memberModel = MemeberModel;
  }

  async signupDate(input) {
    try {
      const sait = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, sait);
      const new_member = new this.memberModel(input);

      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginDate(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();

      assert.ok(member, Definer.auth_err3);
      console.log(member);

      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );
      assert.ok(isMatch, Definer.auth_err4);

      return await this.memberModel.findOne({
        mb_nick: input.mb_nick
      });
      // .exec();
    } catch (err) {
      throw err;
    }
  }

  async getChosenMemberData(member, id) {
    try {
      id = shapeIntoMongooseObjectId(id);

      console.log("member;;;;", member);

      if(member) {
        //condition if not seen before
      }

      const result = await this.memberModel
        .aggregate([
          { $match: { _id: id, mb_status: "ACTIVE" } },
          { $unset: "mb_password" }
        ])
        .exec();

      assert.ok(result, Definer.generel_err2);
      return result[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
