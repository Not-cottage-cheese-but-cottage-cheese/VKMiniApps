import React from "react";
import PropTypes from "prop-types";
import { Icon24InfoCircleOutline } from "@vkontakte/icons";

import {
  Panel,
  PanelHeader,
  Button,
  Group,
  Div,
  ButtonGroup,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";

const Home = ({ id, go }) => {
  const gameIsStarted = useSelector((state) => state.game.value);

  return (
    <Panel id={id}>
      <PanelHeader>Находка для шпиона</PanelHeader>

      <Group>
        <Div>
          <ButtonGroup mode="horizontal" gap="m" stretched>
            <Button
              stretched
              size="m"
              mode="outline"
              onClick={go}
              data-to="game"
            >
              {gameIsStarted ? "Продолжить игру" : "Начать игру"}
            </Button>
            <Button
              size="m"
              mode="outline"
              onClick={() =>
                window.open(
                  "https://www.mosigra.ru/image/data/mosigra.product.other/543/674/SPY_rules_new.pdf",
                  "_blank"
                )
              }
            >
              <Icon24InfoCircleOutline />
            </Button>
          </ButtonGroup>
          {!gameIsStarted && (
            <ButtonGroup style={{marginTop: 20}} mode="horizontal" gap="m" stretched>
              <Button
                stretched
                size="m"
                mode="outline"
                onClick={go}
                data-to="createLocations"
              >
                Добавить новые локации
              </Button>
            </ButtonGroup>
          )}
        </Div>
      </Group>
    </Panel>
  );
};

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
