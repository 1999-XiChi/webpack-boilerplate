import('./index.styl');
console.log('hello webpack~');

import test from './test.js';
test();

if(process.env.NODE_ENV === 'development'){
  console.log('baseurl is localhost!');
}else{
  console.log('baseUrl is xichi.xyz1')
}