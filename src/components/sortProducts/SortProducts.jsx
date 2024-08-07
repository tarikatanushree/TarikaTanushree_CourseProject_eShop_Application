//Product sorting based on different criteria

import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { setSortBy } from "../../store/action/metadataAction";
import { connect } from "react-redux";

const SortProducts = ({ selectedSortBy, saveSortBy }) => {
  const [sortBy, setSortBy] = useState(selectedSortBy);
  const handleChange = (event) => {
    setSortBy(event.target.value);
    saveSortBy(event.target.value);
  };

  const options = [
    {
      label: "Default",
      value: "DEFAULT",
    },
    {
      label: "Price: High to Low",
      value: "PRICE_DESC",
    },
    {
      label: "Price: Low to High",
      value: "PRICE_ASC",
    },
    {
      label: "Newest",
      value: "NEWEST",
    },
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size={"small"}>
      <InputLabel id="select-label">Sort By</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={sortBy}
        label="Sort By"
        onChange={handleChange}
      >
        {options.map((element, index) => {
          return (
            <MenuItem key={"sortBy_" + index} value={element.value}>
              {element.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedSortBy: state.metadata.selectedSortBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortProducts);
