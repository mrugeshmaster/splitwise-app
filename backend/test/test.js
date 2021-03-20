/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const apiHost = 'http://localhost';
const apiPort = '3001';
const apiUrl = `${apiHost}:${apiPort}`;

const { expect } = chai;

it('GET Test server status', (done) => {
  chai
    .request(apiUrl)
    .get('/api/ping')
    .send()
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Pong');
      done();
    });
});

// it('POST Create User 1', (done) => {
//   chai.request(apiUrl)
//     .post('/api/signup')
//     .send({
//       email: 'mocha11_test@gmail.com', password: 'mochates1', name: 'Mocha Test 1',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('NEW_USER_CREATED');
//       done();
//     });
// });

// it('POST Create User 2', (done) => {
//   chai.request(apiUrl)
//     .post('/api/signup')
//     .send({
//       email: 'mocha22_test@gmail.com', password: 'mochatest2', name: 'Mocha Test 2',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('NEW_USER_CREATED');
//       done();
//     });
// });

// it('POST Create User 3', (done) => {
//   chai.request(apiUrl)
//     .post('/api/signup')
//     .send({
//       email: 'mocha33_test@gmail.com',
//       password: 'mochatest3',
//       name: 'Mocha Test 3',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('NEW_USER_CREATED');
//       done();
//     });
// });

// it('POST Create User 44', (done) => {
//   chai.request(apiUrl)
//     .post('/api/signup')
//     .send({
//       email: 'mocha44_test@gmail.com',
//       password: 'mochatest4',
//       name: 'Mocha Test 4',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('NEW_USER_CREATED');
//       done();
//     });
// });

// it('PUT Update profile User 1', (done) => {
//   chai.request(apiUrl)
//     .put('/api/profile')
//     .send({
//       userId: '1',
//       name: 'Macho Mocha',
//       email: 'mocha11@test.com',
//       phone: '+1239874560',
//       currency: 'GBP',
//       language: 'French',
//       timezone: 'Asia/Calcutta',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('USER_UPDATED');
//       done();
//     });
// });

// it('POST Create group', (done) => {
//   chai.request(apiUrl)
//     .post('/api/createGroup')
//     .send({
//       user_id: '1',
//       groupName: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('GROUP_CREATED');
//       done();
//     });
// });

// it('POST Invite Member 2', (done) => {
//   chai.request(apiUrl)
//     .post('/api/inviteMember')
//     .send({
//       invitationEmail: 'mocha22_test@gmail.com',
//       groupName: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('MEMBER_INVITED');
//       done();
//     });
// });

// it('POST Invite Member 3', (done) => {
//   chai.request(apiUrl)
//     .post('/api/inviteMember')
//     .send({
//       invitationEmail: 'mocha33_test@gmail.com',
//       groupName: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('MEMBER_INVITED');
//       done();
//     });
// });

// it('POST Invite Member 4', (done) => {
//   chai.request(apiUrl)
//     .post('/api/inviteMember')
//     .send({
//       invitationEmail: 'mocha44_test@gmail.com',
//       groupName: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('MEMBER_INVITED');
//       done();
//     });
// });

it('GET Check Invitation 2', (done) => {
  chai.request(apiUrl)
    .post('/api/invitations')
    .send({
      user_id: 2,
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      // expect(res.body.message).to.equal('INVITE_ACCEPTED');
      expect(res.body)
        .to.be.an.instanceof(Array)
        .and.to.have.property(0)
        .that.includes.all.values(['Mocha Test Group']);
      done();
    });
});

// it('POST Accept Invite 2', (done) => {
//   chai.request(apiUrl)
//     .post('/api/acceptInvite/accept')
//     .send({
//       user_id: 2,
//       group_name: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('INVITE_ACCEPTED');
//       done();
//     });
// });

// it('POST Accept Invite 3', (done) => {
//   chai.request(apiUrl)
//     .post('/api/acceptInvite/accept')
//     .send({
//       user_id: 3,
//       group_name: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('INVITE_ACCEPTED');
//       done();
//     });
// });

// it('POST Accept Invite 4', (done) => {
//   chai.request(apiUrl)
//     .post('/api/acceptInvite/accept')
//     .send({
//       user_id: 4,
//       group_name: 'Mocha Test Group',
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body.message).to.equal('INVITE_ACCEPTED');
//       done();
//     });
// });
