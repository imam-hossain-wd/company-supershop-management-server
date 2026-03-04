// import { NextFunction, Request, Response } from 'express';
// import { ZodObject } from 'zod';
// // import { AnyZodObject, ZodEffects } from 'zod';

// const validateRequest =
//   (schema: ZodObject | ZodEffects<ZodObject>) =>
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//         cookies: req.cookies,
//       });
//       return next();
//     } catch (error) {
//       next(error);
//     }
//   };

// export default validateRequest;

import { NextFunction, Request, Response } from 'express';
import { ZodObject, z } from 'zod';

const validateRequest =
  // z.ZodSchema is the standard "catch-all" for any Zod validator
  (schema: z.ZodSchema) => 
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
