import React from "react";
import PropTypes from "prop-types";
import { Icon28LocationOutline } from '@vkontakte/icons';
import { Icon28Users3Outline } from '@vkontakte/icons';

import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  Tabbar,
  TabbarItem,
} from "@vkontakte/vkui";

const Home = ({ id, go, openModal }) => (
  <Panel id={id}>
    <PanelHeader>Находка для шпиона</PanelHeader>

    <Group header={<Header mode="secondary">Список локаций</Header>}>
      <Div>
        <Button
          stretched
          size="m"
          mode="primary"
          onClick={openModal}
          data-to="locations"
        >
          Открыть список локаций
        </Button>
      </Div>
    </Group>

    <Tabbar>
      <TabbarItem text="Локации" onClick={openModal} data-to="locations">
        <Icon28LocationOutline />
      </TabbarItem>
    </Tabbar>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  // fetchedUser: PropTypes.shape({
  // 	photo_200: PropTypes.string,
  // 	first_name: PropTypes.string,
  // 	last_name: PropTypes.string,
  // 	city: PropTypes.shape({
  // 		title: PropTypes.string,
  // 	}),
  // }),
};

export default Home;
