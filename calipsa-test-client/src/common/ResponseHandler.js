// 400	Bad Request -- Your request sucks
// 401	Unauthorized -- Your API key is wrong
// 403	Forbidden -- The endpoint requested is hidden for administrators only
// 404	Not Found -- The specified endpoint could not be found
// 405	Method Not Allowed -- You tried to access a endpoint with an invalid method
// 406	Not Acceptable -- You requested a format that isn't json
// 410	Gone -- The endpoint requested has been removed from our servers
// 429	Too Many Requests -- You're requesting too many endpoints! Slow down!
//  Error Code	Meaning
// 500	Internal Server Error -- We had a problem with our server. Try again later.
// 503	Service Unavailable -- We're temporarially offline for maintanance. Please try again later.
import Constants from './Constants';


const ResponseHandler = {
    msg: null,
    data: null,
    isSuccessful: false,
    success(response) {
        response.error = false;

        return response.data;
    },
    error(response) {
        if (!response) return;

        const msg = this.statusMsg(response.status);

        response.message = (response.data.responseText || '').replaceAll(' | ', ', ');
        response.message = response.message || msg;

        return response;
    },
    statusMsg(statusCode){
        let msg;

        switch (statusCode) {
          case 200:
            msg = 'OK';
            break;
          case 201:
            msg = 'Created';
            break;
          case 202:
            msg = 'Accepted';
            break;
          case 203:
            msg = 'Non-Authoritative Information';
            break;
          case 204:
            msg = 'No Content Found';
            break;
          case 205:
            msg = 'Reset Content';
            break;
          case 206:
            msg = 'Partial Content';
            break;
          case 400:
            msg = 'Bad Request';
            break;
          case 401:
            msg = 'Unauthorized';
            break;
          case 403:
            msg = 'Forbidden';
            break;
          case 404:
            msg = 'Not Found';
            break;
          case 405:
            msg = 'Method Not Allowed';
            break;
          case 406:
            msg = 'Not Acceptable';
            break;
          case 410:
            msg = 'Gone';
            break;
          case 429:
            msg = 'Too Many Requests';
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          case 503:
            msg = 'Service Unavailable';
            break;
          default:
            msg = Constants.RESPONSE_ERROR;
        }

        return msg;
    }
}



export default ResponseHandler;
