import 'sinon-mongoose';
import sinon from 'sinon';
import { getUsers } from '../controllers/users';
import UsersModel from '../models/users';
import * as testUtils from '../utils/tests';

describe('APIs', () => {
  describe('users', () => {
    beforeEach(() => {
      sinon.restore();
    });
    const response = testUtils.mockResponse();
    const users = [
      {
        _id: '5d23e81d8e92d15ca063adad',
        name: 'john',
        __v: 0,
        online: true,
        email: 'john@doe.com',
      },
    ];
    describe('GET /', () => {
      test('should return array of users', async () => {
        const request = {};

        sinon
          .mock(UsersModel)
          .expects('find')
          .resolves(users);

        const controllerResponse = await getUsers(request, response);
        const parsedResponse = testUtils.parse(controllerResponse);
        expect(parsedResponse).toMatchObject(users);
      });
    });
  });
});
