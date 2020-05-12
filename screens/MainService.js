export default class MainService{
    static load(cb){
      setTimeout(cb,3000);
    }
    static load2(cb){
        setTimeout(cb,1500);
      }
  } 