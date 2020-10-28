import axios from 'axios';

class BooksModel {
  async fetchBookList(){
    const res = await axios.get('http://localhost/ydbooks/getList.php');
    return res.data
  }
  async fetchBookDetail(id){
    const res = await axios.get('http://localhost/ydbooks/getDetail.php',{
      params:{
        id,
      }
    });
    // console.log(res.data,'----res.data----')
    return res.data
  }
  async addBook(data){
    console.log(data,'----data-----')
    const res = await axios.post('http://localhost/ydbooks/add.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let key in data) {
          ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return ret
      }],
    });
    return res.data
  }
  async deleteBook(data){
    const res = await axios.post('http://localhost/ydbooks/delete.php', data);
    // console.log(res.data,'----res.data----')
    return res.data
  }
  async updateBook(data){
    const res = await axios.post('http://localhost/ydbooks/modefied.php', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let key in data) {
          ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return ret
      }],
    });
    // console.log(res.data,'----res.data----')
    return res.data
  }
}

export default BooksModel;
