// @ts-nocheck
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
// slider
import ReactSlider from "react-slider";
// context
import { ACTIONS } from "../context/settingContext";
// styles
import "../index.css";

export default function Nav(props) {
  const [settings, setSettings] = useState(false);

  return (
    <section className="absolute right-0 top-0 h-full">
      <NavBar settings={settings} setSettings={setSettings} />
      <OutsideClickHandler
        onOutsideClick={() => {
          setSettings(false);
        }}
      >
        {settings ? (
          <Settings
            type={props.type}
            size={props.size}
            engine={props.engine}
            gravity={props.gravity}
            color={props.color}
            bg={props.bg}
            brightness={props.brightness}
            bevel={props.bevel}
            bevelSize={props.bevelSize}
            thickness={props.thickness}
            addData={props.addData}
          />
        ) : (
          ""
        )}
      </OutsideClickHandler>
    </section>
  );
}

const NavBar = ({ settings, setSettings }) => {
  return (
    <nav className="relative flex flex-row justify-end py-1.5 px-3 mt-[1px]">
      <section className="flex flex-col gap-1.5">
        <button onClick={() => setSettings(!settings)} className="sm:block">
          <span className="material-symbols-sharp material-fill-active">
            settings_applications
          </span>
        </button>
        <a
          href="https://github.com/glennphil/3d-search"
          alt="github code"
          target="_blank"
          rel="noreferrer"
        >
          <span
            className={
              "material-symbols-sharp" +
              (settings ? " material-fill" : " material-fill-active")
            }
          >
            code_blocks
          </span>
        </a>
      </section>
    </nav>
  );
};

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

const Settings = ({
  type,
  size,
  engine,
  thickness,
  gravity,
  brightness,
  bevel,
  bevelSize,
  addData,
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

  const increase = (props) => {
    props.set((c) => (c + 1) % props.option.length);
  };

  const decrease = (props) => {
    props.set((c) => (c - 1 + props.option.length) % props.option.length);
  };

  const searchEngineSlice = (engine) => {
    let string = engine
      .split("//" || ".")
      .pop()
      .split(".com")
      .shift()
      .split(".")
      .pop();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Icon = (props) => (
    <span className="material-symbols-outlined lock-icon p-0.5">
      {props.name}
    </span>
  );

  const ColorSwab = (props) => (
    <button
      className="flex items-center justify-center h-6 w-6"
      onClick={() => {
        addData({
          action: props.action,
          payload: props.color,
          name: props.name,
        });
      }}
    >
      <div
        className="flex flex-col w-4 h-4 rounded-sm"
        style={{ backgroundColor: `${props.color}` }}
      />
    </button>
  );

  return (
    <SideBar title="Settings" top="14px">
      <section className="grid grid-rows-3">
        <SettingsCol>
          <span className="col-span-1 align-middle">Type</span>
          <div className="col-span-2 grid grid-cols-4 gap-2 items-center">
            <button
              onClick={() => {
                decrease({ set: setCounterFont, option: fontOptions });
                addData({
                  action: ACTIONS.SET_TYPE,
                  payload: fontOptions[counterFont].type,
                  name: "type",
                });
              }}
            >
              <Icon name="navigate_before" />
            </button>
            <div className="col-span-2 flex justify-self-center">{type}</div>
            <button
              onClick={() => {
                increase({ set: setCounterFont, option: fontOptions });
                addData({
                  action: ACTIONS.SET_TYPE,
                  payload: fontOptions[counterFont].type,
                  name: "type",
                });
              }}
            >
              <Icon name="navigate_next" />
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Size</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={size}
            max={5}
            min={1}
            step={0.01}
            onChange={(value) => {
              addData({
                action: ACTIONS.SET_SIZE,
                payload: value,
                name: "size",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Depth</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={thickness}
            max={2.5}
            min={0.2}
            step={0.01}
            onChange={(value) => {
              addData({
                action: ACTIONS.SET_THICKNESS,
                payload: value,
                name: "thickness",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <button
            onClick={() => {
              addData({
                action: ACTIONS.SET_BEVEL,
                payload: !bevel,
                name: "bevel",
              });
            }}
          >
            <div
              className={
                "col-span-1 flex align-middle" + (!bevel && " text-stone-400")
              }
            >
              Bevel&nbsp;
              <span
                className={
                  "material-symbols-outlined" +
                  (bevel ? " lock-icon" : " lock-icon-active")
                }
              >
                {bevel ? "lock_open" : "lock"}
              </span>
            </div>
          </button>
          {!bevel && (
            <div className="absolute z-10 bg-transparent w-36 h-10 right-[6px]" />
          )}
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName={
              bevel === true
                ? "customSlider-thumb"
                : "customSlider-thumb-disabled"
            }
            trackClassName={
              bevel === true
                ? "customSlider-track"
                : "customSlider-track-disabled"
            }
            defaultValue={bevelSize}
            max={0.5}
            min={0.1}
            step={0.01}
            onChange={(value) => {
              addData({
                action: ACTIONS.SET_BEVELSIZE,
                payload: value,
                name: "bevelSize",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 align-middle">Search Engine</span>
          <div className="col-span-2 grid grid-cols-4 gap-2 items-center">
            <button
              onClick={() => {
                decrease({ set: setCounterSearch, option: searchOptions });
                addData({
                  action: ACTIONS.SET_ENGINE,
                  payload: searchOptions[counterSearch].value,
                  name: "engine",
                });
              }}
            >
              <Icon name="navigate_before" />
            </button>
            <div className="col-span-2 flex justify-self-center">
              {searchEngineSlice(engine)}
            </div>
            <button
              onClick={() => {
                increase({ set: setCounterSearch, option: searchOptions });
                addData({
                  action: ACTIONS.SET_ENGINE,
                  payload: searchOptions[counterSearch].value,
                  name: "engine",
                });
              }}
            >
              <Icon name="navigate_next" />
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Gravity</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={gravity}
            max={20}
            min={-20}
            step={0.01}
            onChange={(value) => {
              addData({
                action: ACTIONS.SET_GRAVITY,
                payload: value,
                name: "gravity",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Light</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            defaultValue={brightness}
            max={2}
            min={0.1}
            step={0.01}
            onChange={(value) => {
              addData({
                action: ACTIONS.SET_BRIGHTNESS,
                payload: value,
                name: "brightness",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Color</span>
          <div className="col-span-2 grid grid-cols-4 gap-4 items-center mx-[-6px]">
            <ColorSwab
              action={ACTIONS.SET_COLOR}
              name="color"
              color="#f08080"
            />
            <ColorSwab
              action={ACTIONS.SET_COLOR}
              name="color"
              color="#D2B48C"
            />
            <ColorSwab
              action={ACTIONS.SET_COLOR}
              name="color"
              color="#9ACD32"
            />
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">BG Color</span>
          <div className="col-span-2 grid grid-cols-4 gap-4 items-center mx-[-6px]">
            <ColorSwab action={ACTIONS.SET_BG} name="bg" color="#6E9BA6" />
            <ColorSwab action={ACTIONS.SET_BG} name="bg" color="#2F4F4F" />
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
