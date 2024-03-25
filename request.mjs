import axios from "axios";

axios
  .get(
    "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState"
  )
  .then((response) => {
    console.log(response.data);
  });
