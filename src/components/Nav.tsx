import OutsideClickHandler from "react-outside-click-handler";
import ReactSlider from "react-slider";
import { ReactElement, ReactFragment, FC } from "react";
// interfaces
import { DefaultValuesInterface, SettingsInterface } from "../interfaces/Settings";
// styles
import "../index.css";

type Props = DefaultValuesInterface & SettingsInterface

const Nav : FC<Props> = ({ bevelSize, bevel, thickness, fontSize, brightness, gravity, type, engine, panel, increment, decrement, setData }) => {
  return (
    <section className="absolute right-0 top-0 h-full">
      <NavBar setData={setData} panel={panel} />
      <OutsideClickHandler
        onOutsideClick={() => {
          setData({
            payload: false,
            name: "panel",
          });
        }}
      >
        {panel ? (
          <Settings
            increment={increment}
            decrement={decrement}
            setData={setData}
            type={type}
            fontSize={fontSize}
            engine={engine}
            gravity={gravity}
            brightness={brightness}
            bevel={bevel}
            bevelSize={bevelSize}
            thickness={thickness}
          />
        ) : (
          ""
        )}
      </OutsideClickHandler>
    </section>
  );
}

const NavBar : FC<Props> = ({ setData, panel }) => {
  return (
    <nav className="relative flex flex-row justify-end py-1.5 px-3 mt-[1px]">
      <section className="flex flex-col gap-1.5">
        <button
          onClick={() => {
            setData({
              payload: !panel,
              name: "panel",
            });
          }}
          className="sm:block"
        >
          <span
            className="material-symbols-sharp material-icon nav-icon"
            style={{ fontSize: "36px" }}
          >
            settings_applications
          </span>
        </button>
        <a
          href="https://github.com/glennphil/3d-search"
          target="_blank"
          rel="noreferrer"
        >
          <span
            className={
              "material-symbols-sharp material-icon " +
              (panel ? "nav-icon-inactive" : "nav-icon")
            }
            style={{ fontSize: "36px" }}
          >
            code_blocks
          </span>
        </a>
      </section>
    </nav>
  );
};

const SideBar = (props: { top: string; title: string; children: ReactElement }) => (
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

const Settings : FC<Props> = ({
  increment,
  decrement,
  type,
  fontSize,
  engine,
  thickness,
  gravity,
  brightness,
  bevel,
  bevelSize,
  setData,
}) => {

  // slices off start and end of search engine url 
  const searchEngineSlice = (engine: string) => {
    let string = engine
      .split("//" || ".")
      .pop()
      .split(".com")
      .shift()
      .split(".")
      .pop();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const Icon = (props: { margin: string; name: string }) => (
    <span
      className={
        "material-symbols-outlined py-0.5 text-[#222222] w-[12px] " +
        props.margin
      }
      style={{ fontSize: "18px" }}
    >
      {props.name}
    </span>
  );

  const ColorSwab = (props: { color: string; name: string; }) => (
    <button
      className="flex items-center justify-center h-6 w-6"
      onClick={() => {
        setData({
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
          <div className="col-span-2 flex flex-row justify-between items-center">
            <button
              onClick={() => {
                decrement({
                  name: "typeCount",
                });
              }}
              className="w-[22px] h-[22px] ml-[-6px]"
            >
              <Icon name="navigate_before" margin="ml-[-8px]" />
            </button>
            <div className="col-span-2 whitespace-nowrap flex-row justify-self-center text-center items-center">
              {type}
            </div>
            <button
              onClick={() => {
                increment({
                  name: "typeCount",
                });
              }}
              className="w-[22px] h-[22px] mr-[-6px]"
            >
              <Icon name="navigate_next" margin="" />
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Size</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            value={fontSize}
            max={5}
            min={1}
            step={0.01}
            onChange={value => {
              setData({
                payload: value,
                name: "fontSize",
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
            value={thickness}
            max={2.5}
            min={0.2}
            step={0.01}
            onChange={value => {
              setData({
                payload: value,
                name: "thickness",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <button
            onClick={() => {
              setData({
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
                  (bevel ? " lock-icon" : " lock-icon-disabled")
                }
                style={{ fontSize: "18px" }}
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
            value={bevelSize}
            max={0.5}
            min={0.1}
            step={0.01}
            onChange={value => {
              setData({
                payload: value,
                name: "bevelSize",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 align-middle">Search Engine</span>
          <div className="col-span-2 flex flex-row justify-between items-center">
            <button
              onClick={() => {
                decrement({
                  name: "engineCount",
                });
              }}
              className="w-[22px] h-[22px] ml-[-6px]"
            >
              <Icon name="navigate_before" margin="ml-[-8px]" />
            </button>
            <div className="col-span-2 flex justify-self-center">
              {searchEngineSlice(engine)}
            </div>
            <button
              onClick={() => {
                increment({
                  name: "engineCount",
                });
              }}
              className="w-[22px] h-[22px] mr-[-6px]"
            >
              <Icon name="navigate_next" margin="" />
            </button>
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Gravity</span>
          <ReactSlider
            className="customSlider col-span-2"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            value={gravity}
            max={20}
            min={-20}
            step={0.01}
            onChange={value => {
              setData({
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
            value={brightness}
            max={2}
            min={0.1}
            step={0.01}
            onChange={value => {
              setData({
                payload: value,
                name: "brightness",
              });
            }}
          />
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">Color</span>
          <div className="col-span-2 grid grid-cols-4 gap-4 items-center mx-[-6px]">
            <ColorSwab name="color" color="#f08080" />
            <ColorSwab name="color" color="#D2B48C" />
            <ColorSwab name="color" color="#9ACD32" />
          </div>
        </SettingsCol>
        <SettingsCol>
          <span className="col-span-1 flex align-middle">BG Color</span>
          <div className="col-span-2 grid grid-cols-4 gap-4 items-center mx-[-6px]">
            <ColorSwab name="bg" color="#6E9BA6" />
            <ColorSwab name="bg" color="#2F4F4F" />
          </div>
        </SettingsCol>
      </section>
    </SideBar>
  );
};

const SettingsCol = (props: { children: ReactFragment }) => (
  <div className="grid grid-cols-3 gap-6 h-[40px] items-center">
    {props.children}
  </div>
);

export default Nav