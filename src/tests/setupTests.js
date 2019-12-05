import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// require('dotenv').config({ path: '.env.test' }); //configuring firebase for testing purpose
import DotEnv from 'dotenv';

Enzyme.configure({
    adapter: new Adapter()
});

DotEnv.config({ path: '.env.test' });