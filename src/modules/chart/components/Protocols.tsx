import { createSignal } from "solid-js";
import type { Protocol } from "../hooks/useProtocols";
import clsx from "clsx";
import { PAGE_WRAP } from "../../../constants";

export function Protocols({ data }: { data: Protocol[] }) {
  const [filterText, setFilterText] = createSignal("");

  return (
    <section>
      <div class={clsx(PAGE_WRAP, "flex flex-col gap-6")}>
        <div class="">
          <input
            type="text"
            name="filter-text"
            id="filter-text"
            value={filterText()}
            onChange={(event) => setFilterText(event.target.value)}
            class="px-4 py-2 bg-neutral-800 rounded-lg text-neutral-300"
          />
        </div>
        <div class="flex flex-col gap-4">
          {data.map((protocol) => {
            console.log(protocol);
            return (
              <article class=" border-2 border-neutral-800 rounded-lg p-4 flex gap-4 items-center">
                <div class="w-12 h-12 rounded-full overflow-clip">
                  <img loading="lazy" src={protocol.logo} alt="" />
                </div>
                <h3 class="font-medium text-lg text-neutral-400">
                  {protocol.name}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
