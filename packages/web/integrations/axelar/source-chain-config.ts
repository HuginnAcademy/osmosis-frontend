import { SourceChainConfig } from "./types";

const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true";

/** https://axelarscan.io/assets
 *  Ensure that users bridge sufficient amounts from EthMainnet=>NonEthEvm via Axelar before enabling.
 */
export const SourceChainConfigs: {
  [asset: string]: { [chain: string]: SourceChainConfig };
} = {
  usdc: {
    ethereum: {
      id: IS_TESTNET
        ? ("ethereum-2" as const)
        : ("Ethereum" as const),
      erc20ContractAddress: IS_TESTNET
        ? "0x254d06f33bDc5b8ee05b2ea472107E300226659A"
        : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // test: 'aUSDC' on metamask/etherscan
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "10500000", // From https://docs.axelar.dev/resources/mainnet#cross-chain-relayer-gas-fee
    },
    avalanche: {
      id: "Avalanche" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0x57F1c63497AEe0bE305B8852b354CEc793da43bB"
        : "0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC",
      logoUrl: "/networks/avalanche.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "1500000",
    },
    binance: {
      id: "binance" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0xc2fA98faB811B785b81c64Ac875b31CC9E40F9D2"
        : "0x4268B8F0B87b6Eae5d897996E6b845ddbD99Adf3",
      logoUrl: "/networks/binance.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "1500000",
    },
    fantom: {
      id: "Fantom" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0x75Cc4fDf1ee3E781C1A3Ee9151D5c6Ce34Cf5C61"
        : "0x1B6382DBDEa11d97f24495C9A90b7c88469134a4",
      logoUrl: "/networks/fantom.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "1500000",
    },
    moonbeam: {
      id: "Moonbeam" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0xD1633F7Fb3d716643125d6415d4177bC36b7186b"
        : "0xCa01a1D0993565291051daFF390892518ACfAD3A",
      logoUrl: "/networks/moonbeam.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "1500000",
    },
    polygon: {
      id: "Polygon" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0x2c852e740B62308c46DD29B982FBb650D063Bd07"
        : "0x750e4C4984a9e0f12978eA6742Bc1c5D248f40ed",
      logoUrl: "/networks/polygon.svg",
      transferFeeMinAmount: IS_TESTNET ? "150000" : "1500000",
    },
  },
  weth: {
    ethereum: {
      id: IS_TESTNET
        ? ("ethereum-2" as const)
        : ("Ethereum" as const),
      erc20ContractAddress: IS_TESTNET
        ? "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
        : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: IS_TESTNET ? "100000000000000" : "6300000000000000",
    },
  },
  wglmr: {
    moonbeam: {
      id: "Moonbeam" as const,
      erc20ContractAddress: IS_TESTNET
        ? "0x1436aE0dF0A8663F18c0Ec51d7e2E46591730715"
        : "0xAcc15dC74880C9944775448304B263D191c6077F",
      logoUrl: "/networks/moonbeam.svg",
      transferFeeMinAmount: IS_TESTNET ? "40000000000000000" : "2000000000000000000",
    },
  },
  wbtc: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "50000",
    },
  },
  dai: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "10000000000000000000",
    },
  },
  dot: {
    moonbeam: {
      id: ("Moonbeam" as const),
      erc20ContractAddress: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      logoUrl: "/networks/moonbeam.svg",
      transferFeeMinAmount: "1000000000",
    },
  },
  usdt: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "10000000",
    },
  },
  frax: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "10000000000000000000",
    },
  },
  link: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "2000000000000000000",
    },
  },
  aave: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "200000000000000000",
    },
  },
  ape: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "2000000000000000000",
    },
  },
  axs: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "700000000000000000",
    },
  },
  mkr: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "10000000000000000",
    },
  },
  rai: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "3000000000000000000",
    },
  },
  shib: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "1000000000000000000000000",
    },
  },
  uni: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "2000000000000000000",
    },
  },
  xcn: {
    ethereum: {
      id: ("Ethereum" as const),
      erc20ContractAddress: "0xA2cd3D43c775978A96BdBf12d733D5A1ED94fb18",
      logoUrl: "/networks/ethereum.svg",
      transferFeeMinAmount: "100000000000000000000",
    },
  },
  wbnb: {
    binance: {
      id: ("binance" as const),
      erc20ContractAddress: IS_TESTNET
        ? "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
        : "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      logoUrl: "/networks/binance.svg",
      transferFeeMinAmount: IS_TESTNET ? "500000000000000" : "5000000000000000",
    },
  },
};
