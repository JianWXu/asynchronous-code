// fav number

let BASEURL = "http://numbersapi.com";

const fav_number = $("#fav-number");
const fav_nums = $("#fav-nums");

axios
  .get(`${BASEURL}/5?json`)
  .then((num) => {
    // console.log(num.data);
    fav_number.text(num.data.text);
  })
  .catch((err) => {
    console.log(err);
  });

let res = [];

res.push(axios.get(`${BASEURL}/6,7,8,17`));
Promise.all(res)
  .then((obj) => {
    for ([k,v] of Object.entries(obj[0].data)){
      fav_nums.append(`<li>${v}</li>`);
    }
})
  .catch((err) => console.log(err));
