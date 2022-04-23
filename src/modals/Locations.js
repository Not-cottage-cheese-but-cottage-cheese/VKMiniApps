import React from "react";
import { useSelector } from "react-redux";

import { Group, SimpleCell } from "@vkontakte/vkui";

import { LOCATIONS_ARR, LOCATIONS } from "../utils/constant";
const Locations = () => {
  const locationsList = useSelector((state) => state.locations.locations);

  return (
    <Group>
      {LOCATIONS_ARR.map((location) => (
        <SimpleCell>{LOCATIONS[location]}</SimpleCell>
      ))}
      {Object.keys(locationsList)?.map((locationId) => (
        <SimpleCell>{locationsList[locationId]}</SimpleCell>
      ))}
    </Group>
  );
};

export default Locations;
