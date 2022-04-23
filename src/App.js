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
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  PanelHeaderClose,
  usePlatform,
  IOS,
  ANDROID,
  VKCOM,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Locations from "./modals/Locations";
import { Icon24Dismiss } from "@vkontakte/icons";

const App = () => {
  const [scheme, setScheme] = useState("bright_light");
  const [activePanel, setActivePanel] = useState("home");
  const [activeModal, setActiveModal] = useState("");
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
    setActiveModal(e.currentTarget.dataset.to);
  };

  const modalClose = () => {
    setActiveModal("");
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
    </ModalRoot>
  );

  return (
    <ConfigProvider scheme={scheme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout} modal={modal}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="home" go={go} openModal={openModal} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
