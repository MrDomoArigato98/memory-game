function Header({ score, bestScore }) {
  return (
    <>
      <div className="header">
        <p>Highest score: {bestScore}</p>
        <p>Current score: {score}</p>
      </div>
    </>
  );
}
export default Header;
