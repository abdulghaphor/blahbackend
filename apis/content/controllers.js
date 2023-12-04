const Content = require("./models");

exports.createContent = async (req, res, next) => {
  const { body: data } = req;
  try {
    const newContent = await Content.create({
      ...data,
    });
    return res.status(201).json(newContent);
  } catch (error) {
    return next(error);
  }
};

exports.fetchAllContent = async (req, res, next) => {
  const contentList = await Content.find();
  return res.json(contentList);
};

exports.handleFoundContent = async (req, res, next) => {
  const { file, method, foundContent, body: data } = req;
  switch (method) {
    // retrieve foundUser
    case "GET":
      try {
        return res.status(200).json(foundContent);
      } catch (error) {
        return next(error);
      }
    // edit foundUser
    case "PUT":
      try {
        // only superuser can assign roles
        const updatedFoundContent = await Content.findByIdAndUpdate(
          foundContent._id,
          data,
          {
            new: true,
          }
        );
        return res.status(200).json(updatedFoundContent);
      } catch (error) {
        return next(error);
      }
    case "DELETE":
      await foundContent.deleteOne();
      return res.status(204).end();
    default:
      const error = new Error("method not allowed");
      error.status = 400;
      return next(error);
  }
};
