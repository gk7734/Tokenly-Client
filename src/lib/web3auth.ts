'use client';

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";

export const web3auth = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "", // Get from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  uiConfig: {
    appName: "Tokenly",
    mode: "dark",
    logoLight: "https://web3auth.io/images/web3auth-logo.svg",
    logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
    defaultLanguage: "ko",
    theme: {
      primary: "#768729"
    }
  }
});
