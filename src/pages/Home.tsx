// @ts-nocheck
import { useState } from "react";
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
// three
import { Html as HTML } from "@react-three/drei";

export default function Home(props, { key }) {
  const [state, setState] = useState('');
  const [about, setAbout] = useState(false);
  const [log, setLog] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  //   function key(e) {
  //     if (e.keyCode === 8) {
  //         console.log('delete');
  //     }
  // }

  return (
    <HTML center style={{ display: "flex", flexDirection: "column", position: "absolute", margin: "0", padding: "0", alignItems: "center", width: "100vw", height: "100vh", inset: "0", top: "0px" }}>
      <main className="flex flex-col w-full h-full p-2">
        <section className="absolute right-0 top-0 h-full">
          <NavBar 
            about={about} 
            setAbout={setAbout} 
            log={log} 
            setLog={setLog} 
          />
          <OutsideClickHandler onOutsideClick={() => { setLog(false) }}>
            { log ? <Log /> : "" }
          </OutsideClickHandler>
          <OutsideClickHandler onOutsideClick={() => { setAbout(false) }}>
            { about ? <About /> : "" }
          </OutsideClickHandler>
        </section>
        <section className="flex grow" />
        <section className="flex flex-col w-[526px] h-min self-center justify-self-center">
          <div className='text-6xl text-white text-center font-sans uppercase font-semibold tracking-normal mb-6 select-none'>
            3d Search
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <SearchBar>
              <InputIcon icon="search" fontSize="22px" />
              <input {
                ...register('search',
                  {
                    required: true,
                    maxLength: 200
                  })
              }
                type="search"
                className="form-control
                  block
                  w-full
                  px-3 py-1.5 m-0
                  text-base font-normal text-gray-700
                  outline-none"
                id="search"
                placeholder="Search..."
                aria-label="Search"
                maxLength={200}
                value={state.value}
                onChange={(e) => props.change(e)}
                onKeyDown={(e) => props.myKey(e)}
                autoComplete="off"
                spellCheck="false"
              />
              <button id="clear" onClick={props.reset} type="reset" value='reset' aria-label="clear" style={{ height: "24px" }}>
                <InputIcon icon="close" fontSize="24px" />
              </button>
            </SearchBar>
            <SearchButton />
          </form>
        </section>
        <section className="flex grow" />
      </main>
    </HTML>
  )
}

const NavBar = ({ about, setAbout, log, setLog }) => (
  <nav className="relative flex flex-row justify-end py-1.5 px-3">
    <section className="flex flex-col gap-1.5">
      <button onClick={() => setLog(!log)}>
        <span className="material-symbols-outlined material-fill">feed</span>
      </button>
      <button onClick={() => setAbout(!about)}>
        <span className="material-symbols-outlined material-fill">help_center</span>
      </button>
      <a href="https://github.com/glennphil/3d-search" alt="github code" target="_blank" rel="noreferrer">
        <span className="material-symbols-outlined material-fill">code_blocks</span>
      </a>
    </section>
  </nav>
);

const SideBar = (props) => (
  <section className="absolute w-60 h-max right-[78px] top-[15px] mt-[-3px]">
    <div className="flex flex-col rounded bg-white h-full p-5">
      
      <div className="text-xl font-sans uppercase text-base text-gray-500">{props.title}</div>
      
      <div className="text-gray-800 font-sans">
      {props.children}
      </div>
    </div>
  </section>
);

const About = () => (
  <SideBar
    title="About"
  >
    <div className="mt-5">
    This project was created using JavaScript, React.js, Three.js, and Cannon.js. The purpose of this project was to experiment with the 3D and physics libraries of Three and Cannon. 
    </div>
  </SideBar>
);

const Log = () => (
  <SideBar
    title="Changelog"
  >
    <ul>
      <li className="list-none ">
      <hr className="my-3 border-gray-300" />
        <div className="font-medium font-sans text-sm uppercase text-gray-500 my-2">August 14th, 2022</div>
        <div className="">Added expandable folders to homepage.</div>
      </li>
      <li className="list-none ">
      <hr className="my-3 border-gray-300" />
        <div className="font-medium font-sans text-sm uppercase text-gray-500 my-2">August 14th, 2022</div>
        <div className="">Added expandable folders to homepage.</div>
      </li>
    </ul>
  </SideBar>
);

const SearchBar = (props) => (
  <div className="flex flex-row rounded-3xl w-full h-12 bg-white px-3.5 py-1 items-center">
    {props.children}
  </div>
);

const SearchButton = () => (
  <div className="flex space-x-2 justify-center">
    <button
      type="submit"
      className="inline-block 
      px-6 py-2.5 
      bg-blue-600 
      text-white font-medium text-xs leading-tight uppercase 
      rounded 
      shadow-md hover:shadow-lg focus:shadow-lg
      hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      Search
    </button>
  </div>
);

const InputIcon = (props) => (
  <span
    className="material-symbols-outlined"
    style={{ color: "#505050", fontSize: props.fontSize }}
  >
    {props.icon}
  </span>
);