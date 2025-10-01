import createHttpError from "http-errors";

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true, 
      });

      req.body = value; 
      next();
    } catch (error) {
      const errors = error.details.map((detail) => detail.message);
      next(new createHttpError.BadRequest(errors));
    }
  };
}




// import createHttpError from "http-errors";
// export function validateBody(schema) {

//     return async (req, res, next) => {

//         try {
//             await schema.validateAsync(req.body, {
//                 abortEarly: false,
//             });

//             next();

//         } catch (error) {
//             const errors = error.details.map(detail => detail.message);

//             next(new createHttpError.BadRequest(errors));

//         }

//     };
// }