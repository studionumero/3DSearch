import { FC, useState } from "react";
// three
import { Html as HTML } from "@react-three/drei";
// interfaces
import { SearchInterface } from "./interfaces/Search";
import { Search, Clear } from '@mui/icons-material';
import { useCaret } from "./hooks/useCaret";
import { useCaretPosition } from 'react-use-caret-position';
// hooks
import { useKeyEvent } from "./hooks/useKeyEvent";

const App: FC<SearchInterface> = ({ objects, setObjects }) => {
  const { ref, start, end, updateCaret } = useCaretPosition();
  const [search, setSearch] = useState("");

  const reset = () => {
    setObjects([]);
    setSearch("");
  };

  // useCaret(start, end, updateCaret);

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col 
        w-[300px] sm:w-[400px] md:w-[526px] h-full 
        p-2 mx-auto mt-[-60px]
        justify-center align-center"
      >
        <Logo />
        <form
          className="flex flex-row 
            rounded-sm bg-white items-center
            w-full h-12 px-3.5 py-1"
          method="get"
          action="https://www.google.com/search"
        >
          <Search sx={{ fontSize: "24px", color: "#84AFBA" }} />
          <input
            className="form-control block
              w-full outline-none
              px-3 py-1.5 m-0
              text-base font-normal text-gray-700"
            name="q"
            id="search"
            title="Search"
            aria-label="Search"
            placeholder=""
            ref={ref}
            maxLength={200}
            onKeyDown={e => useKeyEvent({ e, objects, setObjects })}
            autoComplete="off"
            spellCheck="false"
            minLength={1}
            required
          />
          <Button
            reset={reset}
            objects={objects}
            search={search}
          />
        </form>
      </main>
    </HTML>
  );
}

const Logo = () => (
  <div
    className="flex flex-row 
      items-center self-center 
      mr-[20px] sm:mr-[20px] md:mr-[45px] 
      text-[36px] sm:text-[48px] md:text-[64px] 
      sm:leading-[58px] md:leading-[83px] 
      font-mono text-center uppercase font-semibold tracking-normal 
      mb-4 select-none"
  >
    <img
      src={process.env.PUBLIC_URL + "/favicon.svg"}
      className="h-[36px] sm:h-[48px] md:h-[64px] 
        sm:mr-[10px] mr-[10px] mb-[-4px] 
        sm:mb-[-8px] md:mr-[30px] md:mb-[-16px]"
      alt="3D Logo"
    />
    <span className="text-[#F25479]">3D</span>
    <span className="text-white">Search</span>
  </div>
);

const Button: FC<SearchInterface> = ({ search, objects, reset }) => {
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
          <Clear sx={{ fontSize: "24px", color: "#84AFBA" }} />
        </button>
      );
    default:
      return null;
  }
}

export { App }