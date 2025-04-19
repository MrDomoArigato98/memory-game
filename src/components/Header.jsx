function Header({ score, bestScore }) {
  return (
    <>
      <p>Best score: {bestScore}</p>
      <p>Score is {score}</p>
    </>
  );
}
export default Header;
