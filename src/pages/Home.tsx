import { ReactFragment, FC } from "react";
import { Html as HTML } from "@react-three/drei";
// interfaces
import { SearchInterface } from "../interfaces/Search";

const Home: FC<SearchInterface> = ({ search, useKey, objects, reset }) => {

  // Create an array pairing each input to a nanoid key that matches each object
  // Goal is to be able to remove objects on backspace event
  // const handleChange = (event: { target: { value: string } }) => {
  //   setSearch([...search, [event.target.value.slice(-1), "key"]]);
  //   console.log(search);
  // };

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col 
        w-[300px] sm:w-[400px] md:w-[526px] h-full 
        p-2 mx-auto mt-[-60px]
        justify-center align-center"
      >
        <Logo />
        <form
          className="flex flex-col gap-y-6"
          method="get"
          action="https://www.google.com/search"
        >
          <SearchBar>
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
              onKeyDown={e => useKey(e)}
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
          </SearchBar>
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
)

const SearchBar = (props: { children: ReactFragment }) => (
  <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
    {props.children}
  </div>
);

const InputIcon = (props: { fontSize: string; icon: string }) => (
  <span
    className="material-symbols-sharp"
    style={{ color: "#84AFBA", fontSize: props.fontSize }}
  >
    {props.icon}
  </span>
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
          <InputIcon icon="close" fontSize="24px" />
        </button>
      );
    default:
      return null;
  }
}

export default Home
