const Company = require("../models/companyModel");

exports.createCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({error: "Filup all filde!"});
    const exist = await Company.findOne({ name });  
    if (exist) return res.status(400).json({ error: "Company Alredy Exist!" });
    const newCompany = new Company({ name });
    newCompany.save(async (err, com) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      const allComapny = await Company.find({});
      allComapny.reverse()
      return res.status(201).json({
        message: "New Company Add Successfully!",
        company: allComapny,
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Something wrong, Try Later!" });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.find({});
    company.reverse()
    
    res.status(200).json({ message: "Compnay List ", company });
  } catch (e) {
    res.status(400).json({ error: "Something wrong, Try Later!" });
  }
};
