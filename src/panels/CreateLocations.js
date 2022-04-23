import React, { createRef } from "react";

import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormItem,
  Input,
  Button,
  Div,
  ButtonGroup,
  Header,
  SimpleCell,
  IconButton,
} from "@vkontakte/vkui";

import { useSelector, useDispatch } from "react-redux";
import { setLocation, removeLocation } from "../store/features/locations";

import "./Game.css";
import {
  Icon28ClearDataOutline,
  Icon28RemoveCircleOutline,
} from "@vkontakte/icons";

const CreateLocations = ({ id, go }) => {
  const newLocation = createRef();
  const dispatch = useDispatch();
  const locationsList = useSelector((state) => state.locations.locations);

  const createLocation = () => {
    dispatch(setLocation(newLocation.current.value));
    newLocation.current.value = "";
  };

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={go} data-to="home" />}>
        Находка для шпиона
      </PanelHeader>
      <Group>
        <Header>Мои локации</Header>
        <Div>
          <FormItem top="Введите название локации">
            <Input type="text" getRef={newLocation} />
          </FormItem>
          <ButtonGroup stretched>
            <Button mode="outline" stretched onClick={() => createLocation()}>
              Добавить локацию
            </Button>
          </ButtonGroup>
        </Div>
        <Div>
          {Object.keys(locationsList)?.map((locationId) => (
            <SimpleCell
              after={
                <IconButton
                  onClick={() => dispatch(removeLocation(locationId))}
                >
                  <Icon28RemoveCircleOutline />
                </IconButton>
              }
            >
              {locationsList[locationId]}
            </SimpleCell>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};

export default CreateLocations;
