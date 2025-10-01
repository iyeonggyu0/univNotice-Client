import ToggleCP from "../../_common/toggleCP";
import "./style.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DeviceCP = ({ device, onChangeActive, onDeleteDevice }) => {
  const onChangeActiveFunc = (value) => {
    onChangeActive(device.id, value);
  };

  return (
    <div className="deviceCp flexBetween">
      <div>{device?.name}</div>
      <div className="icon flexBetween">
        <DeleteOutlineIcon
          className="trash"
          onClick={() => {
            onDeleteDevice(device.id);
          }}
        />
        <ToggleCP value={device.is_active} onClickFun={onChangeActiveFunc} />
      </div>
    </div>
  );
};
export default DeviceCP;
