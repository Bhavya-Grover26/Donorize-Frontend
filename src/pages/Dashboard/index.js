import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody
} from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CardComp from './CardComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MetricsComp from './MetricsComp';
import ColumnChart from './ColumnChart';
import AdComp from './AdComp';
import ActivityComp from './ActivityComp';
import CityRankings from './CityRankings';
import { periodData } from '../../data.js';
import NavbarOrg from '../../components/NavbarOrg/NavbarOrg';


const Dashboard = () => {
  const [myevents, setMyEvents] = useState([]);
  const [donationsPerDay, setDonationsPerDay] = useState({});
  const [aggregatedData, setAggregatedData] = useState([]);


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
          setMyEvents(result.myevents);
          setDonationsPerDay(result.donationsPerDay);
        } else {
          console.error('Invalid data format:', result);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Calculate total number of donations
  const totalDonations = myevents.reduce(
    (acc, event) => acc + event.donationCount,
    0
  );

  const totalMoneyAmount = myevents.reduce((acc, event) => {
    if (event.category === 'money') {
      acc += event.amount; // Assuming there is an 'amount' property for money donations
    }
    return acc;
  }, 0);

  const reports = [
    { title: 'Donations', iconClass: 'fa-dollar', description: totalDonations, percent: '+1.2' },
    { title: 'Amount Collected', iconClass: 'fa-money-check-dollar', description: `$${totalMoneyAmount}`, percent: '-5' },
  ];

  return (
    <>
      <Container fluid>
        <NavbarOrg />
        <Row>
          <Col xl="4">
            <CardComp />
            <MetricsComp />
          </Col>
          <Col xl="8">
            <Row>
              {reports.map((report, key) => (
                <Col md="4" key={'_col_' + key}>
                  <Card className="mini-stats-wid">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <p className="text-muted fw-medium">{report.title}</p>
                          <h4 className="mb-0">
                            {report.title === 'Donations'
                              ? myevents.reduce((acc, event) => acc + event.donationCount, 0)
                              : report.title === 'Amount Collected'
                              ? myevents.reduce((acc, event) => acc + event.moneyAmount, 0)
                              : report.description}
                          </h4>
                        </div>
                        <div className="icon-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                          <span className="icon-container rounded-circle bg-primary">
                            <i className={'bx ' + report.iconClass + ' font-size-24'}></i>
                            <FontAwesomeIcon icon={`fa-solid ${report.iconClass}`} />
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                <ColumnChart
  periodData={[
    { name: 'Donation Count', data: myevents.map((event) => event.donationCount) },
    { name: 'Total Money', data: myevents.map((event) => event.moneyAmount) },
  ]}
  dataColors={['#3258F2', '#F2545B', '#A93F55']}
  donationCountsByDate={myevents.length > 0 ? myevents[0].donationDates : []}
/>


                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <AdComp />
          </Col>
          <Col xl="4">
            <ActivityComp />
          </Col>
          <Col xl="4">
            <CityRankings />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
