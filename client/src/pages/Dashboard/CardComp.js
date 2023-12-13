import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'reactstrap';

const CardComp = () => {
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

  // Extract orgnames from the first event if it exists
  const orgnames = data.length > 0 ? [data[0].postedBy.orgname] : [];

  return (
    <>
      <Card className="overflow-hidden text-white border-0 credit-card-container">
        <Row>
          <Col>
            {orgnames.length > 0 && (
              <div>
                <p className="font-weight-normal">Organization Names</p>
                {orgnames.map((orgname, index) => (
                  <p key={index} className="font-weight-bold">{orgname}</p>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardComp;
