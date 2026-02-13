import loadingGif from "../assets/avxloading.gif";

export default function Loader() {
  return (
    <div style={styles.overlay}>
      <img src={loadingGif} alt="Loading..." style={styles.logo} />
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.25)", // transparent dark blur
    backdropFilter: "blur(6px)",    // glass effect
    zIndex: 9999,
  },
  logo: {
    width: "200px",
    pointerEvents: "none",
  },
};
