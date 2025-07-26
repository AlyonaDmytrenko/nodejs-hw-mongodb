

export function validateBody(schema) {

    return async(req, res, next) => {

        try {
            const result = await schema.validateAsync(req.body);

            console.log(result);

            next();
            
        } catch (error) {
            console.error(error);

            next(error);

        }

    };
}