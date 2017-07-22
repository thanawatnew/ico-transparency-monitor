import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { formatNumber, getValueOrNotAvailable } from '../utils';
import { connect } from 'react-redux';
import { default as config } from '../config.js';

const ICOApp = ({ ...props }) => (
  <Row className="ico-container">
    <Grid>
      <Row className="ico-box" onClick={()=> window.location = `/#/${props.address}`}>
        <Col lg={3} md={4} className="name">
          <Row className="ico-box-container">
            <Col lg={12}>
              <div className="clearfix">
                <div className="ico-logo">
                  <img src={props.information.logo} alt={props.address} />
                </div>
                <div className="ico-information">
                  <h4><a href={`/#/${props.address}`}> {props.name || props.information.aliasName}</a></h4>
                  <a rel="noopener noreferrer"
                     target="_blank"
                     href={props.information.website}>{props.information.website}</a>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={9} md={8} className="ico-quick-stats">
          <Row>
            <Col lg={3} xs={6} className="part">
              <p className="title">Declared Cap</p>
              <strong className="desc">{getValueOrNotAvailable(props, 'cap')}</strong>
            </Col>
            <Col lg={3} xs={6} className="part">
              <p className="title">Tokens Supply</p>
              <strong className="desc">{formatNumber(parseFloat(props.totalSupply))}</strong>
            </Col>
            <Col lg={3} xs={6} className="part">
              <p className="title">Declared Duration</p>
              <strong className="desc">{getValueOrNotAvailable(props, 'startDate')}</strong>
              <br />
              <strong className="desc">{getValueOrNotAvailable(props, 'endDate')}</strong>
            </Col>
            <Col lg={3} xs={12} className="part transparency">
              <p className="title">Added by Person</p>

              <button
                href={props.name}
                className={`transparency-button ${getValueOrNotAvailable(props, 'decision')}-status`}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onModalShow(props);
                }}
              >
                <p>Transparency</p>
                <strong> {getValueOrNotAvailable(props, 'decision').toUpperCase()}
                </strong>
                <span className="arrow">&#8594;</span>
              </button>
            </Col>

          </Row>
        </Col>
      </Row>
    </Grid>
  </Row>
    );


const mapStateToProps = (state, props) => ({
  ...state.ICO.icos[props.address],
  ...config.ICOs[props.address],
});

export default connect(
    mapStateToProps,
    null
)(ICOApp);
