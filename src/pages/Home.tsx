import { ReactFragment, FC } from "react";
// components
import Nav from "../components/Nav";
// three
import { Html as HTML } from "@react-three/drei";
// interfaces
import { DefaultValuesInterface, SettingsInterface } from "../interfaces/Settings";
import { SearchInterface } from "../interfaces/Search";
// styles
import "../index.css";

type Props = DefaultValuesInterface & SettingsInterface & SearchInterface

const Home : FC<Props>  = ({ bevelSize, bevel, thickness, fontSize, brightness, gravity, type, engine, panel, search, setSearch, myKey, objects, reset, increment, decrement, setData }) => {
  const handleChange = (event: { target: { value: string } }) => {
    setSearch([...search, [event.target.value.slice(-1), "key"]]);
    // console.log(props.search);
  };

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col w-full h-full p-2">
        <Nav
          increment={increment}
          decrement={decrement}
          setData={setData}
          bevelSize={bevelSize}
          bevel={bevel}
          thickness={thickness}
          fontSize={fontSize}
          brightness={brightness}
          gravity={gravity}
          type={type}
          engine={engine}
          panel={panel}
        />
        <section className="flex grow" />
        <section
          className="flex flex-col 
          w-[300px] sm:w-[400px] md:w-[526px] 
          h-min 
          self-center justify-self-center"
        >
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
            <span className="text-[#F25479]">3d</span>
            <span className="text-white">Search</span>
          </div>
          <form
            className="flex flex-col gap-y-6"
            method="get"
            action={engine}
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
                onChange={handleChange}
                // value={props.search}
                aria-label="Search"
                maxLength={200}
                onKeyDown={e => myKey(e)}
                autoComplete="off"
                spellCheck="false"
                minLength={1}
                required
              />
              {search.length === 0 && objects.length === 0 ? (
                ""
              ) : (
                <button
                  onClick={reset}
                  type="reset"
                  aria-label="clear"
                  style={{ height: "24px" }}
                >
                  <InputIcon icon="close" fontSize="24px" />
                </button>
              )}
            </SearchBar>
          </form>
        </section>
        <section className="flex grow-[2]">
          <div className="absolute bottom-0 right-[49px] h-min pb-2 text-white">
          <span>3DSearch is an open-source project.</span>
          </div>
        </section>
      </main>
    </HTML>
  );
}

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

export default Home
