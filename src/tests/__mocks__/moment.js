//mocking out moment means creating fake version of moment at point in time.
const moment = require.requireActual('moment');

export default (timestamp = 0) => { //its will force the moment to start at a point in time 0 if no point in time is provided 
    return moment(timestamp);
}