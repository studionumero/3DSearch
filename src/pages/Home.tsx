// @ts-nocheck
import { useState } from "react";
import { useForm } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
// three
import { Html as HTML } from "@react-three/drei";

export default function Home(props) {
  const [about, setAbout] = useState(false);
  const [log, setLog] = useState(false);

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 0,
  });

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }} >
      <main className="flex flex-col w-full h-full p-2">
        <section className="absolute right-0 top-0 h-full">
          <NavBar
            about={about}
            setAbout={setAbout}
            log={log}
            setLog={setLog}
          />
          <OutsideClickHandler onOutsideClick={() => { setAbout(false) }}>
            {about ? <About /> : ""}
          </OutsideClickHandler>
          <OutsideClickHandler onOutsideClick={() => { setLog(false) }}>
            {log ? <Log /> : ""}
          </OutsideClickHandler>
        </section>
        <section className="flex grow" />
        <section className="flex flex-col w-[526px] h-min self-center justify-self-center">
          <div className="flex flex-row items-center self-center mr-[45px] text-[64px] leading-[83px] font-mono text-center uppercase font-semibold tracking-normal mb-4 select-none">
            <img src={process.env.PUBLIC_URL + '/favicon.svg'} style={{ margin: "0 30px -16px 0" }} alt="3D Logo" />
            <span className='text-[#F25479]'>3d</span>
            <span className='text-white'>Search</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6"
            method="get"
            action="https://www.google.com/search"
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
                name="q"
                id="search"
                role="search"
                placeholder=""
                aria-label="Search"
                maxLength={200}
                onKeyDown={(e) => props.myKey(e)}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                id="clear"
                onClick={props.reset}
                type="reset"
                value="reset"
                aria-label="clear"
                style={{ height: "24px" }}
              >
                <InputIcon icon="close" fontSize="24px" />
              </button>
            </SearchBar>
          </form>
        </section>
        <section className="flex grow-[2]" />
      </main>
    </HTML>
  )
}

const NavBar = ({ about, setAbout, log, setLog }) => (
  <nav className="relative flex flex-row justify-end py-1.5 px-3 mt-[1px]">
    <section className="flex flex-col gap-1.5">
      <button onClick={() => setAbout(!about)}>
        {log ? <span className="material-symbols-sharp material-fill">article</span> : <span className="material-symbols-sharp material-fill-active">article</span>}
      </button>
      <button onClick={() => setLog(!log)}>
        {about ? <span className="material-symbols-sharp material-fill">check_box</span> : <span className="material-symbols-sharp material-fill-active">check_box</span>}
      </button>
      <a href="https://github.com/glennphil/3d-search" alt="github code" target="_blank" rel="noreferrer">
        {log === true || about === true ? <span className="material-symbols-sharp material-fill">code_blocks</span> : <span className="material-symbols-sharp material-fill-active">code_blocks</span>}
      </a>
    </section>
  </nav>
);

const SideBar = (props) => (
  <section className="absolute w-60 h-max right-[60px] mt-[-3px]" style={{ top: props.top }}>
    <div className="flex flex-col rounded-sm bg-white h-full px-3.5 pt-[3px] pb-4">
      <div className="text-[22px] leading-7 text-[#415D6C] font-mono uppercase text-normal text-gray-500 mb-2">{props.title}</div>
      <div className="text-sm tracking-tighter font-mono">
        {props.children}
      </div>
    </div>
  </section>
);

const About = () => (
  <SideBar
    title="About"
    top="15px"
  >
    <span className="text-[#415D6C]">
      This project was created using JavaScript, React.js, Three.js, and Cannon.js. The purpose of this project was to experiment with the 3D and physics libraries of Three and Cannon as well as to create something fun and interactive.
    </span>
  </SideBar>
);

const Log = () => (
  <SideBar
    title="Changelog"
    top="64px"
  >
    <ul>
      <LogList
        date="08/13/22"
        description="Added expandable folders to homepage."
      />
      <LogList
        date="08/13/22"
        description="Added expandable folders to homepage."
      />
      <LogList
        date="08/13/22"
        description="Added expandable folders to homepage."
      />
    </ul>
  </SideBar>
);

const LogList = (props) => (
  <li className="list-none">
    <div className="text-[#84AFBA] uppercase">{props.date}</div>
    <div className="text-[#415D6C] mb-4">{props.description}</div>
  </li>
)

const SearchBar = (props) => (
  <div className="flex flex-row rounded-sm w-full h-12 bg-white px-3.5 py-1 items-center">
    {props.children}
  </div>
);

const InputIcon = (props) => (
  <span
    className="material-symbols-sharp"
    style={{ color: "#84AFBA", fontSize: props.fontSize }}
  >
    {props.icon}
  </span>
);