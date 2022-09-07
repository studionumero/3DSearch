// @ts-nocheck
import { useState } from "react";
import { useForm } from "react-hook-form";
import OutsideClickHandler from "react-outside-click-handler";
// three
import { Html as HTML } from "@react-three/drei";
// slider
import ReactSlider from "react-slider";
// styles
import "../index.css";

export default function Home(props) {
  const [about, setAbout] = useState(false);
  const [settings, setSettings] = useState(false);
  const [log, setLog] = useState(false);

  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    delayError: 0,
  });

  return (
    <HTML center style={{ width: "100vw", height: "100vh" }}>
      <main className="flex flex-col w-full h-full p-2">
        <section className="absolute right-0 top-0 h-full">
          <NavBar
            about={about}
            setAbout={setAbout}
            log={log}
            setLog={setLog}
            settings={settings}
            setSettings={setSettings}
          />
          <OutsideClickHandler
            onOutsideClick={() => {
              setAbout(false);
            }}
          >
            {about ? <About /> : ""}
          </OutsideClickHandler>
          <OutsideClickHandler
            onOutsideClick={() => {
              setLog(false);
            }}
          >
            {log ? <Log /> : ""}
          </OutsideClickHandler>
          <OutsideClickHandler
            onOutsideClick={() => {
              setSettings(false);
            }}
          >
            {settings ? (
              <Settings
                setFontValue={props.setFontValue}
                setSEValue={props.setSEValue}
                setFontSize={props.setFontSize}
                setFontBevel={props.setFontBevel}
                setFontThickness={props.setFontThickness}
                setTextColor={props.setTextColor}
                setFontBevelSize={props.setFontBevelSize}
                setGravity={props.setGravity}
                fontBevel={props.fontBevel}
                fontType={props.fontType}
                fontSize={props.fontSize}
                fontThickness={props.fontThickness}
                fontBevelSize={props.fontBevelSize}
                searchEngine={props.searchEngine}
                gravity={props.gravity}
              />
            ) : (
              ""
            )}
          </OutsideClickHandler>
        </section>
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
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-6"
            method="get"
            action={props.searchEngine}
          >
            <SearchBar>
              <InputIcon icon="search" fontSize="22px" />
              <input
                {...register("search", {
                  required: true,
                  maxLength: 200,
                })}
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
                onClick={props.reset}
                type="reset"
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
  );
}

const NavBar = ({ about, setAbout, log, setLog, settings, setSettings }) => (
  <nav className="relative flex flex-row justify-end py-1.5 px-3 mt-[1px]">
    <section className="flex flex-col gap-1.5">
      <button onClick={() => setAbout(!about)} className="hidden sm:block">
        {log || settings ? (
          <span className="material-symbols-sharp material-fill">article</span>
        ) : (
          <span className="material-symbols-sharp material-fill-active">
            article
          </span>
        )}
      </button>
      <button onClick={() => setLog(!log)} className="hidden sm:block">
        {about || settings ? (
          <span className="material-symbols-sharp material-fill">
            check_box
          </span>
        ) : (
          <span className="material-symbols-sharp material-fill-active">
            check_box
          </span>
        )}
      </button>
      <button
        onClick={() => setSettings(!settings)}
        className="hidden sm:block"
      >
        {log || about ? (
          <span className="material-symbols-sharp material-fill">
            settings_applications
          </span>
        ) : (
          <span className="material-symbols-sharp material-fill-active">
            settings_applications
          </span>
        )}
      </button>
      <a
        href="https://github.com/glennphil/3d-search"
        alt="github code"
        target="_blank"
        rel="noreferrer"
      >
        {log === true || about === true || settings === true ? (
          <span className="material-symbols-sharp material-fill">
            code_blocks
          </span>
        ) : (
          <span className="material-symbols-sharp material-fill-active">
            code_blocks
          </span>
        )}
      </a>
    </section>
  </nav>
);

const SideBar = (props) => (
  <section
    className="absolute w-60 h-max right-[60px] mt-[-3px]"
    style={{ top: props.top }}
  >
    <div className="flex flex-col rounded-sm bg-white h-full px-3.5 pt-[3px] pb-4">
      <div className="text-[22px] leading-7 text-[#415D6C] font-mono uppercase text-normal text-gray-500 mb-2">
        {props.title}
      </div>
      <div className="text-sm tracking-tighter font-mono">{props.children}</div>
    </div>
  </section>
);

const About = () => (
  <SideBar title="About" top="15px">
    <span className="text-[#415D6C] whitespace-pre-wrap">
      This project was created using React.js, Three.js, Cannon.js, JavaScript
      and the React-Three libraries of Drei, Cannon, and Three. <br />
      <br />
      The purpose of this project was to experiment and create a fun, and
      interactive app.
      <br />
      <br />
      3DSearch currently works with the English alphabet and Arabic numerals
      with the possibility to support other languages in the near future.
    </span>
  </SideBar>
);

const Log = () => (
  <SideBar title="Changelog" top="64px">
    <ul>
      <LogList
        date="08/14/22"
        description="Lighting, physics, and object correction."
      />
      <LogList
        date="08/16/22"
        description="Corrected geometry error and tuned world settings."
      />
      <LogList date="08/29/22" description="Improved performance." />
      <LogList
        date="08/31/22"
        description="Added settings for font and search engine."
      />
    </ul>
  </SideBar>
);

