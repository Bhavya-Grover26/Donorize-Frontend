import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceOne } from '@fortawesome/free-solid-svg-icons';

const ActivityComp = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/myevent', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('Received data:', result);
        if (result && result.myevents) {
          setData(result.myevents);
        } else {
          console.error('Invalid data format:', result);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-5">Activity</CardTitle>
          {data.map((activity, index) => (
            <div className="activity" key={index}>
              <ul className="verti-timeline list-unstyled">
                <li className="event-list">
                  <div className="event-timeline-icon">
                    <FontAwesomeIcon icon={faDiceOne} style={{ color: '#3258F2' }} />
                  </div>
                  <div className="flex-shrink-0 d-flex">
                    <div className="me-3">
                      <h5 className="font-size-14">{activity.date}</h5>
                    </div>
                    <div className="flex-grow-1">
                      <div>{activity.name}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default ActivityComp;
