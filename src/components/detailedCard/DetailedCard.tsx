import { useNavigate } from 'react-router-dom';
import styles from 'src/components/detailedCard/DetailedCard.module.scss';
import { Loader } from 'src/components/loader/Loader';
import { useID } from 'src/components/utils/useID';
import closeIcon from 'src/resources/close.svg';
import { useFetchGOTHouse } from 'src/service/useFetchGOTHouse';

export const DetailedCard = () => {
  const { houseID } = useID();
  const { house, isLoading, error } = useFetchGOTHouse(houseID);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.details}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
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
            <div className={styles.card}>
              <h3>{house?.name}</h3>
              <p>Region: {house?.region}</p>
              <p>Coat Of Arms: {house?.coatOfArms}</p>
              <p>Words: {house?.words}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
