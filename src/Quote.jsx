function Quote({ quote, author }) {
  return (
    <div>
      <p>&apos;{quote}&apos;</p>
      <h4>- {author}</h4>
    </div>
  );
}

export default Quote;
