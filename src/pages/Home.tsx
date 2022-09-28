// @ts-nocheck
// components
import Nav from "../components/Nav";
// three
import { Html as HTML } from "@react-three/drei";
// styles
import "../index.css";

export default function Home(props) {
  const handleChange = event => {
    props.setSearch([...props.search, [event.target.value.slice(-1), "key"]]);
    // console.log(props.search);
  };

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col w-full h-full p-2">
        <Nav
          increment={props.increment}
          decrement={props.decrement}
          bevelSize={props.bevelSize}
          bevel={props.bevel}
          thickness={props.thickness}
          size={props.size}
          brightness={props.brightness}
          gravity={props.gravity}
          type={props.type}
          color={props.color}
          engine={props.engine}
          bg={props.bg}
          panel={props.panel}
          setData={props.setData}
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
            action={props.engine}
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
                onKeyDown={e => props.myKey(e)}
                autoComplete="off"
                spellCheck="false"
                minLength={1}
                required
              />
              {props.search.length === 0 && props.objects.length === 0 ? (
                ""
              ) : (
                <button
                  onClick={props.reset}
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
        <section className="flex grow-[2]" />
      </main>
    </HTML>
  );
}

const SearchBar = props => (
  <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
    {props.children}
  </div>
);

const InputIcon = props => (
  <span
    className="material-symbols-sharp"
    style={{ color: "#84AFBA", fontSize: props.fontSize }}
  >
    {props.icon}
  </span>
);
