import RandExp from 'randexp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import NotFoundError from '../outcomes/notFoundError.js';
import CustomError from '../outcomes/customError.js';
import ResponseHandler from '../outcomes/responseHandler.js';
import userService from '../service/userService.js';
import senMail from '../lib/sendmail.js';
import getObjectShortened from '../utils/getObjectShortened.js';

const authController = {
    register: async (req, res, next) => {
        const { username, email, password, phoneNumber } = req.body;
        if (
            (await userService.findByEmail(email)) ||
            (await userService.findByUsername(username))
        ) {
            next(
                new CustomError(
                    { user: 'User already existing.' },
                    400
                )
            );
        } else {
            const hashPassword = await bcrypt.hash(
                password,
                // eslint-disable-next-line no-undef
                parseInt(process.env.SECRET_KEY)
            );
            const newUser = await userService.create(
                username,
                email,
                phoneNumber,
                hashPassword
            );
            ResponseHandler(res, {
                ...newUser._doc,
                password: 'Not show',
            });
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        const existingUser = await userService.findByEmail(email);
        if (!existingUser) {
            next(new NotFoundError({ user: 'Email not exist' }));
        }
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isMatch) {
            next(new CustomError('Wrong password', 400));
        }

        if (existingUser.status !== 'active') {
            next(
                new CustomError({ user: 'User is not active' }, 403)
            );
        } else {
            // Gen Access Token (JWT)
            const token = jwt.sign(
                {
                    ...existingUser._doc,
                },
                // eslint-disable-next-line no-undef
                process.env.SECRET_JWT_KEY,
                {
                    expiresIn: '3h',
                }
            );
            ResponseHandler(res, {
                ...existingUser.toObject(),
                password: 'Not show',
                token: token,
            });
        }
    },

    forgotPassword: async (req, res, next) => {
        const { email } = req.body;
        let existingUser = await userService.findByEmail(email);
        if (!existingUser) {
            next(new NotFoundError({ user: 'Email not exist' }));
        }
        // gen pass
        const regex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8}$/;

        // gen pass with regex
        let password = '';
        while (!regex.test(password)) {
            password = new RandExp(regex).gen();
        }
        existingUser = getObjectShortened(existingUser);
        // send mail
        senMail(
            email,
            `New password: <b>${password}</b>`,
            'Forgot password',
            async (err) => {
                if (err) {
                    next(new CustomError(err.message, 500));
                } else {
                    const hashPassword = await bcrypt.hash(
                        password,
                        // eslint-disable-next-line no-undef
                        parseInt(process.env.SECRET_KEY)
                    );
                    // save password
                    userService.update(existingUser._id, {
                        ...existingUser,
                        password: hashPassword,
                    });
                    ResponseHandler(res, 'Send mail success');
                }
            }
        );
    },

    logout: async (req, res) => {
        res.clearCookie('accessToken');
        ResponseHandler(res, 'Logout successful');
    },

    genOTP: async (req, res, next) => {
        const { email } = req.body;
        const existingUser = await userService.findByEmail(email);
        //   check email
        if (!existingUser) {
            next(new NotFoundError({ user: 'Email not exist' }));
        }
        // Check email is de-active
        if (existingUser.status !== 'de-active') {
            next(new CustomError('user is not  de-active', 403));
        } else {
            // Regex OTP
            const regex = /\d{6}$/;

            // Gen otp with regex
            const opt = new RandExp(regex).gen();
            // Send mail
            await senMail(
                email,
                `OTP: <b>${opt}</b>`,
                'Verify email',
                async (err) => {
                    if (err) {
                        next(new CustomError(err, 500));
                    } else {
                        // save password
                        await userService.updateOTP(
                            existingUser._id,
                            opt
                        );
                        ResponseHandler(res, 'Send OTP successful!');
                    }
                }
            );
        }
    },
    verifyOTP: async (req, res, next) => {
        const { email, otp } = req.body;

        const user = await userService.findByEmail(email);
        //   check email
        if (!user) {
            next(new NotFoundError({ user: 'Email not exist' }));
        }
        // Check email co is de-active
        if (user.status !== 'de-active') {
            next(new CustomError('user is not  de-active', 403));
        } else {
            //  check map otp
            if (otp !== user.confirmationCode) {
                next(new NotFoundError({ otp: 'OTP not match' }));
            }
            // check time 5min
            const checkTime =
                (new Date() - new Date(user.confirmationCodExpired)) /
                60000;
            if (checkTime > 5) {
                next(
                    new CustomError('Time to check otp is over', 500)
                );
            } else {
                await userService.verifyCusses(user._id);
                ResponseHandler(res, 'Verify OTP successful!');
            }
            //
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { email, password, newPassword } = req.body;
            let user = await userService.findByEmail(email);

            const check = await bcrypt.compare(
                password,
                user.password
            );

            if (check) {
                const hashNewPassword = await bcrypt.hash(
                    newPassword,
                    // eslint-disable-next-line no-undef
                    parseInt(process.env.SECRET_KEY)
                );
                user = getObjectShortened(user);
                user = await userService.update(user._id, {
                    ...user,
                    password: hashNewPassword,
                });
                ResponseHandler(res, user);
            } else {
                next(new CustomError('Wrong password', 400));
            }
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};
export default authController;
