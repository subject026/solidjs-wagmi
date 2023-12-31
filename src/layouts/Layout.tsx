import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";
import { PAGE_WRAP } from "../constants";
import { Account } from "../modules/app/components/Account";
import { WagmiProvider } from "../hooks/providers/WagmiProvider";
import { AppInterface } from "../modules/app/components/AppInterface";

export default function Layout({ children }: { children: JSX.Element }) {
  console.log("layout");
  return (
    // <WagmiProvider>
    <div class=" flex flex-col min-h-screen bg-neutral-900 text-neutral-400">
      <header class="">
        <div
          class={clsx(PAGE_WRAP, "py-4 md:py-6 flex flex-row justify-between")}
        >
          <span>
            Solid + <pre class="inline">wagmi</pre>
          </span>
          <nav class="flex gap-4">
            <a class="font-medium hover:underline" href="/">
              app
            </a>
            <a class="font-medium hover:underline" href="/chart">
              chart
            </a>
          </nav>
          <Account />
        </div>
      </header>

      <main class="grow">{children}</main>
      <footer>
        <div class={clsx(PAGE_WRAP, "py-4 md:py-6 ")}>
          <span class="text-neutral-500 font-medium">footer</span>
        </div>
      </footer>
    </div>
    // </WagmiProvider>
  );
}
