const initialState = {
  users: { loginFlag: false, userId: "", userName: "" },
  map: {},
  travels: {
    show: true,
    currentDirection: null,
    schedules: [
      {
        day: 1,
        activityClass: "restaurants",
        checked: false,
        prefecture: "hokkaido",
        location: { lat: 43.048583, lng: 141.318944 },
        name: "testRestaurants1",
        image: "https://i.postimg.cc/3wtRLxHM/9.jpg",
        category: "",
        reviews: [
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
        ],
        rating: 1.7,
      },
    ],
    selectedActivities: { restaurants: true, attractions: true, hotels: true }, // restaurants,attractions,hotelsのなかで表示するべきもの
    restaurants: [
      {
        activityClass: "restaurants",
        day: "",
        checked: false,
        like: true,

        prefecture: "hokkaido",
        location: { lat: 43.048583, lng: 141.318944 },
        name: "testRestaurants1",
        image: "https://i.postimg.cc/3wtRLxHM/9.jpg",
        category: "",
        reviews: [
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
        ],
        rating: 1.7,
      },
    ],
    attractions: [
      {
        activityClass: "attractions",
        day: "",
        checked: false,
        prefecture: "hokkaido",
        location: { lat: 43.090831, lng: 144.210956 },
        name: "testAttraction3",
        image: "https://i.postimg.cc/3wtRLxHM/9.jpg",
        category: "",
        reviews: [
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
        ],
        rating: 2.9,
      },
    ],
    hotels: [
      {
        activityClass: "hotels",
        day: "",
        checked: false,
        prefecture: "hokkaido",
        location: { lat: 41.87144, lng: 140.467568 },
        name: "testHotels3",
        image: "https://i.postimg.cc/3wtRLxHM/9.jpg",
        category: "",
        reviews: [
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
          {
            titile: "test1",
            text: "testtesttesttesttest",
            rating: "4",
            published_data: "2020-02-22T20:52:08-05:00",
          },
        ],
        rating: 3.2,
      },
    ],
  },
};

export default initialState;
