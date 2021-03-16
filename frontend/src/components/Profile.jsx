import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {
  Row, Col, Form, Button, Image,
} from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import apiHost from '../config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUser();
  }

  getUser = () => {
    axios.get(`${apiHost}/api/profile/${localStorage.getItem('user_id')}`)
      .then((response) => {
        if (response) {
          const userData = {
            userId: response.data.userId,
            email: response.data.email,
            name: response.data.name,
            phone: response.data.phone,
            currency: response.data.currency,
            language: response.data.language,
            timezone: response.data.timezone,
            image: response.data.image,
          };
          this.setState(userData);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onAvatarChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    console.log(JSON.stringify(formData));
    const uploadConfig = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log(JSON.stringify(this.state));
    axios.post(`${apiHost}/api/upload/${localStorage.getItem('user_id')}`, formData, uploadConfig)
      .then((response) => {
        // alert('Image uploaded successfully!');
        // this.setState({
        //   filename: 'Choose your Avatar',
        //   image: response.data,
        // });
        console.log(JSON.stringify(response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSave = (e) => {
    e.preventDefault();
    const data = { ...this.state };
    console.log(JSON.stringify(data));
    axios.put(`${apiHost}/api/profile`, data)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        // console.log(response.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({
            message: err.response.data,
          });
        }
      });
  }

  render() {
    let redirectVar = null;
    // let message = '';
    if (this.state.message === 'USER_UPDATED') {
      localStorage.setItem('name', this.state.name);
      redirectVar = <Redirect to="/home" />;
    }
    let image = null;
    const filename = this.state.filename || 'Choose your Avatar';
    if (this.state) {
      image = `${apiHost}/api/upload/${localStorage.getItem('user_id')}`;
    }
    return (
      <div>
        {redirectVar}
        <NavBar />
        <div className="mt-5">
          <Row>
            <Col md={{ span: 8, offset: 1 }}>
              <h4>Your Account</h4>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 1 }}>
              <Image style={{ width: '17rem' }} src={image} />
              <Form onSubmit={this.onUpload}>
                <Form.Group as={Col} className="lg-3">
                  <Form.File
                    className="mt-3"
                    name="image"
                    id="image"
                    style={{ width: '17rem' }}
                    accept="image/*"
                    label={filename}
                    onChange={this.onAvatarChange}
                    custom
                  />
                  <br />
                  <Button type="submit">Upload</Button>
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Form inline onSubmit={this.onSave}>
                <Form.Row>
                  <Form.Group as={Col} md="2">
                    <div>
                      <p>{'\u00A0'}</p>
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.onChange}
                        required
                      />
                      <p>{'\u00A0'}</p>
                      <Form.Label>Your Email Address</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                      />
                      <p>{'\u00A0'}</p>
                      <Form.Label>Your Phone Number</Form.Label>
                      <Form.Control
                        name="phone"
                        type="text"
                        value={this.state.phone}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <div className="ml-5 mr-5">
                      <p>{'\u00A0'}</p>
                      <Form.Label>Your Default Currency</Form.Label>
                      <Form.Control
                        name="currency"
                        as="select"
                        value={this.state.currency}
                        onChange={this.onChange}
                      >
                        <option>USD</option>
                        <option>KWD</option>
                        <option>BHD</option>
                        <option>GBP</option>
                        <option>EUR</option>
                        <option>CAD</option>
                      </Form.Control>
                      <p>{'\u00A0'}</p>
                      <Form.Label>Your Time Zone</Form.Label>
                      <Form.Control
                        name="timezone"
                        as="select"
                        value={this.state.timezone}
                        onChange={this.onChange}
                      >
                        <option value="International Date Line West">(GMT-12:00) International Date Line West</option>
                        <option value="American Samoa">(GMT-11:00) American Samoa</option>
                        <option value="Midway Island">(GMT-11:00) Midway Island</option>
                        <option value="Hawaii">(GMT-10:00) Hawaii</option>
                        <option value="Alaska">(GMT-09:00) Alaska</option>
                        <option selected="selected" value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                        <option value="Tijuana">(GMT-08:00) Tijuana</option>
                        <option value="Arizona">(GMT-07:00) Arizona</option>
                        <option value="Chihuahua">(GMT-07:00) Chihuahua</option>
                        <option value="Mazatlan">(GMT-07:00) Mazatlan</option>
                        <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                        <option value="Central America">(GMT-06:00) Central America</option>
                        <option value="Central Time (US &amp; Canada)">(GMT-06:00) Central Time (US &amp; Canada)</option>
                        <option value="Guadalajara">(GMT-06:00) Guadalajara</option>
                        <option value="Mexico City">(GMT-06:00) Mexico City</option>
                        <option value="Monterrey">(GMT-06:00) Monterrey</option>
                        <option value="Saskatchewan">(GMT-06:00) Saskatchewan</option>
                        <option value="Bogota">(GMT-05:00) Bogota</option>
                        <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                        <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                        <option value="Lima">(GMT-05:00) Lima</option>
                        <option value="Quito">(GMT-05:00) Quito</option>
                        <option value="Atlantic Time (Canada)">(GMT-04:00) Atlantic Time (Canada)</option>
                        <option value="Caracas">(GMT-04:00) Caracas</option>
                        <option value="Georgetown">(GMT-04:00) Georgetown</option>
                        <option value="La Paz">(GMT-04:00) La Paz</option>
                        <option value="Puerto Rico">(GMT-04:00) Puerto Rico</option>
                        <option value="Santiago">(GMT-04:00) Santiago</option>
                        <option value="Newfoundland">(GMT-03:30) Newfoundland</option>
                        <option value="Brasilia">(GMT-03:00) Brasilia</option>
                        <option value="Buenos Aires">(GMT-03:00) Buenos Aires</option>
                        <option value="Greenland">(GMT-03:00) Greenland</option>
                        <option value="Montevideo">(GMT-03:00) Montevideo</option>
                        <option value="Mid-Atlantic">(GMT-02:00) Mid-Atlantic</option>
                        <option value="Azores">(GMT-01:00) Azores</option>
                        <option value="Cape Verde Is.">(GMT-01:00) Cape Verde Is.</option>
                        <option value="Edinburgh">(GMT+00:00) Edinburgh</option>
                        <option value="Lisbon">(GMT+00:00) Lisbon</option>
                        <option value="London">(GMT+00:00) London</option>
                        <option value="Monrovia">(GMT+00:00) Monrovia</option>
                        <option value="UTC">(GMT+00:00) UTC</option>
                        <option value="Amsterdam">(GMT+01:00) Amsterdam</option>
                        <option value="Belgrade">(GMT+01:00) Belgrade</option>
                        <option value="Berlin">(GMT+01:00) Berlin</option>
                        <option value="Bern">(GMT+01:00) Bern</option>
                        <option value="Bratislava">(GMT+01:00) Bratislava</option>
                        <option value="Brussels">(GMT+01:00) Brussels</option>
                        <option value="Budapest">(GMT+01:00) Budapest</option>
                        <option value="Casablanca">(GMT+01:00) Casablanca</option>
                        <option value="Copenhagen">(GMT+01:00) Copenhagen</option>
                        <option value="Dublin">(GMT+01:00) Dublin</option>
                        <option value="Ljubljana">(GMT+01:00) Ljubljana</option>
                        <option value="Madrid">(GMT+01:00) Madrid</option>
                        <option value="Paris">(GMT+01:00) Paris</option>
                        <option value="Prague">(GMT+01:00) Prague</option>
                        <option value="Rome">(GMT+01:00) Rome</option>
                        <option value="Sarajevo">(GMT+01:00) Sarajevo</option>
                        <option value="Skopje">(GMT+01:00) Skopje</option>
                        <option value="Stockholm">(GMT+01:00) Stockholm</option>
                        <option value="Vienna">(GMT+01:00) Vienna</option>
                        <option value="Warsaw">(GMT+01:00) Warsaw</option>
                        <option value="West Central Africa">(GMT+01:00) West Central Africa</option>
                        <option value="Zagreb">(GMT+01:00) Zagreb</option>
                        <option value="Zurich">(GMT+01:00) Zurich</option>
                        <option value="Athens">(GMT+02:00) Athens</option>
                        <option value="Bucharest">(GMT+02:00) Bucharest</option>
                        <option value="Cairo">(GMT+02:00) Cairo</option>
                        <option value="Harare">(GMT+02:00) Harare</option>
                        <option value="Helsinki">(GMT+02:00) Helsinki</option>
                        <option value="Jerusalem">(GMT+02:00) Jerusalem</option>
                        <option value="Kaliningrad">(GMT+02:00) Kaliningrad</option>
                        <option value="Kyiv">(GMT+02:00) Kyiv</option>
                        <option value="Pretoria">(GMT+02:00) Pretoria</option>
                        <option value="Riga">(GMT+02:00) Riga</option>
                        <option value="Sofia">(GMT+02:00) Sofia</option>
                        <option value="Tallinn">(GMT+02:00) Tallinn</option>
                        <option value="Vilnius">(GMT+02:00) Vilnius</option>
                        <option value="Baghdad">(GMT+03:00) Baghdad</option>
                        <option value="Istanbul">(GMT+03:00) Istanbul</option>
                        <option value="Kuwait">(GMT+03:00) Kuwait</option>
                        <option value="Minsk">(GMT+03:00) Minsk</option>
                        <option value="Moscow">(GMT+03:00) Moscow</option>
                        <option value="Nairobi">(GMT+03:00) Nairobi</option>
                        <option value="Riyadh">(GMT+03:00) Riyadh</option>
                        <option value="St. Petersburg">(GMT+03:00) St. Petersburg</option>
                        <option value="Volgograd">(GMT+03:00) Volgograd</option>
                        <option value="Tehran">(GMT+03:30) Tehran</option>
                        <option value="Abu Dhabi">(GMT+04:00) Abu Dhabi</option>
                        <option value="Baku">(GMT+04:00) Baku</option>
                        <option value="Muscat">(GMT+04:00) Muscat</option>
                        <option value="Samara">(GMT+04:00) Samara</option>
                        <option value="Tbilisi">(GMT+04:00) Tbilisi</option>
                        <option value="Yerevan">(GMT+04:00) Yerevan</option>
                        <option value="Kabul">(GMT+04:30) Kabul</option>
                        <option value="Ekaterinburg">(GMT+05:00) Ekaterinburg</option>
                        <option value="Islamabad">(GMT+05:00) Islamabad</option>
                        <option value="Karachi">(GMT+05:00) Karachi</option>
                        <option value="Tashkent">(GMT+05:00) Tashkent</option>
                        <option value="Chennai">(GMT+05:30) Chennai</option>
                        <option value="Kolkata">(GMT+05:30) Kolkata</option>
                        <option value="Mumbai">(GMT+05:30) Mumbai</option>
                        <option value="New Delhi">(GMT+05:30) New Delhi</option>
                        <option value="Sri Jayawardenepura">(GMT+05:30) Sri Jayawardenepura</option>
                        <option value="Kathmandu">(GMT+05:45) Kathmandu</option>
                        <option value="Almaty">(GMT+06:00) Almaty</option>
                        <option value="Astana">(GMT+06:00) Astana</option>
                        <option value="Dhaka">(GMT+06:00) Dhaka</option>
                        <option value="Urumqi">(GMT+06:00) Urumqi</option>
                        <option value="Rangoon">(GMT+06:30) Rangoon</option>
                        <option value="Bangkok">(GMT+07:00) Bangkok</option>
                        <option value="Hanoi">(GMT+07:00) Hanoi</option>
                        <option value="Jakarta">(GMT+07:00) Jakarta</option>
                        <option value="Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                        <option value="Novosibirsk">(GMT+07:00) Novosibirsk</option>
                        <option value="Beijing">(GMT+08:00) Beijing</option>
                        <option value="Chongqing">(GMT+08:00) Chongqing</option>
                        <option value="Hong Kong">(GMT+08:00) Hong Kong</option>
                        <option value="Irkutsk">(GMT+08:00) Irkutsk</option>
                        <option value="Kuala Lumpur">(GMT+08:00) Kuala Lumpur</option>
                        <option value="Perth">(GMT+08:00) Perth</option>
                        <option value="Singapore">(GMT+08:00) Singapore</option>
                        <option value="Taipei">(GMT+08:00) Taipei</option>
                        <option value="Ulaanbaatar">(GMT+08:00) Ulaanbaatar</option>
                        <option value="Osaka">(GMT+09:00) Osaka</option>
                        <option value="Sapporo">(GMT+09:00) Sapporo</option>
                        <option value="Seoul">(GMT+09:00) Seoul</option>
                        <option value="Tokyo">(GMT+09:00) Tokyo</option>
                        <option value="Yakutsk">(GMT+09:00) Yakutsk</option>
                        <option value="Adelaide">(GMT+09:30) Adelaide</option>
                        <option value="Darwin">(GMT+09:30) Darwin</option>
                        <option value="Brisbane">(GMT+10:00) Brisbane</option>
                        <option value="Canberra">(GMT+10:00) Canberra</option>
                        <option value="Guam">(GMT+10:00) Guam</option>
                        <option value="Hobart">(GMT+10:00) Hobart</option>
                        <option value="Melbourne">(GMT+10:00) Melbourne</option>
                        <option value="Port Moresby">(GMT+10:00) Port Moresby</option>
                        <option value="Sydney">(GMT+10:00) Sydney</option>
                        <option value="Vladivostok">(GMT+10:00) Vladivostok</option>
                        <option value="Magadan">(GMT+11:00) Magadan</option>
                        <option value="New Caledonia">(GMT+11:00) New Caledonia</option>
                        <option value="Solomon Is.">(GMT+11:00) Solomon Is.</option>
                        <option value="Srednekolymsk">(GMT+11:00) Srednekolymsk</option>
                        <option value="Auckland">(GMT+12:00) Auckland</option>
                        <option value="Fiji">(GMT+12:00) Fiji</option>
                        <option value="Kamchatka">(GMT+12:00) Kamchatka</option>
                        <option value="Marshall Is.">(GMT+12:00) Marshall Is.</option>
                        <option value="Wellington">(GMT+12:00) Wellington</option>
                        <option value="Chatham Is.">(GMT+12:45) Chatham Is.</option>
                        <option value="Nuku'alofa">(GMT+13:00) Nukualofa</option>
                        <option value="Samoa">(GMT+13:00) Samoa</option>
                        <option value="Tokelau Is.">(GMT+13:00) Tokelau Is.</option>
                      </Form.Control>
                      <p>{'\u00A0'}</p>
                      <Form.Label>Language</Form.Label>
                      <Form.Control
                        name="language"
                        as="select"
                        value={this.state.language}
                        onChange={this.onChange}
                      >
                        <option selected="selected" value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="it">Italiano</option>
                        <option value="ja">日本語</option>
                        <option value="nl">Nederlands</option>
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="pt-PT">Português (Portugal)</option>
                        <option value="sv">Svenska</option>
                        <option value="th">ภาษาไทย</option>
                      </Form.Control>
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Group as={Col} className="offset-6">
                  <Button type="submit">Save</Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Profile;
