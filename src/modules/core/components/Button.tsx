import type { JSX } from "solid-js/jsx-runtime";

export default function Button({
  children,
  handleClick,
}: {
  children: JSX.Element;
  handleClick: () => void;
}) {
  return (
    <button
      class="px-4 py-2 rounded shadow bg-orange-600 text-neutral-200 hover:text-white font-medium transform translate-y-[0.05rem] hover:translate-y-0 transition-all ease-in-out active:translate-y-[0.1rem]"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
