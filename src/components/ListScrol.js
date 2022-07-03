import React, { useState, useEffect } from 'react';

const List_Scroll_Tsts = () => {
    const Items=  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77];

//   const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n + 1));
  const [listItems, setListItems] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setListItems(Items.slice(0,30))  ;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() {

    console.log('handleScroll');
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    if(listItems.length < Items.length)
    {
    setIsFetching(true);
    }
    else
    {
        setIsFetching(false);
    }
  }

  function fetchMoreListItems() {
    setTimeout(() => {

        console.log(listItems.length);
        console.log(Items.length);
        if(listItems.length < Items.length)
        {
            setListItems([...listItems, ...Items.slice(listItems.length ,(listItems.length * 2))]);
            setIsFetching(false);
        }
        else
        {
            setIsFetching(false);
        }

    }, 2000);
  }

  return (
    <>
      <ul className="list-group mb-2">
        {listItems.map(listItem => <li className="list-group-item">List Item {listItem}</li>)}
      </ul>
      {isFetching && 'Loading Data ...'}
    </>
  );
};

export default List_Scroll_Tsts;