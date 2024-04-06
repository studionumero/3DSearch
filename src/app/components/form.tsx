import { useRef } from "react";
import { X, Search } from "lucide-react";
import { useForm } from "react-hook-form"
// Hooks
import { useKeyEvent } from "../hooks/useKeyEvent";
import { useStore } from "../hooks/useStore";

interface IFormInput {
  q: string
}

export const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = () => formRef.current?.submit();
  const { characters, updateCharacters, query, updateQuery, selection, updateSelection, resetSearch } = useStore();

  // const handleOnSelect = (event: React.SyntheticEvent<HTMLDivElement, Event>) => {
  //   const target = event.target as HTMLInputElement;
  //   updateSelection({start: target.selectionStart, end: target.selectionEnd});
  // }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-y-6"
      method="get"
      action="https://www.google.com/search"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
        <Search />
        <input
          type="search"
          role="search"
          title="Search"
          autoComplete="off"
          spellCheck="false"
          className="form-control
            block
            w-full
            px-3 py-1.5 m-0
            text-base font-normal text-gray-700
            outline-none"
          // onSelect={(event) => handleOnSelect(event)}
          value={query}
          onKeyDown={e => useKeyEvent({ e, characters, updateCharacters, query, updateQuery, selection })}
          {...register("q", { required: true, minLength: 1, maxLength: 200 })}
        />
        <ClearButton
          characters={characters}
          query={query}
          resetSearch={resetSearch}
        />
      </div>
    </form>
  )
}

const ClearButton = ({ characters, query, resetSearch }) => {
  switch (true) {
    case query.length !== 0:
    case characters.length !== 0:
      return (
        <button
          onClick={() => resetSearch()}
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