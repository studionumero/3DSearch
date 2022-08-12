// @ts-nocheck
import { useState } from "react";
import { useForm } from 'react-hook-form';
// three
import { Html as HTML } from "@react-three/drei";

export default function Home(props) {
  const [state, setState] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <HTML center style={{ display: "flex", flexDirection: "column", position: "absolute", margin: "0", padding: "0", alignItems: "center", width: "100vw", height: "100vh", inset: "0", top: "0px" }}>
      <main className="flex flex-col w-full h-full p-2">
        <NavBar />
        <section className="flex flex-col w-[526px] h-min self-center justify-self-center mt-[calc(50vh-(143px+55px))]">
          <div className='text-6xl text-white text-center font-sans uppercase font-semibold tracking-normal mb-6 select-none'>
            3d Search
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <SearchBar>
              <InputIcon icon="search" fontSize="22px"/>
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
                autoComplete="off"
                spellCheck="false"
              />
              <button id="clear" onClick={props.reset} type="reset" value='reset' aria-label="clear" style={{height: "24px"}}>
                <InputIcon icon="close" fontSize="24px" />
              </button>
            </SearchBar>
            <SearchButton />
          </form>
        </section>
      </main>
    </HTML>
  )
}

const NavBar = () => (
  <nav className="flex flex-row justify-end py-1.5 px-3">
    <section className="flex flex-row gap-1.5">
      {/* <a href="https://github.com/glennphil/3d-search" alt="github code" target="_blank">
        <div className="h-10 w-10 github" />
      </a> */}
      <a href="https://github.com/glennphil/3d-search" alt="github code" target="_blank" >
        <span className="material-symbols-outlined material-fill">code_blocks</span>
      </a>
      <button >
        <span className="material-symbols-outlined material-fill">feed</span>
      </button>
      <button >
        <span className="material-symbols-outlined material-fill">help_center</span>
      </button>
    </section>
  </nav>
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