import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import { ProgressiveSvgImage } from "../components/progressive-svg-image";
import { TradeClipboard } from "../components/trade-clipboard";
import { useStore } from "../stores";
import { EventName, IS_FRONTIER } from "../config";
import { Dec } from "@keplr-wallet/unit";
import { useMemo, useRef } from "react";
import { useAmplitudeAnalytics } from "../hooks";

const Home: NextPage = observer(function () {
  const { chainStore, queriesStore } = useStore();
  const { chainId } = chainStore.osmosis;

  const queries = queriesStore.get(chainId);
  const queryPools = queries.osmosis!.queryGammPools;

  // If pool has already passed once, it will be passed immediately without recalculation.
  const poolsPassed = useRef<Map<string, boolean>>(new Map());
  const allPools = queryPools.getAllPools();
  // Pools should be memoized before passing to trade in config
  const pools = useMemo(
    () =>
      allPools
        .filter((pool) => {
          // TODO: If not on production environment, this logic should pass all pools (or other selection standard).

          // Trim not useful pools.

          const passed = poolsPassed.current.get(pool.id);
          if (passed) {
            return true;
          }

          // There is currently no good way to pick a pool that is worthwhile.
          // For now, based on the mainnet, only those pools with assets above a certain value are calculated for swap.

          let hasEnoughAssets = false;

          for (const asset of pool.poolAssets) {
            // Probably, the pools that include gamm token may be created mistakenly by users.
            if (
              asset.amount.currency.coinMinimalDenom.startsWith("gamm/pool/")
            ) {
              return false;
            }

            // Only pools with at least 1000 osmo are dealt with.
            if (asset.amount.currency.coinMinimalDenom === "uosmo") {
              if (asset.amount.toDec().gt(new Dec(1000))) {
                hasEnoughAssets = true;
                break;
              }
            }

            // Only pools with at least 10 ion are dealt with.
            if (asset.amount.currency.coinMinimalDenom === "uion") {
              if (asset.amount.toDec().gt(new Dec(10))) {
                hasEnoughAssets = true;
                break;
              }
            }

            // Only pools with at least 1000 atom are dealt with.
            if (
              "originChainId" in asset.amount.currency &&
              asset.amount.currency.coinMinimalDenom ===
                "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"
            ) {
              if (asset.amount.toDec().gt(new Dec(1000))) {
                hasEnoughAssets = true;
                break;
              }
            }

            // only pools with at least 10,000 USDC
            if (
              "originChainId" in asset.amount.currency &&
              asset.amount.currency.coinMinimalDenom ===
                "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858"
            ) {
              if (asset.amount.toDec().gt(new Dec(10_000))) {
                hasEnoughAssets = true;
                break;
              }
            }

            // only pools with at least 10,000 DAI
            if (
              "originChainId" in asset.amount.currency &&
              asset.amount.currency.coinMinimalDenom ===
                "ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7"
            ) {
              if (asset.amount.toDec().gt(new Dec(10_000))) {
                hasEnoughAssets = true;
                break;
              }
            }

            // only pools with at least 1,000,000 STARS
            if (
              "originChainId" in asset.amount.currency &&
              asset.amount.currency.coinMinimalDenom ===
                "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4"
            ) {
              if (asset.amount.toDec().gt(new Dec(1_000_000))) {
                hasEnoughAssets = true;
                break;
              }
            }
            
            // only pools with at least 10,000 JUNO
            if (
              "originChainId" in asset.amount.currency &&
              asset.amount.currency.coinMinimalDenom ===
                "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED"
            ) {
              if (asset.amount.toDec().gt(new Dec(10_000))) {
                hasEnoughAssets = true;
                break;
              }
            }
          }

          if (hasEnoughAssets) {
            poolsPassed.current.set(pool.id, true);
          }

          return hasEnoughAssets;
        })
        .map((pool) => pool.pool),
    [allPools]
  );

  useAmplitudeAnalytics({
    onLoadEvent: [EventName.Swap.pageViewed],
  });

  return (
    <main className="relative bg-background h-screen">
      <div className="absolute w-full h-full bg-home-bg-pattern bg-repeat-x bg-cover">
        <svg
          className="absolute w-full h-full lg:hidden"
          pointerEvents="none"
          viewBox="0 0 1300 900"
          height="900"
          preserveAspectRatio={"xMidYMid slice"}
        >
          <g>
            {!IS_FRONTIER && (
              <ProgressiveSvgImage
                lowResXlinkHref="/images/osmosis-home-bg-low.png"
                xlinkHref="/images/osmosis-home-bg.png"
                x="56"
                y="97"
                width="578.7462"
                height="725.6817"
              />
            )}
            {!IS_FRONTIER && (
              <rect
                x="-3000"
                y="778"
                width="8660"
                height="244"
                fill="#120644"
              />
            )}
            <ProgressiveSvgImage
              lowResXlinkHref={
                IS_FRONTIER
                  ? "/images/osmosis-cowboy-woz-low.png"
                  : "/images/osmosis-home-fg-low.png"
              }
              xlinkHref={
                IS_FRONTIER
                  ? "/images/osmosis-cowboy-woz.png"
                  : "/images/osmosis-home-fg.png"
              }
              x={IS_FRONTIER ? "-100" : "61"}
              y={IS_FRONTIER ? "100" : "602"}
              width={IS_FRONTIER ? "800" : "448.8865"}
              height={IS_FRONTIER ? "800" : "285.1699"}
            />
          </g>
        </svg>
      </div>
      <div className="w-full h-full flex items-center overflow-x-hidden overflow-y-auto">
        <TradeClipboard
          containerClassName="w-[27rem] md:mt-mobile-header ml-auto mr-[15%] lg:mx-auto"
          pools={pools}
        />
      </div>
    </main>
  );
});

export default Home;
