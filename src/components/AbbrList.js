import React, {useState} from 'react';
import styles from '@/styles/Home.module.css';
import AbbrCounter from '@/components/AbbrCounter';

export default function AbbrList({abbrList}) {
  const [filterValue, setFilterValue] = useState('');
  let filteredAbbrList = getFilteredAbbrList();
  let abbrCount = Object.keys(filteredAbbrList).length;

  function getFilteredAbbrList() {
    return Object.fromEntries(
      Object.entries(abbrList).filter(([abbrName, abbrMeaning]) =>
        abbrName.toUpperCase().includes(filterValue.toUpperCase())
      )
    );
  }

  function handleFilterChange(e) {
    setFilterValue(e.target.value);
    filteredAbbrList = getFilteredAbbrList();
    abbrCount = Object.keys(filteredAbbrList).length;
  }

  return (
    <div className={styles.abbrListWrapper}>
      <div className={styles.abbrListFilterWrapper}>
        <AbbrCounter abbrCount={abbrCount} />
        <input
          className={styles.abbrListFilter}
          type="text"
          value={filterValue}
          placeholder="Search..."
          onChange={handleFilterChange}
          data-testid="abbr-list-filter"
        />
      </div>
      <ul className={styles.abbrList}>
        {Object.keys(filteredAbbrList).map(
          (filteredAbbrListItemName, filteredAbbrListItemIndex) => (
            <li key={filteredAbbrListItemName}>
              <h4>{filteredAbbrListItemName}</h4>
              {abbrList[filteredAbbrListItemName].map(
                (multipleSameNameAbbrFull, multipleSameNameAbbrIndex) => (
                  <p
                    key={
                      filteredAbbrListItemName + '_' + multipleSameNameAbbrFull
                    }
                  >
                    {multipleSameNameAbbrFull}
                  </p>
                )
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
