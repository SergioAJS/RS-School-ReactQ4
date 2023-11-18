import { useNavigate } from 'react-router-dom';
import styles from 'src/components/detailedCard/DetailedCard.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { useID } from 'src/utils/useID';
import closeIcon from 'src/resources/close.svg';
// import { useFetchGOTHouse } from 'src/service/useFetchGOTHouse';
import { useGetHouseQuery } from 'src/redux';

export const DetailedCard = () => {
  const { houseId } = useID();
  // const { house, isLoading, error } = useFetchGOTHouse(houseID);
  const { data, isFetching, isError } = useGetHouseQuery(houseId);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.details}>
        {isFetching ? (
          <Loader />
        ) : isError ? (
          <p>{'error'}</p>
        ) : (
          <>
            <img
              className={styles.close}
              src={closeIcon}
              alt="close"
              title="Close"
              onClick={() => {
                navigate('/');
              }}
            />
            <div className={styles.card} data-testid="detailedCard">
              <h3>{data?.name}</h3>
              <p>Region: {data?.region}</p>
              <p>Coat Of Arms: {data?.coatOfArms}</p>
              <p>Words: {data?.words}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
