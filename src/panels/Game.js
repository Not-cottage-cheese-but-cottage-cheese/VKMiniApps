import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Header,
  FormLayout,
  FormItem,
  Input,
  Button,
  Div,
  Paragraph,
  ButtonGroup,
  Snackbar,
} from "@vkontakte/vkui";

import { Icon56UserSquareOutline } from "@vkontakte/icons";
import { LOCATIONS, LOCATIONS_ARR } from "../utils/constant";

import "./Game.css";

const Game = ({ id, go, openModal }) => {
  const [countOfPlayers, setCountOfPlayers] = useState(3);
  const [countOfSpyes, setCountOfSpyes] = useState(1);
  const [dealIsStart, setDealIsStart] = useState(false);
  const [gameIsStart, setGameIsStart] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentLocation, setCurrentLocation] = useState("");
  const [spyUsersId, setSpyUsersId] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "countOfPlayers") {
      setCountOfPlayers(value);
    }
    if (name === "countOfSpyes") {
      setCountOfSpyes(value);
    }
  };

  const dealLocations = () => {
    setDealIsStart(true);
    for (let i = 1; i <= countOfSpyes; i++) {
      let userId = Math.floor(Math.random() * countOfPlayers + 1);
      if (spyUsersId.length > 0 && spyUsersId.includes(userId)) {
        userId = userId === countOfPlayers ? userId - 1 : userId + 1;
      }
      setSpyUsersId((arr) => [...arr, userId]);
    }
    setCurrentLocation(
      LOCATIONS[LOCATIONS_ARR[Math.round(Math.random() * LOCATIONS_ARR.length)]]
    );
  };

  const startGame = () => {
    setDealIsStart(false);
    setGameIsStart(true);
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer + 1);
  };

  const getSpyesStatus = () => {
    if (countOfPlayers == 12) {
      return countOfSpyes == 2 ? "valid" : "error";
    } else {
      return countOfSpyes >= 1 && countOfSpyes <= 2 ? "valid" : "error";
    }
  };

  const getSpyesBottom = () => {
    if (countOfPlayers == 12) {
      return countOfSpyes == 2
        ? "Количество шпионов подходит!"
        : "При игре в 12, количество шпионов обязательно 2.";
    } else {
      return countOfSpyes >= 1 && countOfSpyes <= 2
        ? "Количество шпионов подходит!"
        : "В игре может быть 1 или 2 шпиона!";
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Находка для шпиона
      </PanelHeader>

      {!dealIsStart && !gameIsStart && (
        <Group>
          <Header>Подготовка к игре</Header>
          <Div>
            <Paragraph>
              Игра идет по упрощенным правилам, без статусов игроков на
              локациях!
            </Paragraph>
          </Div>
          <FormLayout>
            <FormItem
              top="Количество игроков"
              status={
                countOfPlayers >= 3 && countOfPlayers <= 12 ? "valid" : "error"
              }
              bottom={
                countOfPlayers >= 3 && countOfPlayers <= 12
                  ? "Количество игроков подходит!"
                  : "В игру могут играть от 3 до 12 человек!"
              }
            >
              <Input
                type="number"
                name="countOfPlayers"
                value={countOfPlayers}
                onChange={onChange}
              />
            </FormItem>
            <FormItem
              top="Количество шпионов"
              status={getSpyesStatus()}
              bottom={getSpyesBottom()}
            >
              <Input
                type="number"
                name="countOfSpyes"
                value={countOfSpyes}
                onChange={onChange}
              />
            </FormItem>
            <FormItem>
              <Button size="l" stretched mode="outline" onClick={dealLocations}>
                Начать раздачу карт!
              </Button>
            </FormItem>
          </FormLayout>
        </Group>
      )}
      {dealIsStart && (
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Icon56UserSquareOutline />
          <Paragraph style={{ margin: 10 }}>
            Игрок {currentPlayer}, ознакомтесь с локацией.
          </Paragraph>
          <ButtonGroup stretched>
            <Button
              stretched
              mode="secondary"
              size="m"
              onClick={openModal}
              data-to="showLocation"
              data-location={
                spyUsersId.length > 0 && spyUsersId.includes(currentPlayer)
                  ? "Вы шпион"
                  : currentLocation
              }
            >
              Показать локацию
            </Button>
            {currentPlayer < countOfPlayers && (
              <Button
                stretched
                mode="secondary"
                size="m"
                onClick={changePlayer}
              >
                Следующий игрок
              </Button>
            )}
            {currentPlayer == countOfPlayers && (
              <Button stretched mode="secondary" size="m" onClick={startGame}>
                Начать игру
              </Button>
            )}
          </ButtonGroup>
        </Div>
      )}
      {gameIsStart && (
        <Div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paragraph>Игра началась!</Paragraph>
        </Div>
      )}
    </Panel>
  );
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Game;
