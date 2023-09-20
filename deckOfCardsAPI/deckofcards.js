const BASEURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=";
const give_card_btn = $("#gimme-card");
const CARDBASEURL =
  "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const card_img = $("#card-img");
let deck_id = "";
// axios
//   .get(`${BASEURL}1`)
//   .then((card) =>
//     console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
//   )
//   .catch((err) => console.log(err));

// axios
//   .get(`${BASEURL}1`)
//   .then((card) => {
//     console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
//     return axios.get(
//       `https://deckofcardsapi.com/api/deck/${card.data.deck_id}/draw/?count=1`
//     );
//   })
//   .then((c2) => {
//     console.log(`${c2.data.cards[0].value} of ${c2.data.cards[0].suit}`);
//   })
//   .catch((err) => console.log(err));

$(document).ready(function () {
  axios.get(CARDBASEURL).then((deck) => {
    deck_id = deck.data.deck_id;
  });
});

$(give_card_btn).on("click", function () {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then((card) => {
      let card_image = card.data.cards[0].image;
      card_img.attr("src", card_image);
      console.log(card)
    })
    .catch((err) => console.log(err));
});
