import * as assert from 'power-assert';

import { createCustomToken, createHelloMessage, createWelcomeMessage } from '../../repository';


describe('Unit Test', () => {

  it('createWelcomeMessage', () => {
    const result = createWelcomeMessage();
    console.log(result);
    assert(result.includes('This is root.'));
  });


  it('createHelloMessage', () => {
    const result = createHelloMessage();
    console.log(result);
    assert(result.includes('Hello world, you.'));
  });

  it('createHelloMessage', () => {
    const name = 'foo';
    const result = createHelloMessage(name);
    console.log(result);
    assert(result.includes('Hello world, foo.'));
  });


  it('createCustomToken', async () => {
    const uid = 'xyz';
    const result = await createCustomToken(uid);
    console.log(result);
    assert(typeof result === 'string');
    assert(result.length > 100);
  });

  it('createCustomToken', async () => {
    let result: string = '';
    const uid = '';    
    try {
      await createCustomToken(uid);
    } catch (err) {
      result = String(err);
    }
    console.log(result);
    assert(result.includes('First argument to createCustomToken() must be a non-empty string uid'));
  });

});
