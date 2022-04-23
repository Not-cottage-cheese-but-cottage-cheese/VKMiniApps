import React, { useState, useEffect } from "react";
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

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [activeModal, setActiveModal] = useState("");
  const [gameLocation, setGameLocation] = useState("");
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const platform = usePlatform();

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        setScheme(data.scheme);
      }
    });
    setPopout(null);
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const openModal = (e) => {
    if (e.currentTarget.dataset.location) {
      setGameLocation(e.currentTarget.dataset.location);
    }
    setActiveModal(e.currentTarget.dataset.to);
  };

  const modalClose = () => {
    setActiveModal("");
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
            Текущая локация
          </ModalPageHeader>
        }
        subheader={gameLocation}
      />
    </ModalRoot>
  );

  return (
    <ConfigProvider scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout} modal={modal}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="home" go={go} />
                <Game id="game" go={go} openModal={openModal} />
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
  );
};

export default App;
