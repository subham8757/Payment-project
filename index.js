let walletbalance = JSON.parse(localStorage.getItem("balance"));
if (walletbalance === null) {
  walletbalance = 0;
}

display(walletbalance);

document.getElementById("money").addEventListener("click", function () {
  let val = document.getElementById("add").value;

  walletbalance = walletbalance + Number(val);

  localStorage.setItem("balance", JSON.stringify(walletbalance));

  display(walletbalance);

  document.getElementById('add').value = ''
});

function display(data) {
  let show = document.getElementById("balance");
  show.innerText = data;
}

let mpin = 1234;

document.getElementById("payment").addEventListener("click", function () {
  let val = document.getElementById("sendmoney").value;

  document.getElementById("proccess").innerHTML=null

  let pin = document.createElement("input");
  pin.setAttribute("type", "password");
  pin.setAttribute("placeholder", "Enter your 4 digits mpin");
  pin.setAttribute("id", "mpin");

  let btn = document.createElement("button");
  btn.innerText = "Enter";
  btn.setAttribute("id", "enter");

  document.getElementById("pin").append(pin, btn);

  document.getElementById("enter").addEventListener("click", function () {

    let mpinval = document.getElementById("mpin").value;

    if (Number(mpinval) === mpin) {
      document.getElementById("pin").innerHTML = null;
      document.getElementById("proccess").innerHTML = null;
      let show = document.createElement("h4");
      show.innerText = "Processing...";
      document.getElementById("proccess").append(show);

      let check = new Promise(function (resolve, reject) {
        if (val <= walletbalance && val > 0) {
          resolve`Payment successful`;
        } else {
          reject`Payment failed`;
        }
      });

      check
        .then(function (resolve) {
          setTimeout(function () {
            walletbalance = walletbalance - Number(val);
            localStorage.setItem("balance", JSON.stringify(walletbalance));
            display(walletbalance);
            display2(resolve[0]);
            document.getElementById('sendmoney').value = ''
          }, 3000);
        })

        .catch(function (err) {
          setTimeout(function () {
            display2(err[0]);
          }, 3000);
        });
    } else {
      alert("Please enter correct mpin");
    }
  });
});

function display2(str) {
  document.getElementById("proccess").innerHTML = null;

  let show = document.createElement("h4");
  show.innerText = str;

  document.getElementById("proccess").append(show);
}
