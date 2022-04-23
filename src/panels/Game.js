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
  Text,
  Paragraph,
  ButtonGroup,
  Checkbox,
} from "@vkontakte/vkui";

import { Icon56UserSquareOutline } from "@vkontakte/icons";
import { LOCATIONS, LOCATIONS_ARR } from "../utils/constant";

import { useSelector, useDispatch } from "react-redux";
import {
  start,
  end,
  setPlayers,
  changePlayerName,
  setSpyesId,
} from "../store/features/game";

import "./Game.css";

const Game = ({ id, go, openModal, timerValue, startTimer }) => {
  const [countOfPlayers, setCountOfPlayers] = useState(3);
  const [countOfSpyes, setCountOfSpyes] = useState(1);
  const [dealIsStart, setDealIsStart] = useState(false);
  const [spyesFromOneOrgs, setSpyesFromOneOrgs] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentLocation, setCurrentLocation] = useState("");
  const [spyUsersId, setSpyUsersId] = useState([]);
  const gameIsStarted = useSelector((state) => state.game.value);
  const players = useSelector((state) => state.game.players);
  const spyesId = useSelector((state) => state.game.spyesId);
  const locationsUserList = useSelector((state) => state.locations.locations);
  const dispatch = useDispatch();

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "countOfPlayers") {
      setCountOfPlayers(value);
      const _players = {};
      for (let i = 1; i <= value; i++) {
        _players[i] = players[i] ? players[i] : `Игрок ${i}`;
      }
      dispatch(setPlayers(_players));
    }
    if (name === "countOfSpyes") {
      setCountOfSpyes(value);
    }
    if (name === "spyesFromOneOrgs") {
      setSpyesFromOneOrgs(value);
    }
  };

  const allLocations = () => {
    let allLocations = LOCATIONS_ARR.map((id) => LOCATIONS[id]);
    Object.keys(locationsUserList)?.forEach((id) =>
      allLocations.push(locationsUserList[id])
    );
    return allLocations;
  };

  const dealLocations = () => {
    setDealIsStart(true);
    for (let i = 1; i <= countOfSpyes; i++) {
      let userId = Math.floor(Math.random() * countOfPlayers + 1);
      if (spyUsersId.length > 0 && !spyUsersId.includes(userId)) {
        userId = userId === countOfPlayers ? userId - 1 : userId + 1;
      }
      setSpyUsersId((arr) => [...arr, userId]);
    }
    const _allLocations = allLocations();
    setCurrentLocation(
      _allLocations[Math.round(Math.random() * _allLocations.length)]
    );
  };

  const startGame = () => {
    setDealIsStart(false);
    dispatch(start());
    startTimer(countOfPlayers * 60);
    dispatch(setSpyesId(spyUsersId));
  };

  const stopGame = () => {
    dispatch(end());
    setCurrentPlayer(1);
    setCurrentLocation("");
    setSpyUsersId(() => []);
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

  const getSpyNames = () => {
    const names = spyesId.map((id) => players[id]);
    return names.join(", ");
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Находка для шпиона
      </PanelHeader>
      <Group style={{ paddingBottom: "40px" }}>
        {!dealIsStart && !gameIsStarted && (
          <Div>
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
                  countOfPlayers >= 3 && countOfPlayers <= 12
                    ? "valid"
                    : "error"
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
              {countOfSpyes == 2 && (
                <FormItem>
                  <Checkbox
                    name="spyesFromOneOrgs"
                    onChange={onChange}
                    value={spyesFromOneOrgs}
                  >
                    Шпионы работают на одну организацию?
                  </Checkbox>
                </FormItem>
              )}
              {Object.keys(players).map((playerId) => (
                <FormItem top={`Введите имя игрока ${playerId}`}>
                  <Input
                    type="text"
                    defaultValue={`${players[playerId]}`}
                    onChange={(e) =>
                      dispatch(
                        changePlayerName({
                          id: playerId,
                          name: e.currentTarget.value,
                        })
                      )
                    }
                  />
                </FormItem>
              ))}
              <FormItem>
                <Button
                  size="l"
                  stretched
                  mode="outline"
                  disabled={
                    getSpyesStatus() === "error" ||
                    countOfPlayers < 3 ||
                    countOfPlayers > 12
                  }
                  onClick={dealLocations}
                >
                  Начать раздачу карт!
                </Button>
              </FormItem>
            </FormLayout>
          </Div>
        )}
        {dealIsStart && (
          <Div style={divStyle}>
            <Icon56UserSquareOutline />
            <Paragraph style={{ margin: 10 }}>
              {players[currentPlayer]}, ознакомтесь с локацией.
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
                    ? spyesFromOneOrgs
                      ? `Вы шпион вместе с ${
                          players[spyUsersId.find((id) => id != currentPlayer)]
                        }`
                      : "Вы шпион"
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
        {gameIsStarted && (
          <Div style={divStyle}>
            {timerValue != "00:00" && (
              <Div>
                <Text>Найдите шпион{countOfSpyes == 1 ? "а" : "ов"}!</Text>
                <Text>{timerValue}</Text>
              </Div>
            )}
            {timerValue == "00:00" && (
              <Div>
                <Text>Кто шпион{countOfSpyes == 1 ? "" : "ы"}?</Text>
              </Div>
            )}
            <ButtonGroup stretched>
              <Button
                size="l"
                stretched
                mode="outline"
                onClick={openModal}
                data-to="whoIsSpy"
                data-spyNames={getSpyNames()}
              >
                Подсмотреть шпион{countOfSpyes == 1 ? "а" : "ов"}
              </Button>
            </ButtonGroup>
            {timerValue == "00:00" && (
              <ButtonGroup stretched>
                <Button
                  size="l"
                  stretched
                  mode="outline"
                  onClick={() => stopGame()}
                >
                  Начать заново
                </Button>
              </ButtonGroup>
            )}
          </Div>
        )}
      </Group>
    </Panel>
  );
};

Game.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Game;
