import { useKeyEvent } from "../hooks/useKeyEvent";
import { useStore } from "../hooks/useStore";

export const Form = ({ pointer, camera }) => {
  const { characters, updateCharacters, query, resetSearch } = useStore();

  return (
    <form
      className="flex flex-col gap-y-6"
      method="get"
      action="https://www.google.com/search"
    >
      <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
        <InputIcon icon="search" fontSize="22px" />
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
          objects={characters}
          search={query}
        />
      </div>
    </form>
  )
}


const InputIcon = (props: { fontSize: string; icon: string }) => (
  <span
    className="material-symbols-sharp"
    style={{ color: "#84AFBA", fontSize: props.fontSize }}
  >
    {props.icon}
  </span>
);

const Button = ({ search, objects, reset }) => {
  switch (true) {
    case search.length !== 0:
    case objects.length !== 0:
      return (
        <button
          onClick={reset}
          type="reset"
          aria-label="clear"
          style={{ height: "24px" }}
        >
          <InputIcon icon="close" fontSize="24px" />
        </button>
      );
    default:
      return null;
  }
}