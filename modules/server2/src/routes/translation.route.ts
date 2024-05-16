import { Request, Response, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { URL_AUTH_GET_CAPTCHA, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from '@/web2share-copy/server_urls';
import { DotFn, DotType } from '@/i18n/TranslationUtils';
import { InfoFn, RequestInfo } from '@/system/info';
import { AsyncCreateResponse, HEADER_X_LAF_LANG, SignInCredentials, SysResponse, TypeCaptchaResponse } from './_types';
import { CaptchaService } from '@/services/captcha.service';
import handleSignUp, { handleSignIn } from './auth/userAction';
import { asyncHandler } from './AsyncHandler';
import { S2Feedback, S2User } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';
import { TLNResponse } from './translation/translateTools';
import i18nItems from '@/i18n/i18n';

export class TranslationRoute implements Routes {
  public router = Router();
  public auth = new AuthController();
  public captcha = new CaptchaService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/tln/handleText',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: {
            result: 'hello, world',
          } satisfies TLNResponse,
        });
      }),
    );
    this.router.post(
      '/tln/handleJSON',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: {
            result: 'hello, world',
          } satisfies TLNResponse,
        });
      }),
    );
    this.router.get(
      '/tln/getI18nItems',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: i18nItems,
        });
      }),
    );
  }
}