const Settings = ({
  setFontValue,
  setFontSize,
  setFontBevel,
  setFontThickness,
  fontThickness,
  fontBevelSize,
  setTextColor,
  setFontBevelSize,
  setGravity,
  setSEValue,
  fontBevel,
  fontType,
  gravity,
  fontSize,
  searchEngine,
}) => {
  const fontOptions = [
    { id: 1, type: "Roboto" },
    { id: 2, type: "ComicNeue" },
    { id: 3, type: "Newsreader" },
  ];

  const searchOptions = [
    { label: "Google", value: "https://www.google.com/search" },
    { label: "Bing", value: "https://www.bing.com/search" },
    { label: "Yahoo", value: "https://search.yahoo.com/search" },
    { label: "DuckDuckGo", value: "https://duckduckgo.com/" },
  ];

  const [counterFont, setCounterFont] = useState(0);
  const [counterSearch, setCounterSearch] = useState(0);

  const increaseFont = () => {
    setCounterFont((c) => (c + 1) % fontOptions.length);
  };

  const decreaseFont = () => {
    setCounterFont((c) => (c - 1 + fontOptions.length) % fontOptions.length);
  };

  const increaseSearch = () => {
    setCounterSearch((c) => (c + 1) % searchOptions.length);
  };

  const decreaseSearch = () => {
    setCounterSearch(
      (c) => (c - 1 + searchOptions.length) % searchOptions.length
    );
  };

  const searchEngineSlice = (value) => {
    let string = value
      .split("//" || ".")
      .pop()
      .split(".com")
      .shift()
      .split(".")
      .pop();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <SideBar title="Settings" top="110px">
      <section className="grid grid-rows-3 gap-2">
        <SettingsCol>
          <span className="col-span-1 align-middle">Type</span>
          <div className="col-span-2 grid grid-cols-4 gap-2 items-center">
            <button
              onClick={() => {
                decreaseFont();
                setFontValue(fontOptions[counterFont].type);
              }}
            >
              <span className="material-symbols-outlined lock-icon p-0.5">
                navigate_before
              </span>
            </button>
            <div className="col-span-2 flex justify-self-center">
              {fontType}
            </div>
            <button
              onClick={() => {
                increaseFont();
                setFontValue(fontOptions[counterFont].type);
              }}
            >
              <span className="material-symbols-outlined lock-icon p-0.5">
                navigate_next
              </span>
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Size</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={[fontSize || 1]}
            max={5}
            min={1}
            step={0.01}
            onChange={setFontSize}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Depth</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={[fontThickness || 1]}
            max={2.5}
            min={0.2}
            step={0.01}
            onChange={setFontThickness}
          />
        </SettingsCol>
        <SettingsCol>
          <button onClick={setFontBevel}>
            {fontBevel === true ? (
              <div className="col-span-1 flex align-middle">
                Bevel&nbsp;
                <span className="material-symbols-outlined lock-icon">
                  lock_open
                </span>
              </div>
            ) : (
              <div className="text-stone-400 col-span-1 flex align-middle">
                Bevel&nbsp;
                <span className="material-symbols-outlined lock-icon-active">
                  lock
                </span>
              </div>
            )}
          </button>
          {fontBevel === true ? null : (
            <div className="absolute z-10 bg-transparent w-36 h-10 right-[6px]"></div>
          )}
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName={
              fontBevel === true
                ? "customSlider-thumb"
                : "customSlider-thumb-disabled"
            }
            trackClassName={
              fontBevel === true
                ? "customSlider-track"
                : "customSlider-track-disabled"
            }
            defaultValue={[fontBevelSize || 0.1]}
            max={0.5}
            min={0.1}
            step={0.01}
            onChange={setFontBevelSize}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 align-middle">Search Engine</span>
          <div className="col-span-2 grid grid-cols-4 gap-2 items-center">
            <button
              onClick={() => {
                decreaseSearch();
                setSEValue(searchOptions[counterSearch].value);
              }}
            >
              <span className="material-symbols-outlined lock-icon p-0.5">
                navigate_before
              </span>
            </button>
            <div className="col-span-2 flex justify-self-center">
              {searchEngineSlice(searchEngine)}
            </div>
            <button
              onClick={() => {
                increaseSearch();
                setSEValue(searchOptions[counterSearch].value);
              }}
            >
              <span className="material-symbols-outlined lock-icon p-0.5">
                navigate_next
              </span>
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Gravity</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={[gravity || 0.17]}
            max={20}
            min={-20}
            step={0.01}
            onChange={setGravity}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Color</span>
          <div className="col-span-2 grid grid-cols-5 gap-4 items-center">
            <button
              className="color-swab bg-[#f08080]"
              onClick={() => setTextColor("#f08080")}
            />
            <button
              className="color-swab bg-[#D2B48C]"
              onClick={() => setTextColor("#D2B48C")}
            />
            <button
              className="color-swab bg-[#9ACD32]"
              onClick={() => setTextColor("#9ACD32")}
            />
          </div>
        </SettingsCol>
      </section>
    </SideBar>
  );
};

const SettingsCol = (props) => (
  <div className="grid grid-cols-3 gap-6 h-[40px] items-center">
    {props.children}
  </div>
);

const LogList = (props) => (
  <li className="list-none">
    <div className="text-[#84AFBA] uppercase">{props.date}</div>
    <div className="text-[#415D6C] mb-4">{props.description}</div>
  </li>
);

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
