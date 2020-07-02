import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPing } from '../../actions';
import { selectPingData, selectPingLoading } from '../../reducers/ping';

const Ping: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectPingLoading);
  const ping = useSelector(selectPingData);

  useEffect(() => {
    dispatch(loadPing.request());
  }, [dispatch]);

  return <div>{loading ? 'Loading ...' : `Ping ${ping}`}</div>;
};

export default Ping;
