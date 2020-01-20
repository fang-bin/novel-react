import getEnv from './env';
const getApi = (relativePath: string): string => {
  const envirnoment = getEnv();
  const envUrl = envirnoment === 'local' ? 'localhost:3039' : '';
  const hasSlash = /^(\/)/.test(relativePath);
  const RegExp = /^(https|http|(\/\/))/;
  return RegExp.test(relativePath) ? relativePath : `//${envUrl}${hasSlash ? '' : '/'}${relativePath}`;
}
export default ({
  url = '',
  mode = 'cors',
  body = {},
  headers = {
    'Content-Type': 'application/json',
  },
  credentials = 'include',
  method = 'post',
  tokenUrl = '',
} = {}) => {
  let params;
  url = getApi(url);
  if (method === 'get'){
    let urlPars = ``;
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        const element = (body as any)[key];
        urlPars += `${key}=${element}&`;
      };
    }
    urlPars = urlPars.substring(0, urlPars.length - 1);
    url += `?${urlPars}`;
    params = {
      mode,
      credentials,
      headers,
      method,
    };
  }else {
    body = JSON.stringify(body) || {};
    params = {
      mode,
      body,
      headers,
      credentials,
      method,
    };
  }
  const _fetchAct = (url: string, params: object) => {
    return fetch(url, params)
      .then(res => Promise.all([res.ok, res.status, res.json()]))
      .then(([ok, status, json]) => {
        if (ok){
          return json;
        }else {
          return Promise.reject(json);
        }
      });
  }
  const _tokenFetch = async (tokenUrl: string) => {
    return tokenUrl;
  }

  const _appendToken = () => {}

  const _asyncFetch = async (url: string, params: object, tokenUrl: string) => {
    const tokenRes = await _tokenFetch(tokenUrl);
    const res = await _fetchAct(url, params);
    return res;
  }

  if (!tokenUrl){
    return _fetchAct(url, params);
  }else {
    return _asyncFetch(url, params, tokenUrl);
  }
}
