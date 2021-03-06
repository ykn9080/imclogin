var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = {};

const companySchema = new Schema({
  id: String,
  name: String,
  language: String,
  module: String,
});
var userSchema = mongoose.Schema({
  id: String,
  password: String,
  email: String,
  name: String,
  group: [{ type: Schema.Types.ObjectId, ref: "AccessGroup" }],
  comp: { type: Schema.Types.ObjectId, ref: "Company" },
});
const accessGroupSchema = new Schema({
  comp: { type: Schema.Types.ObjectId, ref: "Company" },
  name: String,
  desc: String,
  parent: { type: Schema.Types.ObjectId, ref: "AccessGroup" },
});

const controlSchema = new Schema({
  type: String,
  title: String,
  desc: String,
  created: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  comp: { type: Schema.Types.ObjectId, ref: "Company" },
  origincontrol: { type: Schema.Types.ObjectId, ref: "Control" },
  access: [{ type: Schema.Types.ObjectId, ref: "AccessGroup" }],
});

const systemSchema = new Schema({
  title: String,
  desc: String,
  type: String,
  data: Schema.Types.Mixed,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

models.Control = mongoose.model("Control", controlSchema);
models.Company = mongoose.model("Company", companySchema);
models.User = mongoose.model("User", userSchema);
models.AccessGroup = mongoose.model("AccessGroup", accessGroupSchema);
models.System = mongoose.model("System", systemSchema);

module.exports = models;
