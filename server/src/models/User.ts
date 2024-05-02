import { Request } from "express";
import { Schema, Document, model } from 'mongoose';
import { validatorErrorHandler } from './plugins/validatorError';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const owasp = require("owasp-password-strength-test");
import { ErrorResponse } from "../utils/errorResponse";

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    job: string;
}

interface IUserDocument extends IUser, Document {
    matchPassword(password: string): Promise<boolean>;
    getToken(): Promise<boolean>;
}


const UserSchema: Schema = new Schema<IUser>({
    firstname: {
        type: String,
        required: [true, "Firstname required"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname required"],
    },
    job: {
        type: String,
        required: [true, "Job required"],
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        uniqueCaseInsensitive: true,
        lowercase: true,
        match: [emailPattern, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        select: false,
        validate: {
            validator: function(password: string) {
                const passwordStrengthError = owasp.test(password).errors;
                if (passwordStrengthError.length !== 0) {
                    throw new Error(JSON.stringify(passwordStrengthError));
                }
                return true
            }
        }
    }
})

UserSchema.plugin(validatorErrorHandler, 'Account with this {key} already exist');

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    this.updatedAt = new Date();
    next()
})

UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.getToken = async function (): Promise<boolean> {
    return jwt.sign({userId: this._id.toString()}, process.env.SECRET);
}

async function checkToken(req: Request): Promise<IUser> {
    const token = req.headers["authorization"];
    if (!token)
        throw new ErrorResponse([{error:"credentials", message:"No token found, authorization denied"}], 401)
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findOne({"_id" : decoded.userId}).select('+job');
    if (!user)
        throw new ErrorResponse([{error:"credentials", message:"Token is not valid"}], 401)
    return user;
}
const UserModel = model<IUserDocument>('User', UserSchema);

export { IUser, IUserDocument, UserModel, checkToken };