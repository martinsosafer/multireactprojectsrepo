import "./App.css";
import TwitterFollowCard from "./assets/TwitterFollowCard";

function App() {
  const twitterCardsData = [
    {
      userName: "martinfernandez",
      name: "Martin Fernandez",
      imgUrl:
        "https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png",
      initialIsFollowing: false,
    },
    {
      userName: "rebekkaChambers",
      name: "Rebecca Chambers",
      imgUrl:
        "https://www.latercera.com/resizer/Cnb2XpIh6Aon-xiXwVSEdagFVHs=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/ETPG3ZZLWBCMTKPK6SK723HYS4.png",
      initialIsFollowing: false,
    },
    {
      userName: "crash653",
      name: "Crash Bandicoot",
      imgUrl:
        "https://img.redbull.com/images/c_crop,x_581,y_0,h_1080,w_810/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2020/9/30/kqnip4zkvwlah77vsx02/crash-bandicoot-4-heroe",
      initialIsFollowing: false,
    },
  ];
  return (
    <>
      {twitterCardsData.map((data) => {
        const { userName, name, imgUrl, initialIsFollowing } = data;
        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            name={name}
            imgUrl={imgUrl}
            initialIsFollowing={initialIsFollowing}
          />
        );
      })}
    </>
  );
}

export default App;
