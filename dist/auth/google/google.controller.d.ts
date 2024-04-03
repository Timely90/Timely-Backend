import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly GoogleService;
    constructor(GoogleService: GoogleService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<void>;
}
