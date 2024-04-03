"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerConfig = void 0;
require('dotenv').config();
exports.mailerConfig = {
    transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.mailerUser,
            pass: process.env.mailerPass
        },
        tls: {
            rejectUnauthorized: false
        }
    },
};
//# sourceMappingURL=mailer.config.js.map