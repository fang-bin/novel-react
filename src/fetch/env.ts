export default () => {
  const url = window.location.href;
  if (/(localhost)/g.test(url)){
    return 'local';
  }else {
    return 'online';
  }
}