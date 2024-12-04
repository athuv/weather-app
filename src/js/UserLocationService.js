export default class UserLocationSerive {
  constructor() {
    if(!UserLocationSerive.instance){
      UserLocationSerive.instance = this;
    }
  }

  async getUserIp() {
    const fetchIpData = await fetch('https://api.db-ip.com/v2/free/self');
    const ipAddress = await fetchIpData.json()
    return ipAddress.city;
  }
}