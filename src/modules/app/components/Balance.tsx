import { readContract } from "@wagmi/core";

import ERC20_ABI from "../../../ERC20.json";
import { createSignal, onMount } from "solid-js";
import { formatUnits, parseUnits } from "viem";

const DAI_ADDRESS = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

export default function Balance({
  holderAddress,
}: {
  holderAddress: `0x${string}`;
}) {
  const [data, setData] = createSignal<any>(null);

  onMount(async () => {
    const data = await readContract({
      address: DAI_ADDRESS,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [holderAddress],
    });

    console.log(data);

    setData(formatUnits(data as bigint, 18));
  });

  return (
    <section>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
    </section>
  );
}
