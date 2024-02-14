const start = document.getElementById("startbtn");
const alertsound = new Audio("./alarm_2.mp3");
const voice = new Audio("./The site is Live Ple.mp3");
let disc = document.getElementById("disclaimer");
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBL2bSNtxaptRvyJ7zsDu7sEGqqbjK_xtY",
//   authDomain: "ressurecsite.firebaseapp.com",
//   projectId: "ressurecsite",
//   storageBucket: "ressurecsite.appspot.com",
//   messagingSenderId: "548632275167",
//   appId: "1:548632275167:web:a19f9f42ac5a430d4d216a",
//   measurementId: "G-K8VPSEKL6E",
// };

// const app = initializeApp(firebaseConfig);

start.addEventListener("click", () => {
  start.innerHTML = "Tracking..";
  let siteName = document.getElementById("siteLink").value;
  console.log(siteName);
  const IntervalID = setInterval(async () => {
    try {
      const response = await fetch(
        // `http://localhost:3000/check-site?siteName=${siteName}`
        // `https://proxy.cors.sh/https://${siteName}`
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://${siteName}`
        )}`
      );
      if (response.status == 200) {
        console.log(response.status);
        alertsound.play();
        voice.play();

        start.innerHTML = "Start Tracking again";
        disc.innerHTML = `your site: https://${siteName} is live!`;
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            const noti = new Notification("RessurucSite", {
              body: "Site is Live! click here immediately!",
              data: {
                url: `https://${siteName}`,
              },
            });

            noti.addEventListener("click", (e) => {
              // window.location.href = `https://${siteName}`;
              window.open(`https://${siteName}`, "_blank");
              clearInterval(IntervalID);
            });
          } else {
            alert("Please enable notifications permission for this website");
          }
        });
        clearInterval(IntervalID);
      }
    } catch (error) {
      console.error(error);
    }
  }, 5000);
});
