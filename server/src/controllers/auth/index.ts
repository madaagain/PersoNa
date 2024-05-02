import {NextFunction, Request, Response} from "express";
import { ErrorResponse } from "../../utils/errorResponse";
import { IUserDocument, UserModel } from "../../models/User";
import { ValidatorError } from "../../models/plugins/validatorError";
import getParameters from "../../utils/getParameters";
import { asyncHandler } from "../../utils/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = getParameters(req, ["email", "password"]);

    const user = await UserModel.findOne({email}).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        throw new ErrorResponse([{error:"credentials", message:"Wrong email or password"}], 401)
    }

    const token = await user.getToken();

    res.status(200).json({token : token});
});

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {firstname, lastname, email, password, job} = getParameters(req, ["firstname", "lastname", "email", "password", "job"]);

    if (!firstname || !lastname || !email || !password || !job) {
        throw new ErrorResponse([{error:"parameters", message: "Some required parameters are missing"}], 400)
    }

    new UserModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        job: job
    }).save()
    .then(async (user: IUserDocument) => {
        const token = await user.getToken();
        res.status(201).json({
            token: token,
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                job: user.job,
            }
        });
    })
    .catch((validatorError: ValidatorError) => {
        const error = new ErrorResponse(validatorError.data, 400);
        return next(error);
    });
});
