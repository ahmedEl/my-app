import { useSelector,useDispatch  } from 'react-redux'
import { getUsers } from '../StoreMultiReducer/DataFeatureFromMapSlice';
const TstAsyncToolKit = () => {
  const dispatch = useDispatch();

  const handleChange =() => {
        dispatch(getUsers());
}

  return (
    <>
      <i className={'fa-solid fa-window-close  icon_Location'} title={"اغلاق "} onClick={() => {
        handleChange();
      }} ></i>
    </>
  );
};

export default TstAsyncToolKit;