import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import store from "./store";

import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  Tabbar,
  TabbarItem,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  PanelHeaderClose,
  usePlatform,
  IOS,
  ANDROID,
  VKCOM,
  ModalCard,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Icon24Dismiss, Icon28LocationOutline } from "@vkontakte/icons";

import Home from "./panels/Home";
import Game from "./panels/Game";

import Locations from "./modals/Locations";
import CreateLocations from "./panels/CreateLocations";

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [activeModal, setActiveModal] = useState("");
  const [spyNames, setSpyNames] = useState("");
  const [gameLocation, setGameLocation] = useState("");
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const platform = usePlatform();
  const [timerValue, setTimerValue] = useState("");
  const [flashLightIsAvailable, setFlasLightIsAvailable] = useState(false);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
      if (type === "VKWebAppFlashGetInfoResult") {
        setFlasLightIsAvailable(data.is_available);
        if (data.is_available) {
          bridge.send("VKWebAppFlashSetLevel", { level: 0 });
        }
      }
    });

    setTimeout(() => {
      bridge.send("VKWebAppFlashGetInfo");
    }, 200);
    setPopout(null);
  }, []);

  let timer;
  const startTimer = (value) => {
    const minutes = value / 60;
    const seconds = value % 60;
    setTimerValue(
      `${Math.trunc(minutes).toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
    value = value - 1;
    if (value < 0) {
      timer = clearTimeout();
      if (flashLightIsAvailable) {
        for (let i = 0; i < 10; i++) {
          bridge.send("VKWebAppFlashSetLevel", { level: 1 });
          setTimeout(() => {
            bridge.send("VKWebAppFlashSetLevel", { level: 0 });
          }, 500);
        }
        bridge.send("VKWebAppFlashSetLevel", { level: 0 });
      }
    } else {
      timer = setTimeout(() => startTimer(value), 1000);
    }
  };

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const openModal = (e) => {
    if (e.currentTarget.dataset?.location) {
      setGameLocation(e.currentTarget.dataset.location);
    }
    if (e.currentTarget.dataset?.spynames) {
      setSpyNames(e.currentTarget.dataset.spynames);
    }
    setActiveModal(e.currentTarget.dataset.to);
  };

  const modalClose = () => {
    setActiveModal("");
    setSpyNames("");
    setGameLocation("");
  };

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={modalClose}>
      <ModalPage
        id="locations"
        settlingHeight={100}
        onClose={modalClose}
        header={
          <ModalPageHeader
            left={
              (platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={modalClose} />
              )
            }
            right={
              platform === IOS && (
                <PanelHeaderButton onClick={modalClose}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          >
            Локации
          </ModalPageHeader>
        }
      >
        <Locations />
      </ModalPage>
      <ModalCard
        id="showLocation"
        onClose={modalClose}
        header="Текущая локация"
        subheader={gameLocation}
      />
      <ModalCard
        id="whoIsSpy"
        onClose={modalClose}
        header="Шпионы"
        subheader={spyNames}
      />
    </ModalRoot>
  );

  return (
    <Provider store={store}>
      <ConfigProvider scheme={scheme}>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout popout={popout} modal={modal}>
              <SplitCol>
                <View activePanel={activePanel}>
                  <Home id="home" go={go} />
                  <CreateLocations id="createLocations" go={go} />
                  <Game
                    id="game"
                    go={go}
                    openModal={openModal}
                    timerValue={timerValue}
                    startTimer={startTimer}
                  />
                </View>
                <Tabbar>
                  <TabbarItem
                    text="Все локации"
                    onClick={openModal}
                    data-to="locations"
                  >
                    <Icon28LocationOutline />
                  </TabbarItem>
                </Tabbar>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
