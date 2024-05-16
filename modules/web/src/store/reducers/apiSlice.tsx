
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import { PayloadListData, PayloadValueData } from "../../constants";
import { url } from "inspector";
import { getHeaders } from "../request";
import { HEADER_X_LAF_TOKEN, URL_AUTH_GET_FINDPW, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from "../constants/api_constants";
import AlertUtils from "@/utils/AlertUtils";
import { FN_GetDispatch, FN_GetState } from "../nocycle";
import UsersSlice, { DisplayUserInfo } from "./userSlice";
import AuthUtils from "@/utils/AuthUtils";

export let withPrefixOpenAPI = (url: string): string => {
  return "/open" + url;
};


const URL_PREFIX_LOCAL = '/v3'
export type SignInCredentials = {
  signed: boolean;
  signature: string | null;
};
export type AsyncCreateResponse<T> = {
  message?: string; // normal message
  error?: string; // error
  data?: T;
};


export type TLNRequest = {
  text: string;
  sourceLang: string;
  targetLang: string;
};
export type TLNResponse = {
  result: string
}
export type I18nItem = {
  langInHttpLocaleCode?: string[];
  label: string[];
  labelByLang: string;
  value: string;
  labelInEnglish: string;
  LangInExplicitURL?: string;
};

export let verifyResponse = (response: AsyncCreateResponse<any> | undefined): boolean => {
  if (!response || response.error) {
    if (response) {
      AlertUtils.alertErr(response.error)
    }
    return false;
  } else {
    return true;
  }
}


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_LOCAL,
    prepareHeaders(headers, api) {
      let headers_New = getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      headers.set(HEADER_X_LAF_TOKEN, AuthUtils.token || '')
      return headers;
    },
    validateStatus: (response, result: AsyncCreateResponse<any> | null) => {
      let errorHandler = () => {
        AlertUtils.alertErr("抱歉，网络不稳定，请稍后重试")
      }
      if (result) {
        let error = result.error;
        if (error == '401') {
          FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
              hasSignIn: false,
            })
          )
          return false;
        }
      }
      let shouldOk = response && response.status === 200
      if (!shouldOk) {
        errorHandler()
      }
      return shouldOk;
    },
  }),
  endpoints: (build) => ({
    sayHelloWorld: build.query<string, void>({
      query: () => {
        return {
          url: "/hello-world",
          method: "GET",
        };
      },
    }),
    // auth
    signIn: build.query<AsyncCreateResponse<SignInCredentials>, {
      userName: string,
      password: string,
      rememberMe: boolean,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNIN,
          body: obj,
        };
      },
    }),
    signUp: build.query<AsyncCreateResponse<SignInCredentials>, {
      preview: boolean,
      userName: string,
      password: string,
      email: string,
      confirmPassword: string,
      rememberMe: boolean,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNUP,
          body: obj
        };
      },
    }),
    signOut: build.query<AsyncCreateResponse<any>, { username: string; password: string }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNOUT,
          body: obj
        };
      },
    }),
    sendFeedback: build.query<AsyncCreateResponse<any>, {
      email: string,
      subject: string,
      content: string,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/help/sendFeedback",
          body: obj
        };
      },
    }),
    // 
    getUserInfo: build.query<AsyncCreateResponse<DisplayUserInfo>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/auth/getUserInfo",
        };
      },
    }),
    findPw: build.query<AsyncCreateResponse<any>, { username: string; password: string }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_FINDPW,
          data: obj,
        };
      },
    }),
    tlnHandleText: build.query<AsyncCreateResponse<TLNResponse>, TLNRequest>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/tln/handleText",
          data: obj,
        };
      },
    }),
    tlnHandleJSON: build.query<AsyncCreateResponse<TLNResponse>, TLNRequest>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/tln/handleJSON",
          data: obj,
        };
      },
    }),
    tlnGetI18nItems: build.query<AsyncCreateResponse<I18nItem[]>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: (
            "/tln/getI18nItems"
          ),
          data: obj,
        };
      },
    }),



  }),
});



export default apiSlice;
