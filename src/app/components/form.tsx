import { useKeyEvent } from "../hooks/useKeyEvent";
import { useStore } from "../hooks/useStore";
import { X, Search } from "lucide-react";

export const Form = ({ pointer, camera }) => {
  const { characters, updateCharacters, query, resetSearch } = useStore();

  return (
    <form
      className="flex flex-col gap-y-6"
      method="get"
      action="https://www.google.com/search"
    >
      <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
        <Search />
        <input
          type="search"
          className="form-control
            block
            w-full
            px-3 py-1.5 m-0
            text-base font-normal text-gray-700
            outline-none"
          name="q"
          id="search"
          title="Search"
          role="search"
          placeholder=""
          // onChange={handleChange}
          aria-label="Search"
          maxLength={200}
          onKeyDown={e => useKeyEvent({ e, characters, updateCharacters, pointer, camera })}
          autoComplete="off"
          spellCheck="false"
          minLength={1}
          required
        />
        <Button
          reset={resetSearch}
          characters={characters}
          query={query}
        />
      </div>
    </form>
  )
}

const Button = ({ query, characters, reset }) => {
  switch (true) {
    case query.length !== 0:
    case characters.length !== 0:
      return (
        <button
          onClick={reset}
          type="reset"
          aria-label="clear"
          style={{ height: "24px" }}
        >
          <X />
        </button>
      );
    default:
      return null;
  }
}