import joi from "joi";

export default (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    nationality: joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error)
    return res.status(400).send({ ok: false, msg: "Invalid parameters sent" });

  next();
};
