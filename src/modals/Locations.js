import React from "react";

import { Group, Header, SimpleCell } from "@vkontakte/vkui";

import { LOCATIONS_ARR, LOCATIONS } from "../utils/constant";
const Locations = () => {
  return (
    <Group>
      <Header mode="secondary">Локации</Header>
      {LOCATIONS_ARR.map((location) => (
        <SimpleCell>{LOCATIONS[location]}</SimpleCell>
      ))}
    </Group>
  );
};

export default Locations;
