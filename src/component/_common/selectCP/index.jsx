import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight: selectedValue && selectedValue === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

const SelectCP = ({ dataList = [], value = "", title = "", onChangeFunc }) => {
  const theme = useTheme();
  return (
    <div className="selectCP">
      <p>{title}</p>
      <FormControl sx={{ m: 1, width: "100%" }}>
        {/* InputLabel은 숨김 처리 */}
        <Select
          value={value ?? ""}
          onChange={(e) => onChangeFunc(e.target.value)}
          input={<OutlinedInput label="" />}
          MenuProps={MenuProps}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) return <em>선택</em>;
            const found = dataList.find((item) => (item?.id ?? item?.value ?? item) === selected);
            return found?.label ?? found?.name ?? selected;
          }}>
          {dataList.map((item, idx) => (
            <MenuItem key={idx} value={item?.id ?? item?.value ?? item} style={getStyles(item?.id ?? item?.value ?? item, value, theme)}>
              {item?.label ?? item?.name ?? item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCP;
